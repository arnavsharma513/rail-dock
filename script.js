const display = document.querySelector(".Result");
const apiKey= `rg_28f85b1457204b2eaae342184d63aac0`;
const train_num=document.querySelector(`#train-no`);
const train_search=document.querySelector(`#train-search`);
const pnr_num=document.querySelector(`#pnr-no`);
const pnr_search=document.querySelector(`#pnr-search`);
const dateInput=document.querySelector(`#date_live`);
const live_search=document.querySelector(`#live-search`);
const live_stat=document.querySelector(`#live-stat`);
const src_stn=document.querySelector(`#src-stn`);
const des_stn=document.querySelector(`#des-stn`);
const stn_dt=document.querySelector(`#date-stn`);
const srch_2stn=document.querySelector(`#stn2-search`);
const stn_data=document.querySelector(`#stn-data`);
const stn_search=document.querySelector(`#stn-search`);

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
async function getTrain(trn){
    const url=`https://api.railradar.in/v1/trains/${trn}?haltsOnly=true`;
    try{
        display.innerHTML="<p>Loading...Please Wait</p>";
        const response= await fetch(url, { method:`GET`, headers:{"Authorization": `Bearer ${apiKey}`}});
      if (!response.ok)
         { 
            throw new Error(`Unable to connect to our Servers (${response.status})`); 
        }
        const data= await response.json();
        showResult_getTrain(data);
    }
    catch(error){
        display.innerHTML=`<span class="error">${error}</span>`;
    }
}
async function getLive(train_no,date){
    const url=`https://api.railradar.in/v1/trains/${train_no}/live?${date}&haltsOnly=true`;
    try{
        display.innerHTML="<p>Loading...Please Wait</p>";
        const response= await fetch(url, { method:`GET`, headers:{"Authorization": `Bearer ${apiKey}`}});
      if (!response.ok)
         { 
            throw new Error(`Unable to connect to our Servers (${response.status})`); 
        }
        const data= await response.json();
        showResult_getLive(data);
    }
    catch(error){
        display.innerHTML=`<span class="error">${error}</span>`;
    }
}
async function getTrain_between(src,des,dt){
    const url=`https://api.railradar.in/v1/trains/between/${src}/${des}?${dt}`;
    try{
        display.innerHTML="<p>Loading...Please Wait</p>";
        const response= await fetch(url, { method:`GET`, headers:{"Authorization": `Bearer ${apiKey}`}});
        if(!response.ok){
            throw new Error(`Unable to connect to our Servers (${response.status})`);
        }
        const data= await response.json();
        showResult_getTrain_between(data);
    }
    catch(error){
        display.innerHTML=`<span class="error">${error}</span>`;
    }
}
async function getStation(stn){
    const url=`https://api.railradar.in/v1/stations/${stn}/trains`;
    try{
        display.innerHTML="<p>Loading...Please Wait</p>";
        const response= await fetch(url, { method:`GET`, headers:{"Authorization": `Bearer ${apiKey}`}});
        if(!response.ok){
            throw new Error(`Unable to connect to our Servers (${response.status})`);
        }
        const data= await response.json();
        showResult_getStation(data);
    }
    catch(error){
        display.innerHTML=`<span class="error">${error}</span>`;
    }
}
function showResult_getTrain(info){
    const train=info.data.train;
    const route=info.data.route;
    let html=`
    <h2>${train.number}-${train.name}</h2>
    <p><b>Type:</b>${train.type}</p>
    <p><b>Source:</b>${train.source.name}-${train.source.code}</p>
    <p><b>Destination:</b>${train.destination.name}-${train.destination.code}</p>
    <p><b>Distance:</b>${train.distance}</p>
    <p><b>Duration:</b>${train.duration}</p>
    <p><b>Average Speed:</b>${train.avgSpeed}KM/H</p>
    <br>
    <div class="tab">
    <table border="1">
    <tr>
    <th>#</th>
    <th>Station</th>
    <th>Arrival</th>
    <th>Departure</th>
    <th>Distance</th>
    </tr>
    </div>`;

    route.forEach(stop=>{
        html+=`
        <tr>
        <td>${stop.sequence}</td>
        <td>${stop.station.name}</td>
        <td>${stop.arrival}</td>
        <td>${stop.departure}</td>
        <td>${stop.distance}</td>
        `;
    });
    html+=`<table>`;
    display.innerHTML=html;
    
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
        <p><b>Type:</b> ${train.type ?? "N/A"}</p>
        <p><b>Source:</b> ${train.source?.name ?? "N/A"}-${train.source?.code ?? "N/A"}</p>
        <p><b>Destination:</b> ${train.destination?.name ?? "N/A"}-${train.destination?.code ?? "N/A"}</p>
        <p><b>Distance:</b> ${train.distance ?? "N/A"}</p>
        <p><b>Duration:</b> ${train.duration ?? "N/A"}</p>
        <p><b>Average Speed:</b> ${train.avgSpeed ?? "N/A"} KM/H</p>

        <p><b>Current Status:</b> ${info.data.status ?? "N/A"}</p>

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

        <br><br>
    <div class="tab">
        <table border="1">
            <tr>
                <th>Station Code</th>
                <th>Station Name</th>
                <th>Scheduled Arrival</th>
                <th>Actual Arrival</th>
                <th>Scheduled Departure</th>
                <th>Actual Departure</th>
                <th>Delay Arrival</th>
                <th>Delay Departure</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Speed To Next Station</th>
                <th>Distance</th>
            </tr>
            </div>
    `;

    route.forEach(stop => {
        var color="";
        if(stop.status === "at-station"){
            color="background: Orange; font-color:yellow; font-weight:700;";

        }
        else if(stop.status === "upcoming"){
            color="background: green; font-color:brown;";
        }
        else if(stop.status === "departed"){
            color="background:aquamarine; font-color:black;";
        }
        else{
            color="background: white;";
        }
        html += `
            <tr style="${color}">
                <td>${stop.stationCode ?? "N/A"}</td>
                <td>${stop.stationName ?? "N/A"}</td>
                <td>${formatTime(stop.scheduledArrival) ?? "TBD"}</td>
                <td>${formatTime(stop.actualArrival) ?? "TBD"}</td>
                <td>${formatTime(stop.scheduledDeparture) ?? "TBD"}</td>
                <td>${formatTime(stop.actualDeparture) ?? "TBD"}</td>
                <td>${stop.delayArrival ?? "TBD"} MIN</td>
                <td>${stop.delayDeparture ?? "TBD"} MIN</td>
                <td>${stop.platform ?? "TBD"}</td>
                <td>${stop.status ?? "N/A"}</td>
                <td>${stop.speedToNextStationKmph ?? "N/A"} KMPH</td>
                <td>${stop.distance ?? "N/A"} KM</td>
            </tr>
        `;
    });

    html += `</table>`;
    display.innerHTML = html;
}
function showResult_getTrain_between(info){
    const main=info.data;
    const trainz=info.data.trains;

    let html=`
    <h2>From:${main.from.name}-(${main.from.code})</h2>
    <h2>To:${main.to.name}-(${main.to.code})</h2>
    <h3>Total Trains Running : ${main.count}</h3>
    <br><br>
    <div class="tab">
        <table border="1">
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
            <tr>
                <td>${stop.train.number ?? "N/A"}</td>
                <td>${stop.train.name ?? "N/A"}</td>
                <td>${stop.train.type ?? "N/A"} </td>
                <td>${stop.train.runDays ?? "TBD"} </td>
                <td>${stop.from.departure ?? "TBD"}-${stop.from.name}</td>
                <td>${stop.to.arrival ?? "N/A"}_${stop.to.name}</td>
                <td>${stop.totalHaltsBetween ?? "N/A"} </td>
                <td>${stop.distance ?? "N/A"} KM</td>
            </tr>
        `;
    });

    html += `</table>`;
    display.innerHTML = html;
}
function showResult_getStation(info){
    const main=info.data;
    const trainz=info.data.trains;

    let html=`
    <h2>Station:${main.station.name}-(${main.station.code})</h2>
    <h3>Total Trains Running : ${main.count}</h3>
    <br><br>
    <div class="tab">
        <table border="1">
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
            <tr>
                <td>${stop.train.number}</td>
                <td>${stop.train.name ?? "N/A"}</td>
                <td>${stop.train.type ?? "N/A"}</td>
                <td>${stop.stop.arrival}</td>
                <td>${stop.stop.departure}</td>
                <td>${stop.train.source.code ?? "TBD"}-${stop.train.source.name ?? "TBD"}</td>
                <td>${stop.train.destination.code ?? "TBD"}-${stop.train.destination.name ?? "TBD"}</td>
                <td>${stop.train.runDays ?? "TBD"}</td>
            </tr>
        `;
    });

    html += `</table>`;
    display.innerHTML = html;
}
train_search.addEventListener("click",()=>{
    const val=train_num.value.trim();
    if(!val){
        display.innerHTML=`<span class="warning">Enter some value</span>`;
        return;
    }
     display.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
    getTrain(val);
});
srch_2stn.addEventListener("click",()=>{
    const f=src_stn.value.trim();
    const t=des_stn.value.trim();
    if(!f || !t){
        display.innerHTML=`<span class="warning">Enter both stations</span>`;
        return;
    }
    const dt_2= stn_dt.value.trim();
    if(!dt_2){
        get_today();
    }
     display.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
    getTrain_between(f,t,dt_2);
});
pnr_search.addEventListener("click",()=>{
     display.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
    display.innerHTML=`<span class="warning">PNR Feature is not available in this version</span>`;
});
live_search.addEventListener("click",()=>{
    const val=live_stat.value.trim();
    const date=dateInput.value.trim();
    if(!val){
        display.innerHTML=`<span class="warning">Enter some value</span>`;
        return;
    }
     display.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
    getLive(val,date);
});
stn_search.addEventListener("click",()=>{
    const val=stn_data.value.trim();
    if(!val){
        display.innerHTML=`<span class="warning">Enter some value</span>`;
        return;
    }
    getStation(val);
    display.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
});






