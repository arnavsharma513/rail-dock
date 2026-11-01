
const API_BASE_URL = "https://rail-dock.onrender.com/api/railway"; 

async function requestResult(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}

// 1. Train information
export async function FetchTrain(trn) {
    return requestResult(
        `${API_BASE_URL}/train/${encodeURIComponent(trn)}`
    );
}

// 2. PNR status
export async function FetchPnr(pnr_num) {
    return requestResult(
        `${API_BASE_URL}/pnr/${encodeURIComponent(pnr_num)}`
    );
}

// 3. Live train status
export async function FetchLive(train_no, date) {
    return requestResult(
        `${API_BASE_URL}/live/${encodeURIComponent(train_no)}?date=${encodeURIComponent(date)}`
    );
}

// 4. Trains between stations
export async function FetchTrainbetween(src, des, dt) {
    return requestResult(
        `${API_BASE_URL}/between/${encodeURIComponent(src)}/${encodeURIComponent(des)}?date=${encodeURIComponent(dt)}`
    );
}

// 5. Station information
export async function FetchStation(stn) {
    return requestResult(
        `${API_BASE_URL}/station/${encodeURIComponent(stn)}`
    );
}