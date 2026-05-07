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

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)