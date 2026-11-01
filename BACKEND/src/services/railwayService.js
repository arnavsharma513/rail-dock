
const axios = require("axios");

const {
    RailRadarBaseUrl,
    RailRadarApiKey
} = require("../config/railway");

// Common function for communicating with RailRadar
async function makeRequest(endpoint) {
    try {
        const response = await axios.get(
            `${RailRadarBaseUrl}${endpoint}`,
            {
                headers: {
                    Authorization: `Bearer ${RailRadarApiKey}`
                },
                timeout: 15000
            }
        );

        return response.data;

    } catch (error) {
        // Diagnostic information (never log API keys)
    console.error("RailRadar API Error:", {
        message: error.message,
        status: error.response?.status,
        response: error.response?.data,
        code: error.code
    });

    const apiError = new Error(
        error.response?.status === 429
            ? "RailRadar request limit reached"
            : "Unable to retrieve railway information"
    );

    apiError.status =
        error.response?.status === 429 ? 429 : 502;

    throw apiError;
        }
}

// 1. Train information
async function getTrain(trainNumber) {
    return makeRequest(
        `/trains/${encodeURIComponent(trainNumber)}?haltsOnly=true`
    );
}

// 2. PNR status
async function getPnr(pnrNumber) {
    return makeRequest(
        `/pnr/${encodeURIComponent(pnrNumber)}`
    );
}

// 3. Live train status
async function getLive(trainNumber, date) {
    const params = new URLSearchParams({
        date,
        haltsOnly: "true",
        geometry: "true",
        format: "geojson",
        includeCoordinates: "true"
    });

    return makeRequest(
        `/trains/${encodeURIComponent(trainNumber)}/live?${params}`
    );
}

// 4. Trains between stations
async function getTrainsBetween(source, destination, date) {
    const params = new URLSearchParams({ date });

    return makeRequest(
        `/trains/between/${encodeURIComponent(source)}/${encodeURIComponent(destination)}?${params}`
    );
}

// 5. Station information
async function getStation(stationCode) {
    return makeRequest(
        `/stations/${encodeURIComponent(stationCode)}/trains`
    );
}

module.exports = {
    getTrain,
    getPnr,
    getLive,
    getTrainsBetween,
    getStation
};