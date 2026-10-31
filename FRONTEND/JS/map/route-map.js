export function createMap(route,display) {
    const oldMap = document.querySelector(".map");
    if (oldMap) oldMap.remove();

    if (!Array.isArray(route) || route.length === 0) {
        return;
    }

    const mapDiv = document.createElement("div");
    mapDiv.className = "map";
    mapDiv.style.height = "500px";
    mapDiv.style.width = "100%";
    mapDiv.style.boxSizing = "border-box";
    mapDiv.style.position = "relative";
    mapDiv.style.border = "3px solid Black";
    mapDiv.style.margin = "10px";
    display.appendChild(mapDiv);

    const map = L.map(mapDiv);
    mapDiv._leafletMap = map;

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    const points = [];

    // Station markers
    route.forEach(stop => {
        const lat = Number(stop.lat);
        const lng = Number(stop.lng);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            return;
        }

        const point = [lat, lng];
        points.push(point);

        let markerColor = "blue";

        if (stop.status === "departed") {
            markerColor = "green";
        } else if (stop.status === "at-station") {
            markerColor = "orange";
        } else if (stop.status === "upcoming") {
            markerColor = "red";
        }

        L.circleMarker(point, {
            radius: 12,
            color: markerColor,
            fillColor: markerColor,
            fillOpacity: 1
        })
            .addTo(map)
            .bindPopup(`
                <b>${stop.stationName ?? "Unknown station"}</b><br>
                Code: ${stop.stationCode ?? "N/A"}<br>
                Status: ${stop.status ?? "N/A"}
            `);
    });

    // Train icon
    const trainIcon = L.divIcon({
        html: `<div class="train-marker">
            🚆
        </div>`,
        className: "",
        iconSize: [90, 90],
        iconAnchor: [30, 30],
        popupAnchor: [0, -30]
    });

    // Train currently at a station
    const current = route.find(
        stop => stop.status === "at-station"
    );

    if (current) {
        const lat = Number(current.lat);
        const lng = Number(current.lng);

        if (Number.isFinite(lat) && Number.isFinite(lng)) {
            L.marker(
                [lat, lng],
                {
                    icon: trainIcon
                }
            )
                .addTo(map)
                .bindPopup(`
                    🚆 <b>${current.stationName ?? "Current Station"}</b><br>
                    Current Location
                `)
                .openPopup();
        }
    } else {

        // Train is between two stations
        let departed = null;
        let upcoming = null;

        for (let i = 0; i < route.length - 1; i++) {
            if (
                route[i].status === "departed" &&
                route[i + 1].status === "upcoming"
            ) {
                departed = route[i];
                upcoming = route[i + 1];
                break;
            }
        }

        if (departed && upcoming) {
            const departedLat = Number(departed.lat);
            const departedLng = Number(departed.lng);

            const upcomingLat = Number(upcoming.lat);
            const upcomingLng = Number(upcoming.lng);

            if (
                Number.isFinite(departedLat) &&
                Number.isFinite(departedLng) &&
                Number.isFinite(upcomingLat) &&
                Number.isFinite(upcomingLng)
            ) {
                const trainLat =
                    (departedLat + upcomingLat) / 2;

                const trainLng =
                    (departedLng + upcomingLng) / 2;

                L.marker(
                    [trainLat, trainLng],
                    {
                        icon: trainIcon
                    }
                )
                    .addTo(map)
                    .bindPopup(`
                        🚆 <b>Train Location</b><br>
                        Between ${departed.stationName ?? "Unknown"} and
                        ${upcoming.stationName ?? "Unknown"}
                    `);
            }
        }
    }

    // No valid coordinates
    if (points.length === 0) {
        map.setView([20.5937, 78.9629], 5);
        return;
    }

    // Draw railway route
    L.polyline(points, {
        color: "#0066ff",
        weight: 4
    }).addTo(map);

    // Fit map to route
    map.fitBounds(points, {
        padding: [50, 50],
        maxZoom: 5
    });
}
