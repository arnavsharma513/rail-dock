
const display = document.querySelector(".Result");
const apiKey = `rg_28f85b1457204b2eaae342184d63aac0`;
const train_num = document.querySelector(`#train-no`);
const train_search = document.querySelector(`#train-search`);
const pnr_num = document.querySelector(`#pnr-no`);
const pnr_search = document.querySelector(`#pnr-search`);
const dateInput = document.querySelector(`#date_live`);
const live_search = document.querySelector(`#live-search`);
const live_stat = document.querySelector(`#live-stat`);
const src_stn = document.querySelector(`#src-stn`);
const des_stn = document.querySelector(`#des-stn`);
const stn_dt = document.querySelector(`#date-stn`);
const srch_2stn = document.querySelector(`#stn2-search`);
const stn_data = document.querySelector(`#stn-data`);
const stn_search = document.querySelector(`#stn-search`);
const rootElement = document.documentElement;
const toggleButton = document.querySelector("#theme_btn");

function update_theme_btn() {
    const currentTheme = rootElement.getAttribute("data-theme");
    toggleButton.textContent = currentTheme === "dark" ? "Light Mode ☀️" : "🌛 Dark Mode";
}
update_theme_btn();
toggleButton.addEventListener("click", () => {
    const currentTheme = rootElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    rootElement.setAttribute("data-theme", nextTheme);
    update_theme_btn();
});
function get_today() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}
function formatTime(value) {
    if (!value) return "N/A";

    const date = new Date(value);

    if (isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) + " • " + date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}
