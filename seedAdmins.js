require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const connectDB = require("./config/db");

const admins = [
  {
    username: "chamber_admin",
    password: "password123", // User should change this
    siteId: "ParekhChamberofTextile01",
    domain: "parekhchamber.com"
  },
  {
    username: "trade_admin",
    password: "password123",
    siteId: "ParekheTradeMarket02",
    domain: "parekhtrade.com"
  },
  {
    username: "polyfabrics_admin",
    password: "password123",
    siteId: "ParekhSouthernPolyfabrics03",
    domain: "parekhpolyfabrics.com"
  },
  {
    username: "linen_admin",
    password: "password123",
    siteId: "ParekhLinen04",
    domain: "parekhlinen.com"
  },
  {
    username: "rayon_admin",
    password: "password123",
    siteId: "ParekhRayon05",
    domain: "parekhrayon.com"
  },
  {
    username: "fabrics_admin",
    password: "password123",
    siteId: "ParekhFabrics06",
    domain: "parekhfabrics.com"
  },
  {
    username: "silk_admin",
    password: "password123",
    siteId: "ParekhSilk07",
    domain: "parekhsilk.com"
  }
];

const seedAdmins = async () => {
  try {
    await connectDB();

    // Clear existing admins if any (be careful in production)
    // await Admin.deleteMany({});

    for (const adminData of admins) {
      const existing = await Admin.findOne({ username: adminData.username, siteId: adminData.siteId });
      if (!existing) {
        await Admin.create(adminData);
        console.log(`✅ Created admin: ${adminData.username} for ${adminData.domain}`);
      } else {
        // Force update password to ensure it's 'password123'
        existing.password = adminData.password;
        await existing.save();
        console.log(`🔄 Password updated for existing admin: ${adminData.username}`);
      }
    }

    console.log("🚀 Seeding completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admins:", error);
    process.exit(1);
  }
};

seedAdmins();
