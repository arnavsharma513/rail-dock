const apiKey = `rg_28f85b1457204b2eaae342184d63aac0`;
const apiKey2 = `rg_ce21eef8e8624e44a8fa5920cabf217f`;

async function requestResult(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${apiKey2}`
        }
    });
    if (!response.ok) {
        throw new Error(`Unable to connect to our Servers (${response.status})`);
    }

    return await response.json();
}

export async function FetchTrain(trn) {
    const url = `https://api.railradar.in/v1/trains/${trn}?haltsOnly=true`;
    return await requestResult(url);
}

export async function FetchPnr(pnr_num) {
    const url = `https://api.railradar.in/v1/pnr/${pnr_num}`;
    return await requestResult(url);
}


export async function FetchLive(train_no, date) {
    const url = `https://api.railradar.in/v1/trains/${train_no}/live?date=${date}&haltsOnly=true&geometry=true&format=geojson&includeCoordinates=true`;
    return await requestResult(url);
}

export async function FetchTrainbetween(src, des, dt) {
    const url = `https://api.railradar.in/v1/trains/between/${src}/${des}?date=${dt}`;
    return await requestResult(url);
}

export async function FetchStation(stn) {
    const url = `https://api.railradar.in/v1/stations/${stn}/trains`;
    return await requestResult(url);
}