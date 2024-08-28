const express = require("express");
const { protect } = require("../controllers/auth.controller");
const { createTrip } = require("../controllers/trip.controller");
const router = express.Router();

router.route("/").post(createTrip);
// router.route("/:id").get(singletrip);

module.exports = router;
