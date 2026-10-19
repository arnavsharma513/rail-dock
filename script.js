
const display = document.querySelector(".Result");
const apiKey = `rg_28f85b1457204b2eaae342184d63aac0`;
const apiKey2 = `rg_ce21eef8e8624e44a8fa5920cabf217f`;
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
const sugs_trn = document.querySelector(`#suggestions_trn`);
const sugs_trn2 = document.querySelector(`#suggestions_trn2`);
const sugs_stn1 = document.querySelector(`#suggestion_stn1`);
const sugs_stn2 = document.querySelector(`#suggestion_stn2`);
const sugs_stn3 = document.querySelector(`#suggestion_stn3`);
const btns = document.querySelectorAll(".b-btn");
const boxes = document.querySelectorAll(".box");


btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        btns.forEach(b => b.classList.remove("active"));
        boxes.forEach(cap => cap.classList.remove("active"));
        btn.classList.add("active");
        const targetBox = document.getElementById(targetId);
        if (targetBox) {
            targetBox.classList.add("active");
        }
    });
});

let stations = {};
fetch("stn.json")
    .then(res => res.json())
    .then(data => stations = data);

src_stn.addEventListener("input", () => {
    const x = src_stn.value.toLowerCase();
    sugs_stn1.innerHTML = "";
    if (x.length < 2) return;
    let count = 0;
    for (const [number, name] of Object.entries(stations)) {
        if (number.toLowerCase().includes(x) || name.toLowerCase().includes(x)) {
            const div = document.createElement("div");
            div.textContent = `${number}-${name}`;
            div.onclick = () => {
                src_stn.value = number;
                sugs_stn1.innerHTML = "";
            };
            sugs_stn1.appendChild(div);
            if (++count >= 10) break;
        }
    }
});

des_stn.addEventListener("input", () => {
    const y = des_stn.value.toLowerCase();
    sugs_stn2.innerHTML = "";
    if (y.length < 2) return;
    let count = 0;
    for (const [number, name] of Object.entries(stations)) {
        if (number.toLowerCase().includes(y) || name.toLowerCase().includes(y)) {
            const div = document.createElement("div");
            div.textContent = `${number}-${name}`;
            div.onclick = () => {
                des_stn.value = number;
                sugs_stn2.innerHTML = "";
            };
            sugs_stn2.appendChild(div);
            if (++count >= 10) break;
        }
    }
});

stn_data.addEventListener("input", () => {
    const z = stn_data.value.toLowerCase();
    sugs_stn3.innerHTML = "";
    if (z.length < 2) return;
    let count = 0;
    for (const [number, name] of Object.entries(stations)) {
        if (number.toLowerCase().includes(z) || name.toLowerCase().includes(z)) {
            const div = document.createElement("div");
            div.textContent = `${number}-${name}`;
            div.onclick = () => {
                stn_data.value = number;
                sugs_stn3.innerHTML = "";
            };
            sugs_stn3.appendChild(div);
            if (++count >= 10) break;
        }
    }
});

let trains = {};
fetch("trains.json")
    .then(res => res.json())
    .then(data => trains = data);
live_stat.addEventListener("input", () => {
    const q = live_stat.value.toLowerCase();
    sugs_trn.innerHTML = "";
    if (q.length < 2) return;
    let count = 0;
    for (const [number, name] of Object.entries(trains)) {
        if (number.includes(q) || name.toLowerCase().includes(q)) {
            const div = document.createElement("div");
            div.textContent = `${number}-${name}`;
            div.onclick = () => {
                live_stat.value = number;
                sugs_trn.innerHTML = "";
            };
            sugs_trn.appendChild(div);
            if (++count >= 10) break;
        }
    }
});

train_num.addEventListener("input", () => {
    const l = train_num.value.toLowerCase();
    sugs_trn2.innerHTML = "";
    if (l.length < 2) return;
    let count = 0;
    for (const [number, name] of Object.entries(trains)) {
        if (number.includes(l) || name.toLowerCase().includes(l)) {
            const div = document.createElement("div");
            div.textContent = `${number}-${name}`;
            div.onclick = () => {
                train_num.value = number;
                sugs_trn2.innerHTML = "";
            };
            sugs_trn2.appendChild(div);
            if (++count >= 10) break;
        }
    }
});