async function getTrain(trn) {
    const url = `https://api.railradar.in/v1/trains/${trn}?haltsOnly=true`;
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="train.gif" alt="Loading..." width="50" height="50"></span>`;
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey}` } });
        if (!response.ok) {
            throw new Error(`Unable to connect to our Servers (${response.status})`);
        }
        const data = await response.json();
        showResult_getTrain(data);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="warning.svg" alt="Error">${error}</span>`;
    }
}
async function getLive(train_no, date) {
    const url = `https://api.railradar.in/v1/trains/${train_no}/live?${date}&haltsOnly=true&geometry=true&format=geojson&includeCoordinates=true`;
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="train.gif" alt="Loading..." width="50" height="50"></span>`;
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey}` } });
        if (!response.ok) {
            throw new Error(`Unable to connect to our Servers (${response.status})`);
        }
        const data = await response.json();
        showResult_getLive(data);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="warning.svg" alt="Error">${error}</span>`;
    }
}
async function getTrain_between(src, des, dt) {
    const url = `https://api.railradar.in/v1/trains/between/${src}/${des}?${dt}`;
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="train.gif" alt="Loading..." width="50" height="50"></span>`;
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey}` } });
        if (!response.ok) {
            throw new Error(`Unable to connect to our Servers (${response.status})`);
        }
        const data = await response.json();
        showResult_getTrain_between(data);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="warning.svg" alt="Error">${error}</span>`;
    }
}
async function getStation(stn) {
    const url = `https://api.railradar.in/v1/stations/${stn}/trains`;
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="train.gif" alt="Loading..." width="50" height="50"></span>`;
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey}` } });
        if (!response.ok) {
            throw new Error(`Unable to connect to our Servers (${response.status})`);
        }
        const data = await response.json();
        showResult_getStation(data);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="warning.svg" alt="Error">${error}</span>`;
    }
}
function createMap(route) {
    const oldMap = document.querySelector(".map");
    if (oldMap) oldMap.remove();

    if (!Array.isArray(route) || route.length === 0) {
        return;
    }
    
    const mapDiv = document.createElement("div");
    mapDiv.className = "map";
    mapDiv.style.height = "500px";
    mapDiv.style.width = "auto";
    mapDiv.style.border="3px solid Black";
    mapDiv.style.margin="10px";
    display.appendChild(mapDiv);

    const map = L.map(mapDiv);

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
        popupAnchor:[0,-30]
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
        padding: [20, 20]
    });
}
function showResult_getTrain(info) {
    const train = info.data.train;
    const route = info.data.route;
    let html = `
    <h2>${train.number}-${train.name}</h2>
    <div class="train_data">
    <p><b>Type:</b>${train.type}</p>
    <p><b>Source:</b>${train.source.name}-${train.source.code}</p>
    <p><b>Destination:</b>${train.destination.name}-${train.destination.code}</p>
    <p><b>Distance:</b>${train.distance}</p>
    <p><b>Duration:</b>${train.duration}</p>
    <p><b>Average Speed:</b>${train.avgSpeed}KM/H</p>
    <div>
    <br>
    <div class="tab">
    <table>
    <tr>
    <th>Code</th>
    <th>Station</th>
    <th>Arrival</th>
    <th>Departure</th>
    <th>Distance</th>
    </tr>
    </div>`;

    route.forEach(stop => {
        html += `
        <tr style="background:#90cbf9;">
        <td>${stop.station.code}</td>
        <td>${stop.station.name}</td>
        <td>${stop.arrival}</td>
        <td>${stop.departure}</td>
        <td>${stop.distance}</td>
        `;
    });
    html += `<table>`;
    display.innerHTML = html;

}

function showResult_getLive(info) {
    const train = info.data.train;
    const route = info.data.route;

    const currentLocation = info.data.currentLocation;
    const previousHalt = info.data.previousHalt;
    const nextHalt = info.data.nextHalt;
    const exceptions = info.data.exceptions;

    let html = `
        <h2>${train.number}-${train.name}</h2>
         <div class="train_data">
        <p><b>Type:</b> ${train.type ?? "N/A"}</p>
        <p><b>Source:</b> ${train.source?.name ?? "N/A"}-${train.source?.code ?? "N/A"}</p>
        <p><b>Destination:</b> ${train.destination?.name ?? "N/A"}-${train.destination?.code ?? "N/A"}</p>
        <p><b>Distance:</b> ${train.distance ?? "N/A"}</p>
        <p><b>Duration:</b> ${train.duration ?? "N/A"}</p>
        <p><b>Average Speed:</b> ${train.avgSpeed ?? "N/A"} KM/H</p>

        <p id="crr"><b>Current Status:</b> ${info.data.status ?? "N/A"}</p>

        <p><b>Current Station:</b>
            ${currentLocation?.stationCode ?? "N/A"}-
            ${currentLocation?.status ?? "N/A"}
        </p>

        <p><b>Previous Station:</b>
            ${previousHalt?.stationCode ?? "N/A"}-
            ${previousHalt?.stationName ?? "N/A"}
        </p>

        <p><b>Next Station:</b>
            ${nextHalt?.stationCode ?? "N/A"}-
            ${nextHalt?.stationName ?? "N/A"}
        </p>

        <p><b>Last Updated:</b> ${formatTime(info.data.lastUpdatedAt) ?? "N/A"}</p>

        <p><b>Note:</b>
            ${exceptions?.type ?? "None"} --
            ${exceptions?.message ?? "No exceptions"}
        </p>
         </div>
        <br><br>
    <div class="tab">
        <table>
            <tr>
                <th>Station Code</th>
                <th>Station Name</th>
                <th>Scheduled Arrival</th>
                <th>Actual Arrival</th>
                <th>Scheduled Departure</th>
                <th>Actual Departure</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Speed To Next Station</th>
                <th>Distance</th>
            </tr>
            </div>
           

    `;

    route.forEach(stop => {
        var color = "";
        var font = "";
        if (stop.status === "at-station") {
            color = "background: Orange;";
            font = "color:Yellow;";
        }
        else if (stop.status === "upcoming") {
            color = "background:#ffcbd1;";
            font = "color:red;";
        }
        else if (stop.status === "departed") {
            color = "background:#cefad0;";
            font = "color:green;";
        }
        else {
            color = "background: white;";
            font = " color:green;"
        }
        html += `
            <tr style="${color} ${font}">
                <td>${stop.stationCode ?? "N/A"}</td>
                <td>${stop.stationName ?? "N/A"}</td>
                <td>${formatTime(stop.scheduledArrival) ?? "TBA"}</td>
                <td>${formatTime(stop.actualArrival) ?? "TBA"}<br><b>Delay:${stop.delayArrival ?? "TBA"} MIN</b></td>
                <td>${formatTime(stop.scheduledDeparture) ?? "TBA"}</td>
                <td>${formatTime(stop.actualDeparture) ?? "TBA"}<br><b>Delay:${stop.delayDeparture ?? "TBA"} MIN</b></td>
                <td>${stop.platform ?? "TBA"}</td>
                <td>${stop.status ?? "N/A"}</td>
                <td>${stop.speedToNextStationKmph ?? "N/A"} KMPH</td>
                <td>${stop.distance ?? "N/A"} KM</td>
            </tr>
        `;
    });

    html += `</table>`;
    display.innerHTML = html;
    createMap(info.data.route);
}
function showResult_getTrain_between(info) {
    const main = info.data;
    const trainz = info.data.trains;
    let html = `
    <h2>From:${main.from.name}-(${main.from.code})</h2>
    <h2>To:${main.to.name}-(${main.to.code})</h2>
    <h3>Total Trains Running : ${main.count}</h3>
    <br><br>
    <div class="tab">
        <table>
            <tr>
                <th>Train Number</th>
                <th>Train Name</th>
                <th>Type</th>
                <th>Run Days</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Total Halts Between</th>
                <th>Distance</th>
            </tr>
            </div>
    `;
    trainz.forEach(stop => {
        html += `
            <tr style="background:#90cbf9;">
                <td>${stop.train.number ?? "N/A"}</td>
                <td>${stop.train.name ?? "N/A"}</td>
                <td>${stop.train.type ?? "N/A"} </td>
                <td>${stop.train.runDays ?? "TBA"} </td>
                <td>${stop.from.departure ?? "TBA"}-${stop.from.name}</td>
                <td>${stop.to.arrival ?? "N/A"}_${stop.to.name}</td>
                <td>${stop.totalHaltsBetween ?? "N/A"} </td>
                <td>${stop.distance ?? "N/A"} KM</td>
            </tr>
        `;
    });

    html += `</table>`;
    display.innerHTML = html;
}
function showResult_getStation(info) {
    const main = info.data;
    const trainz = info.data.trains;

    let html = `
    <h2>Station:${main.station.name}-(${main.station.code})</h2>
    <h3>Total Trains Running : ${main.count}</h3>
    <div class="tab">
        <table>
            <tr>
                <th>Train Number</th>
                <th>Train Name</th>
                <th>Type</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>source</th>
                <th>Destination</th>
                <th>Run Days</th>
            </tr>
            </div>

    `;
    trainz.forEach(stop => {
        html += `
            <tr style="background:#90cbf9;">
                <td>${stop.train.number}</td>
                <td>${stop.train.name ?? "N/A"}</td>
                <td>${stop.train.type ?? "N/A"}</td>
                <td>${stop.stop.arrival}</td>
                <td>${stop.stop.departure}</td>
                <td>${stop.train.source.code ?? "TBA"}-${stop.train.source.name ?? "TBA"}</td>
                <td>${stop.train.destination.code ?? "TBA"}-${stop.train.destination.name ?? "TBA"}</td>
                <td>${stop.train.runDays ?? "TBA"}</td>
            </tr>
        `;
    });

    html += `</table>`;
    display.innerHTML = html;
}
train_search.addEventListener("click", () => {
    const val = train_num.value.trim();
    if (!val) {
        display.innerHTML = `<span class="warning"><img src="warning.svg" alt="Error"><div>Enter some value</div></span>`;
        return;
    }
    display.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
    getTrain(val);
});
srch_2stn.addEventListener("click", () => {
    const f = src_stn.value.trim();
    const t = des_stn.value.trim();
    if (!f || !t) {
        display.innerHTML = `<span class="warning"><img src="warning.svg" alt="Error"><div>Enter both stations</div></span>`;
        return;
    }
    const dt_2 = stn_dt.value.trim();
    if (!dt_2) {
        get_today();
    }
    display.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
    getTrain_between(f, t, dt_2);
});
pnr_search.addEventListener("click", () => {
    display.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
    display.innerHTML = `<span class="warning"><img src="warning.svg" alt="Error"><div>PNR Feature is not available in this version</div></span>`;
});
live_search.addEventListener("click", () => {
    const val = live_stat.value.trim();
    const date = dateInput.value.trim();
    if (!val) {
        display.innerHTML = `<span class="warning"><img src="warning.svg" alt="Error"><div>Enter some value</div></span>`;
        return;
    }
    display.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
    getLive(val, date);
});
stn_search.addEventListener("click", () => {
    const val = stn_data.value.trim();
    if (!val) {
        display.innerHTML = `<span class="warning"><img src="warning.svg" alt="Error"><div>Enter some value</div></span>`;
        return;
    }
    getStation(val);
    display.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
});





