const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const blogController = require("../controllers/blogController");

// Ensure upload directory exists
const uploadDir = "uploads/blogs";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get("/", blogController.getBlogs);
router.post("/", upload.single("thumbnail"), blogController.addBlog);
router.put("/:id", upload.single("thumbnail"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
