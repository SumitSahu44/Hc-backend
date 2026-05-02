const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },
  siteId: {
    type: String,
    required: true,
    enum: [
      "all", // For future Super Admin
      "ParekhChamberofTextile01",
      "ParekheTradeMarket02",
      "ParekhSouthernPolyfabrics03",
      "ParekhLinen04",
      "ParekhRayon05",
      "ParekhFabrics06",
      "ParekhSilk07"
    ]
  },
  domain: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Ensure unique username per site
adminSchema.index({ username: 1, siteId: 1 }, { unique: true });


// Hash password before saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
