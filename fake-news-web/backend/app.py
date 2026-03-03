from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import os
from transformers import DistilBertForSequenceClassification, AutoTokenizer

app = FastAPI()

# ---------------------------
# CORS Configuration
# ---------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to frontend domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Model Configuration
# ---------------------------
MODEL_NAME = "V1gnesh/fake-news-model"
HF_TOKEN = os.getenv("HF_TOKEN")

device = torch.device("cpu")

model = DistilBertForSequenceClassification.from_pretrained(
    MODEL_NAME,
    token=HF_TOKEN
)

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME,
    token=HF_TOKEN
)

model.to(device)
model.eval()

# ---------------------------
# Request Schema
# ---------------------------
class NewsRequest(BaseModel):
    text: str

# ---------------------------
# Prediction Endpoint
# ---------------------------
@app.post("/predict")
def predict(news: NewsRequest):
    inputs = tokenizer(
        news.text,
        truncation=True,
        padding="max_length",
        max_length=256,
        return_tensors="pt"
    )

    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)
        pred = torch.argmax(probs, dim=1).item()

    label = "REAL" if pred == 1 else "FAKE"
    confidence = probs[0][pred].item()

    return {
        "label": label,
        "confidence": confidence
    }

# ---------------------------
# Health Check Route
# ---------------------------
@app.get("/")
def home():
    return {"status": "Fake News Detection API is running"}