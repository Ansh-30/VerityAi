from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import joblib
import torch
import numpy as np

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

from transformers import (
    DistilBertTokenizerFast,
    DistilBertForSequenceClassification
)

# ==================================================
# APP
# ==================================================
app = FastAPI(title="Verity AI Fake News Detection API")

# ==================================================
# CORS FIX
# ==================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================================================
# LOAD MODELS
# ==================================================

# Logistic Regression
logistic_model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

# LSTM
lstm_model = load_model("lstm.h5")
tokenizer = joblib.load("tokenizer.pkl")

# DistilBERT
bert_tokenizer = DistilBertTokenizerFast.from_pretrained("./bert_model")
bert_model = DistilBertForSequenceClassification.from_pretrained("./bert_model")
bert_model.eval()

# ==================================================
# REQUEST MODEL
# ==================================================
class NewsRequest(BaseModel):
    text: str

# ==================================================
# HOME
# ==================================================
@app.get("/")
def home():
    return {
        "message": "Verity AI API Running 🚀"
    }

# ==================================================
# LOGISTIC PREDICTION
# ==================================================
def predict_logistic(text):
    vec = vectorizer.transform([text])

    pred = logistic_model.predict(vec)[0]
    probs = logistic_model.predict_proba(vec)[0]

    conf = round(float(np.max(probs)) * 100, 2)

    return {
        "model": "Logistic Regression",
        "prediction": "Real News" if pred == 1 else "Fake News",
        "confidence": conf
    }

# ==================================================
# LSTM PREDICTION
# ==================================================
def predict_lstm(text):
    seq = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(seq, maxlen=300)

    prob = float(lstm_model.predict(padded, verbose=0)[0][0])

    pred = 1 if prob > 0.5 else 0

    conf = round(prob * 100 if pred == 1 else (1 - prob) * 100, 2)

    return {
        "model": "LSTM",
        "prediction": "Real News" if pred == 1 else "Fake News",
        "confidence": conf
    }

# ==================================================
# DISTILBERT PREDICTION
# ==================================================
def predict_bert(text):
    inputs = bert_tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=256
    )

    with torch.no_grad():
        outputs = bert_model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1).numpy()[0]

    pred = int(np.argmax(probs))
    conf = round(float(np.max(probs)) * 100, 2)

    return {
        "model": "DistilBERT",
        "prediction": "Real News" if pred == 1 else "Fake News",
        "confidence": conf
    }

# ==================================================
# HISTORY (TEMP MEMORY)
# ==================================================
history = []

@app.get("/history")
def get_history():
    return history[::-1]

# ==================================================
# MAIN PREDICT ROUTE
# ==================================================
@app.post("/predict")
def predict(news: NewsRequest):
    text = news.text.strip()

    if not text:
        return {"error": "Text is required"}

    bert_result = predict_bert(text)
    lstm_result = predict_lstm(text)
    logistic_result = predict_logistic(text)

    final_result = logistic_result["prediction"]
    final_conf = logistic_result["confidence"]

    # Save history
    history.append({
        "text": text,
        "prediction": final_result,
        "confidence": final_conf
    })

    return {
        "text": text,
        "final_verdict": final_result,
        "results": [
            bert_result,
            lstm_result,
            logistic_result
        ]
    }

# ==================================================
# RUN
# ==================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )