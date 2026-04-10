// diagnostic.js
require("dotenv").config();
const mongoose = require("mongoose");

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const collections = ["Textile", "quotations", "auctions", "appointments", "etradebuyers", "etradesellers", "contacts", "bulksellers", "authorizedpersons", "products", "categories"];

        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col).countDocuments();
            console.log(`Collection [${col}]: ${count} docs`);
            if (count > 0) {
                const sample = await mongoose.connection.db.collection(col).findOne();
                console.log(`Sample [${col}]:`, JSON.stringify(Object.keys(sample)));
            }
        }

        process.exit(0);
    } catch (err) {
        console.error("Diagnostic failed:", err.message);
        process.exit(1);
    }
};

run();
