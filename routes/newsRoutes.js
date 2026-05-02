const express = require("express");
const router = express.Router();
const axios = require("axios");
const News = require("../models/News");

// ===============================
// PREDICT ALL MODELS
// ===============================
router.post("/predict", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Text is required"
      });
    }

    const models = ["bert", "lstm", "logistic"];

    const results = await Promise.all(
      models.map(async (model) => {
        const response = await axios.post(
          "http://127.0.0.1:8000/predict",
          {
            text,
            model
          }
        );

        return response.data;
      })
    );

    // Save one history record
    await News.create({
      text,
      prediction: results[0].prediction,
      confidence: results[0].confidence
    });

    res.json({ results });

  } catch (error) {
    console.log("ML ERROR:", error.message);

    res.status(500).json({
      message: "ML error"
    });
  }
});

// ===============================
// HISTORY
// ===============================
router.get("/history", async (req, res) => {
  try {
    const history = await News.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching history"
    });
  }
});

module.exports = router;