// routes/appointmentRoutes.js
const router = require("express").Router();
const { createAppointment, getAppointments, deleteAppointment } = require("../controllers/appointmentController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post("/", upload.single('proofFile'), createAppointment);
router.get("/", getAppointments);
router.delete("/:id", deleteAppointment);

module.exports = router;
