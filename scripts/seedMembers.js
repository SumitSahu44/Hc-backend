const mongoose = require('mongoose');
const ManagementMember = require('../models/ManagementMember');
require('dotenv').config();

const seedMembers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const siteId = 'ParekhChamberofTextile01';
    
    const existing = await ManagementMember.countDocuments({ siteId });
    if (existing > 0) {
      console.log("Management members already exist. Skipping seed.");
    } else {
      await ManagementMember.create([
        {
          siteId,
          name: "Mr. H.C. Parekh",
          role: "Managing Director",
          image: "https://res.cloudinary.com/dya0evxko/image/upload/v1715690000/placeholder.jpg"
        }
      ]);
      console.log("Management members seeded successfully!");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedMembers();
