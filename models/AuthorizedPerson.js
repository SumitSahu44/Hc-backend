const mongoose = require("mongoose");

const authorizedPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("AuthorizedPerson", authorizedPersonSchema);
