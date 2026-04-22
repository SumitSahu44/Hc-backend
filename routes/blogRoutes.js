const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const blogController = require("../controllers/blogController");

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.get("/", blogController.getBlogs);
router.post("/", upload.single("thumbnail"), blogController.addBlog);
router.put("/:id", upload.single("thumbnail"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
