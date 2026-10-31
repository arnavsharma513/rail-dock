
export function showResult_getTrain_between(info,display) {
    const main = info.data;
    const trainz = info.data.trains;
    let html = `
    <h2>From:${main.from.name}-(${main.from.code})</h2>
    <h2>To:${main.to.name}-(${main.to.code})</h2>
    <h3>Total Trains Running : ${main.count}</h3>
    <br><br>
    `;
    trainz.forEach(stop => {
        html += `
            <div class="srch_trn">
    <div class="trn_info">
        <span class="train_logo"><img src="../IMAGES/Train3.svg" alt="Logo" width="24" height="24"></span>
        <span class="train_no" style="margin-left: 10px;">Train No: ${stop.train.number}</span>
        <span class="train_name" style="margin-left: 10px;">Train Name: ${stop.train.name}</span><br>
    </div>
    <div class="data train_info2">
        <div class="train_source" style="margin-left: 10px; padding:9px; border-radius: 15px;">Departure:
            ${stop.from.code ?? "N/A"}<br><span style="font-size:10px;">${stop.from.name ?? "N/A"}</span><br><span style="font-weight:700; color:rgb(238, 230, 214);">${stop.from.departure}</span></div>
        <span class="arrow" style="margin-left: 10px;"><img src="../IMAGES/arrow.svg" alt="Arrow" width="24" height="24"></span>
        <div class="train_destination" style="margin-left: 10px;  padding: 9px; border-radius: 15px;">
            Arrival:${stop.to.code ?? "N/A"}<br><span style="font-size:10px;">${stop.to.name ??
            "N/A"}</span><br><span style="font-weight:700;color:rgb(238, 230, 214);">${stop.to.arrival}</span></div>
    </div>
    <div class="data train_info3" style="auto">
        <div class="train_type" style="margin-left: 10px; padding: 9px; border-radius: 15px;">Train Type:
            ${stop.train.type ?? "N/A"}</div>
        <div class="train_duration" style="margin-left:10px; padding: 9px; border-radius: 15px;">Duration:
            ${stop.duration ?? "N/A"} Min
        </div>
        <div class="train_distance" style="margin-left: 10px;  padding: 9px; border-radius: 15px;">Distance:
            ${stop.distance ?? "N/A"} KM
        </div>
    </div>
    <div class="data train_info4">
        <span class="running_days">Running Days: ${stop.train.runDays ?? "N/A"}</span>
        <span class="total_stations">Total Stations: ${stop.totalHaltsBetween ?? "N/A"}</span>
    </div>
</div>
        `;
    });
    display.innerHTML = html;
}
