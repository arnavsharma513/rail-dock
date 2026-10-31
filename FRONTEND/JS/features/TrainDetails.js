import{
    formatTime
} from "../utils/helpers.js"

export function showResult_getTrain(info,display) {
    const train = info.data.train;
    const route = info.data.route;
    let html = `
    <div class="srch_trn">
    <div class="train_info">
        <span class="train_logo"><img src="../IMAGES/Train4.svg" alt="Logo" width="24" height="24"></span>
        <span class="train_no" style="margin-left: 10px;">Train No: ${train.number}</span>
        <span class="train_name" style="margin-left: 10px;">Train Name: ${train.name}</span><br>
    </div>
    <div class="data train_info2">
        <div class="train_source" style="margin-left: 10px; padding:9px; border-radius: 15px;">Source:
            ${train.source.code ?? "N/A"}<br><span style="font-size:10px;">${train.source.name ?? "N/A"}</span></div>
        <span class="arrow" style="margin-left: 10px;"><img src="../IMAGES/arrow.svg" alt="Arrow" width="24" height="24"></span>
        <div class="train_destination" style="margin-left: 10px;  padding: 9px; border-radius: 15px;">
            Destination:${train.destination.code ?? "N/A"}<br><span style="font-size:10px;">${train.destination.name ??
        "N/A"}</span></div>
    </div>
    <div class="data train_info3" style="auto">
        <div class="train_type" style="margin-left: 10px; padding: 9px; border-radius: 15px;">Train Type:
            ${train.type ?? "N/A"}</div>
        <div class="train_duration" style="margin-left:10px; padding: 9px; border-radius: 15px;">Duration:
            ${train.duration ?? "N/A"} Min
        </div>
        <div class="train_distance" style="margin-left: 10px;  padding: 9px; border-radius: 15px;">Distance:
            ${train.distance ?? "N/A"} KM
        </div>
    </div>
    <div class="data train_info4">
        <span class="running_days">Running Days: ${train.runDays ?? "N/A"}</span>
        <span class="total_stations">Total Stations: ${train.totalHalts ?? "N/A"}</span>
    </div>
    <div class="data train_info5">
        <span class="coach_pos">Coach position:<br>${train.coachPosition}</span>
    </div>
</div>
    <br>
    <h2>ROUTE</h2>
    `;

    route.forEach(stop => {
        html += `
        <div class="stn_box_live">
    <div class="right trnDetailsRoute">
                <div class="head train_no ">
                    <span class="train_logo"><img src="../IMAGES/Train5.svg" alt="Logo" width="24" height="24"></span>
              <span style="border:1px solid; padding:7px; border-radius:10px"> ${stop.station.code ?? "N/A"}</span>
              <span> ${stop.station.name ?? "N/A"}</span>
                </div>
                <div class="data act_time">
                    <p><span style="font-size:12px; font-weight:500;">ARR:</span>${formatTime(stop.arrival) ?? "TBA"}</p>
                    <p><span style="font-size:12px; font-weight:500;">DEP:</span>${formatTime(stop.departure) ?? "TBA"}</p>
            </div>
            <div class="data train_info5">
                <span>Distance: ${stop.distance} KM</span>
                <span>Speed: ${stop.speedToNextStationKmph} KMPH</span>
            </div>
            </div>
            </div>
        `;
    });
    display.innerHTML = html;

}

