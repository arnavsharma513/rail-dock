import {
    delay_color,
    formatTime
} from "../utils/helpers.js"

export function showResult_getLive(info,display,formatTime,createMap) {
    const train = info.data.train;
    const route = info.data.route;

    const currentLocation = info.data.currentLocation;
    const previousHalt = info.data.previousHalt;
    const nextHalt = info.data.nextHalt;
    const exceptions = info.data.exceptions;

    let html = `
        <div class="train_header">
    <div class="train_header2 top_header">
        <span class="train_logo"><img src="../IMAGES/Train2.svg" alt="Logo" width="24" height="24"></span>
        <span class="train_no" style="margin-left: 10px;">Train No: ${train.number}</span>
        <span class="train_name" style="margin-left: 10px;">Train Name: ${train.name}</span><br>
    </div>
    <div class="train_header2 second_header">
        <div class="train_source" style="margin-left: 10px; padding:9px; border-radius: 15px;">Source:
            ${train.source?.code ?? "N/A"}</div>
            <span class="arrow" style="margin-left: 10px;"><img src="../IMAGES/arrow.svg" alt="Arrow" width="24" height="24"></span>
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
            font = "color:darkmagenta;";
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
<div class="circle" style="${color} ${font}"><img src="../IMAGES/RaillTrack.svg" alt="Logo" width="24" height="24"></div>
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
                <p style="${delay_color(stop.delayArrival)}">ARR DELAY:${stop.delayArrival ?? "  -  "} MIN</p>
                <p style="${delay_color(stop.delayDeparture)}">DEP DELAY:${stop.delayDeparture ?? "  -  "} MIN</p>
            </div>
            </div>
            </div>
        `;
    });

    html += `<div>`;
    display.innerHTML = html;
    createMap(info.data.route,display);

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