function delay_color(delay) {
    if (delay === "N/A" || delay === "TBA" || delay === null || delay === undefined) {
        return "color: black; background: white;";
    }
    else if (delay < 5) {
        return "color: green; background: lightgreen;";
    }
    else if (delay < 25) {
        return "color: orange; background: lightyellow;";
    }
    else {
        return "color: red; background: lightcoral;";
    }
}
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
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey2}` } });
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
async function getPnr(pnr_num) {
    const url = `https://api.railradar.in/v1/pnr/${pnr_num}`;
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="train.gif" alt="Loading..." width="50" height="50"></span>`;
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey2}` } });
        if (!response.ok) {
            throw new Error(`Unable to connect to our Servers (${response.status})`);
        }
        const data = await response.json();
        showResult_getPnr(data);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="warning.svg" alt="Error">${error}</span>`;
    }
}
async function getLive(train_no, date) {
    if (date === "") {
        date = get_today();
    }
    const url = `https://api.railradar.in/v1/trains/${train_no}/live?date=${date}&haltsOnly=true&geometry=true&format=geojson&includeCoordinates=true`;
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
    if (dt === "") {
        dt = get_today();
    }
    const url = `https://api.railradar.in/v1/trains/between/${src}/${des}?date=${dt}`;
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="train.gif" alt="Loading..." width="50" height="50"></span>`;
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey2}` } });
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
        const response = await fetch(url, { method: `GET`, headers: { "Authorization": `Bearer ${apiKey2}` } });
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
        <div class="train_header">
    <div class="train_header2 top_header">
        <span class="train_logo"><img src="logo7.svg" alt="Logo" width="24" height="24"></span>
        <span class="train_no" style="margin-left: 10px;">Train No: ${train.number}</span>
        <span class="train_name" style="margin-left: 10px;">Train Name: ${train.name}</span><br>
    </div>
    <div class="train_header2 second_header">
        <div class="train_source" style="margin-left: 10px; padding:9px; border-radius: 15px;">Source:
            ${train.source?.code ?? "N/A"}</div>
            <span class="arrow" style="margin-left: 10px;"><img src="logo8.svg" alt="Arrow" width="24" height="24"></span>
        <div class="train_destination" style="margin-left: 10px;  padding: 9px; border-radius: 15px;">Destination:
            ${train.destination?.code ?? "N/A"}</div>
    </div>
    <div class="train_header2 third_header" style="auto">
        <div class="train_type" style="margin-left: 10px; padding: 9px; border-radius: 15px;">Train Type:
            ${train.type ?? "N/A"}</div>
        <div class="train_duration" style="margin-left:10px; padding: 9px; border-radius: 15px;">Duration: ${train.duration ?? "N/A"} Min
        </div>
        <div class="train_distance" style="margin-left: 10px;  padding: 9px; border-radius: 15px;">Distance: ${train.distance ?? "N/A"} KM
        </div>
    </div>
</div>
<div class="capsules"
    style="margin-top: 20px; display: grid; grid-template-columns: repeat(2,1fr); justify-content: center; gap: 10px;">
    <div class="total_stations" style="margin-left: 10px; border:1px solid black; padding: 9px; border-radius: 15px;">Total Stations:
        ${train.totalHalts}</div>
        <div class="train_running_status" style="margin-left: 10px; border:1px solid black; padding: 9px; border-radius: 15px;">Train Running Status:
            ${info.data.status ?? "N/A"}</div>
            <div class="status" style="margin-left: 10px; border:1px solid black; padding: 9px; border-radius: 15px;">Status: ${info.data.status ?? "N/A"}</div>
            <div class="delay_cap" style="${delay_color(info.data.delayMinutes)}">Delay: ${info.data.delayMinutes ?? "N/A"} Min</div>
</div>
<br><br>
<button class="btnMap" style="background-color: #3b879e; margin-left: 10px; border:1px solid black; padding: 9px; border-radius: 15px; text-color: white;">Show Map</button>
<button class="btnTimeline" style="background-color: #3b879e; margin-left: 10px; border:1px solid black; padding: 9px; border-radius: 15px; text-color: white;">Show TimeLine</button>
        <br><br>
    
           <div class="timeline">
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
            <div class="stn_box_live">
    <div class="left">
<div class="circle" style="${color} ${font}"><img src="logo9.svg" alt="Logo" width="24" height="24"></div>
<span class="distance_span">${stop.distance ?? "N/A"} KM</span>
    </div>
    <div class="right">
                <div class="head">
                [${stop.stationCode ?? "N/A"}] ${stop.stationName ?? "N/A"}
                </div>
                <div class="data2">
                <p>PLATFORM: ${stop.platform ?? "TBA"}</p>
                <p style="background:white; ${font}">Status: ${stop.status ?? "N/A"}</p>
            </div>
                <div class="data sch_time">
                    <p>${formatTime(stop.scheduledArrival) ?? "TBA"}</p>
                    <p>${formatTime(stop.scheduledDeparture) ?? "TBA"}</p>
                </div>
                <div class="data act_time">
                    <p>${formatTime(stop.actualArrival) ?? "TBA"}</p>
                    <p>${formatTime(stop.actualDeparture) ?? "TBA"}</p>
            </div>
            <div class="data delay">
                <p style="${delay_color(stop.delayArrival)}">ARR DELAY:${stop.delayArrival ?? "-"} MIN</p>
                <p style="${delay_color(stop.delayDeparture)}">DEP DELAY:${stop.delayDeparture ?? "-"} MIN</p>
            </div>
            </div>
            </div>
        `;
    });

    html += `<div>`;
    display.innerHTML = html;
    createMap(info.data.route);

    const btnMap = document.querySelector('.btnMap');
    const btnTimeline = document.querySelector('.btnTimeline');

    btnMap.addEventListener('click', () => {
        const timeline = document.querySelectorAll('.stn_box_live');
        const hello = display.querySelector('.map');
        timeline.forEach((div) => {
            div.setAttribute('style', 'display: none;');
        });
        hello.style.display = 'block';
        hello.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        setTimeout(() => {
            hello._leafletMap?.invalidateSize(true);
        }, 300);
    });
    btnTimeline.addEventListener('click', () => {
        const timeline = document.querySelectorAll('.stn_box_live');
        const hello = document.querySelector('.map');
        timeline.forEach((div) => {
            div.setAttribute('style', 'display: flex;');
        });
        hello.setAttribute('style', 'display: none;');
    });
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





