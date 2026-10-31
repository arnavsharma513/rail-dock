const display = document.querySelector(".Result");
const pnr_num = document.querySelector(`#pnr-no`);
const pnr_search = document.querySelector(`#pnr-search`);
const boxes = document.querySelectorAll(".box");

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
        display.innerHTML = `<span class="error"><img src="../IMAGES/warning.svg" alt="Error">${error}</span>`;
    }
}


pnr_search.addEventListener("click", () => {
    display.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
    display.innerHTML = `<span class="warning"><img src="../IMAGES/warning.svg" alt="Error"><div>PNR Feature is not available in this version</div></span>`;
});