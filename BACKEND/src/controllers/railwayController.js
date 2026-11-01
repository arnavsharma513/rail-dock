
const railwayService = require("../services/railwayService");

// 1. Get train information
async function getTrain(req, res, next) {
    try {
        const { trainNumber } = req.params;

        if (!/^\d{1,5}$/.test(trainNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid train number"
            });
        }

        const data = await railwayService.getTrain(trainNumber);
        res.json(data);

    } catch (error) {
        next(error);
    }
}

// 2. Get PNR status
async function getPnr(req, res, next) {
    try {
        const { pnrNumber } = req.params;

        if (!/^\d{10}$/.test(pnrNumber)) {
            return res.status(400).json({
                success: false,
                message: "PNR number must contain 10 digits"
            });
        }

        const data = await railwayService.getPnr(pnrNumber);
        res.json(data);

    } catch (error) {
        next(error);
    }
}

// 3. Get live train status
async function getLive(req, res, next) {
    try {
        const { trainNumber } = req.params;
        const { date } = req.query;

        if (!/^\d{1,5}$/.test(trainNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid train number"
            });
        }

        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                success: false,
                message: "A valid date in YYYY-MM-DD format is required"
            });
        }

        const data = await railwayService.getLive(trainNumber, date);
        res.json(data);

    } catch (error) {
        next(error);
    }
}

// 4. Get trains between stations
async function getTrainsBetween(req, res, next) {
    try {
        const { source, destination } = req.params;
        const { date } = req.query;

        if (!/^[A-Za-z0-9]{2,10}$/.test(source) ||
            !/^[A-Za-z0-9]{2,10}$/.test(destination)) {
            return res.status(400).json({
                success: false,
                message: "Invalid station codes"
            });
        }

        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                success: false,
                message: "A valid date in YYYY-MM-DD format is required"
            });
        }

        const data = await railwayService.getTrainsBetween(
            source,
            destination,
            date
        );

        res.json(data);

    } catch (error) {
        next(error);
    }
}

// 5. Get station information
async function getStation(req, res, next) {
    try {
        const { stationCode } = req.params;

        if (!/^[A-Za-z0-9]{2,10}$/.test(stationCode)) {
            return res.status(400).json({
                success: false,
                message: "Invalid station code"
            });
        }

        const data = await railwayService.getStation(stationCode);
        res.json(data);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTrain,
    getPnr,
    getLive,
    getTrainsBetween,
    getStation
};