const axios = require("axios");

exports.analyzeNews = async (req, res) => {
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
          "https://ansh-s30-verity-ai-ml.hf.space/predict",
          {
            text,
            model
          }
        );

        return {
          model,
          result: response.data
        };
      })
    );

    res.json({ results });

  } catch (error) {

    console.log("ML ERROR:", error.message);

    res.status(500).json({
      message: "ML error"
    });
  }
};