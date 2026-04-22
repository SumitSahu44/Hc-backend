const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const productController = require("../controllers/productController");

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.get("/", productController.getProducts);
router.post("/", upload.single("image"), productController.addProduct);
router.put("/:id", upload.single("image"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
