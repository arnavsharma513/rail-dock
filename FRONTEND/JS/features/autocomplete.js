export function AutoComplete(){
    console.log("aoutocom");
const src_stn = document.querySelector(`#src-stn`);
const des_stn = document.querySelector(`#des-stn`);
const stn_data = document.querySelector(`#stn-data`);
const live_stat = document.querySelector(`#live-stat`);
const train_num = document.querySelector(`#train-no`);
const sugs_trn = document.querySelector(`#suggestions_trn`);
const sugs_trn2 = document.querySelector(`#suggestions_trn2`);
const sugs_stn1 = document.querySelector(`#suggestion_stn1`);
const sugs_stn2 = document.querySelector(`#suggestion_stn2`);
const sugs_stn3 = document.querySelector(`#suggestion_stn3`);

let stations = {};
fetch("../DATA/stationNames.json")
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
fetch("../DATA/TrainNames.json")
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
}