const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");

router.get("/", careerController.getCareers);
router.post("/", careerController.addCareer);
router.put("/:id", careerController.updateCareer);
router.delete("/:id", careerController.deleteCareer);

module.exports = router;
