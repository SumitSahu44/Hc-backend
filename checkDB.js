const mongoose = require("mongoose");
require("dotenv").config();
const Admin = require("./models/Admin");
const connectDB = require("./config/db");

const checkAdmins = async () => {
  try {
    await connectDB();
    const admins = await Admin.find({});
    console.log("Total admins found:", admins.length);
    admins.forEach(a => {
      console.log(`User: ${a.username}, SiteId: ${a.siteId}, Domain: ${a.domain}`);
    });
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkAdmins();
