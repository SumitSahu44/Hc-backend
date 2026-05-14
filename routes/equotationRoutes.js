const express = require("express");
const router = express.Router();
const {
    getEQuotations,
    addEQuotation,
    updateEQuotation,
    deleteEQuotation
} = require("../controllers/equotationController");

router.get("/", getEQuotations);
router.post("/", addEQuotation);
router.put("/:id", updateEQuotation);
router.delete("/:id", deleteEQuotation);

module.exports = router;
