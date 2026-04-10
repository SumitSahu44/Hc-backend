// routes/enquiryRoutes.js
const router = require("express").Router();
const { createEnquiry } = require("../controllers/enquiryController");

router.post("/", createEnquiry);

module.exports = router;