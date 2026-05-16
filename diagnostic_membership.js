// diagnostic_membership.js
require("dotenv").config();
const mongoose = require("mongoose");
const AuthorizedPerson = require("./models/AuthorizedPerson");

async function diagnose() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const persons = await AuthorizedPerson.find({ siteId: "ParekhChamberofTextile01" });
    console.log("Authorized Persons for ParekhChamberofTextile01:");
    console.log(JSON.stringify(persons, null, 2));

    await mongoose.disconnect();
  } catch (error) {
    console.error("Diagnosis Error:", error);
  }
}

diagnose();
