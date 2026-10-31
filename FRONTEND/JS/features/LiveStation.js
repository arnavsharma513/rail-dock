export function showResult_getStation(info,display) {
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
