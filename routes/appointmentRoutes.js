// routes/appointmentRoutes.js
const router = require("express").Router();
const { createAppointment, getAppointments, deleteAppointment } = require("../controllers/appointmentController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, '../uploads/appointment');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/appointment/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/ /g, '-'));
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('proofFile'), createAppointment);
router.get("/", getAppointments);
router.delete("/:id", deleteAppointment);

module.exports = router;