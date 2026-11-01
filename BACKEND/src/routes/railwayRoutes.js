const express = require("express");
const router = express.Router();
const railwayController = require("../controllers/railwayController");

router.get("/train/:trainNumber", railwayController.getTrain);
router.get("/pnr/:pnrNumber", railwayController.getPnr);
router.get("/live/:trainNumber", railwayController.getLive);
router.get("/trains-between/:source/:destination", railwayController.getTrainsBetween);
router.get("/station/:stationCode", railwayController.getStation);

module.exports = router;