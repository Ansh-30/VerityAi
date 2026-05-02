const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    text: String,
    prediction: String,
    confidence: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);