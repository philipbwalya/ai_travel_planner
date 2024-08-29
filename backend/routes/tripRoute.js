const express = require("express");
const { protect } = require("../controllers/auth.controller");
const { createTrip, getTrip } = require("../controllers/trip.controller");
const router = express.Router();

router.route("/").post(createTrip);
router.route("/:trip_id").get(getTrip);

module.exports = router;
