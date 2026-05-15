const mongoose = require('mongoose');
const ManagementContent = require('../models/ManagementContent');
require('dotenv').config();

const seedManagement = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const siteId = 'ParekhChamberofTextile01';
    
    const existing = await ManagementContent.findOne({ siteId });
    if (existing) {
      console.log("Management content already exists for this site. Skipping seed.");
    } else {
      await ManagementContent.create({
        siteId,
        title: "Our Chamber Management",
        description: "Parekh Chamber of Textile is administered and governed by the highly skilled, experienced and qualified members of the Management."
      });
      console.log("Management content seeded successfully!");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedManagement();
