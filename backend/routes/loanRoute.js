const express = require("express");
const { protect } = require("../controllers/auth.controller");
const { getAllLoans, singleLoan } = require("../controllers/loan.controller");
const router = express.Router();

router.route("/").get(protect, getAllLoans);
router.route("/:id").get(singleLoan);

module.exports = router;
