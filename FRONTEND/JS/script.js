import {
    FetchStation,
    FetchTrainbetween,
    FetchLive,
    FetchPnr,
    FetchTrain
} from "./api/api.js";

import {
    get_today,
    formatTime
} from "./utils/helpers.js";

import {
    showResult_getLive
} from "./features/GetLiveStatus.js";

import {
    showResult_getTrain
} from "./features/TrainDetails.js";

import {
    showResult_getTrain_between
} from "./features/SearchTrain.js";

import {
    showResult_getStation
} from "./features/LiveStation.js";

import {
    createMap
} from "./map/route-map.js";


const display = document.querySelector(".Result");
const train_num = document.querySelector(`#train-no`);
const train_search = document.querySelector(`#train-search`);
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





async function getTrain(trn) {
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="../IMAGES/Loading.gif" alt="Loading..." width="50" height="50"></span>`;
        const data = await FetchTrain(trn);
        showResult_getTrain(data, display);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="../IMAGES/warning.svg" alt="Error">${error}</span>`;
    }
}
async function getPnr(pnr_num) {
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="../IMAGES/Loading.gif" alt="Loading..." width="50" height="50"></span>`;

        const data = await FetchPnr(pnr_num);
        showResult_getPnr(data);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="../IMAGES/warning.svg" alt="Error">${error}</span>`;
    }
}
async function getLive(train_no, date) {
    if (date === "") {
        date = get_today();
    }
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="../IMAGES/Loading.gif" alt="Loading..." width="50" height="50"></span>`;
        const data = await FetchLive(train_no, date);
        showResult_getLive(data, display, formatTime, createMap);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="../IMAGES/warning.svg" alt="Error">${error}</span>`;
    }
}
async function getTrain_between(src, des, dt) {
    if (dt === "") {
        dt = get_today();
    }
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="../IMAGES/Loading.gif" alt="Loading..." width="50" height="50"></span>`;
        const data = await FetchTrainbetween(src, des, dt);
        showResult_getTrain_between(data, display);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="../IMAGES/warning.svg" alt="Error">${error}</span>`;
    }
}
async function getStation(stn) {
    try {
        display.innerHTML = `<span class="load">Getting data<br><img src="../IMAGES/Loading.gif" alt="Loading..." width="50" height="50"></span>`;
        const data = await FetchStation(stn);
        showResult_getStation(data, display);
    }
    catch (error) {
        display.innerHTML = `<span class="error"><img src="../IMAGES/warning.svg" alt="Error">${error}</span>`;
    }
}

train_search.addEventListener("click", () => {
    const val = train_num.value.trim();
    if (!val) {
        display.innerHTML = `<span class="warning"><img src="../IMAGES/warning.svg" alt="Error"><div>Enter some value</div></span>`;
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
        display.innerHTML = `<span class="warning"><img src="../IMAGES/warning.svg" alt="Error"><div>Enter both stations</div></span>`;
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
    display.innerHTML = `<span class="warning"><img src="../IMAGES/warning.svg" alt="Error"><div>PNR Feature is not available in this version</div></span>`;
});
live_search.addEventListener("click", () => {
    const val = live_stat.value.trim();
    const date = dateInput.value.trim();
    if (!val) {
        display.innerHTML = `<span class="warning"><img src="../IMAGES/warning.svg" alt="Error"><div>Enter some value</div></span>`;
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
        display.innerHTML = `<span class="warning"><img src="../IMAGES/warning.svg" alt="Error"><div>Enter some value</div></span>`;
        return;
    }
    getStation(val);
    display.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
});





