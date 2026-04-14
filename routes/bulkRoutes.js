// routes/bulkRoutes.js
const router = require("express").Router();
const { createBulk, getBulks, deleteBulkSeller } = require("../controllers/bulkController");

router.post("/", createBulk);
router.get("/", getBulks);
router.delete("/:id", deleteBulkSeller);

module.exports = router;