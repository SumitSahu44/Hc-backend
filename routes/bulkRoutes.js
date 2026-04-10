// routes/bulkRoutes.js
const router = require("express").Router();
const { createBulk, getBulks } = require("../controllers/bulkController");

router.post("/", createBulk);
router.get("/", getBulks);

module.exports = router;