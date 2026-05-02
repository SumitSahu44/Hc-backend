const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { protect } = require("../middleware/authMiddleware");

// @desc Auth admin & get token
// @route POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password, siteId } = req.body;

  try {
    const admin = await Admin.findOne({ username, siteId });

    if (admin && (await admin.comparePassword(password))) {
      const token = jwt.sign(
        { id: admin._id, siteId: admin.siteId },
        process.env.JWT_SECRET || "hc_secret_key_2024",
        { expiresIn: "30d" }
      );

      res.json({
        success: true,
        data: {
          _id: admin._id,
          username: admin.username,
          siteId: admin.siteId,
          domain: admin.domain,
          token
        }
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc Update admin profile (username/password)
// @route PUT /api/auth/profile
router.put("/profile", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      admin.username = req.body.username || admin.username;
      if (req.body.password) {
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();
      
      res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
          _id: updatedAdmin._id,
          username: updatedAdmin.username,
          siteId: updatedAdmin.siteId
        }
      });
    } else {
      res.status(404).json({ success: false, message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
