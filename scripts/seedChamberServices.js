const mongoose = require('mongoose');
const ChamberService = require('../models/ChamberService');
require('dotenv').config();

const services = [
  {
    title: "Textile Trade Support to our valued Members",
    icon: "HandThumbUpIcon",
    siteId: "ParekhChamberofTextile01"
  },
  {
    title: "Textile Finance and Investment Support to our valued Members",
    icon: "CurrencyDollarIcon",
    siteId: "ParekhChamberofTextile01"
  },
  {
    title: "Industrial Consultation for establishment of Textile Industries and Plants",
    icon: "BuildingOfficeIcon",
    siteId: "ParekhChamberofTextile01"
  },
  {
    title: "Manufacturing Support to the Textile Manufacturers",
    icon: "Cog6ToothIcon",
    siteId: "ParekhChamberofTextile01"
  },
  {
    title: "Trade Support to the Textile Suppliers & Retailers",
    icon: "ShoppingBagIcon",
    siteId: "ParekhChamberofTextile01"
  },
  {
    title: "Trade Consultation for Textile Raw & Finished Products",
    icon: "BriefcaseIcon",
    siteId: "ParekhChamberofTextile01"
  },
  {
    title: "Trade Consultation for Textile Machineries and Spares",
    icon: "WrenchScrewdriverIcon",
    siteId: "ParekhChamberofTextile01"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Remove existing services for this site to avoid duplicates
    await ChamberService.deleteMany({ siteId: "ParekhChamberofTextile01" });
    console.log("Cleared existing services for ParekhChamberofTextile01");

    await ChamberService.insertMany(services);
    console.log("Successfully seeded Chamber Services");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
