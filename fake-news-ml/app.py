from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

classifier = pipeline(
    "text-classification",
    model="distilbert-base-uncased"
)

@app.route("/")
def home():
    return "Verity AI ML API Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    text = data.get("text", "")

    result = classifier(text)

    label = result[0]["label"]
    score = result[0]["score"]

    prediction = "FAKE" if label == "LABEL_1" else "REAL"

    return jsonify({
        "prediction": prediction,
        "confidence": round(score * 100, 2)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)