require('dotenv').config();
const { storage } = require('../config/cloudinary');
const multer = require('multer');

console.log("Storage Object:", storage);
try {
    const upload = multer({ storage });
    console.log("Multer instance created successfully");
} catch (err) {
    console.error("Error creating Multer instance:", err);
}
