
require('dotenv').config();
const mongoose = require('mongoose');
const TradeEnquiry = require('../models/TradeEnquiry');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    const collections = ["Textile", "quotations", "auctions", "appointments", "etradebuyers", "etradesellers", "products"];
    for (const colName of collections) {
        const col = mongoose.connection.db.collection(colName);
        const latest = await col.find().sort({ createdAt: -1 }).limit(3).toArray();
        console.log(`\n--- Collection: ${colName} ---`);
        latest.forEach(doc => {
            const file = doc.gstCertificate || doc.proofFile || doc.uploadedDocument || doc.image || (doc.kycDocuments && doc.kycDocuments[0]);
            console.log(`- ID: ${doc._id}, Site: ${doc.siteId}, File: ${file}`);
        });
    }
    process.exit(0);
}

check();
