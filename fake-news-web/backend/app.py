from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import DistilBertForSequenceClassification, AutoTokenizer

app = FastAPI()

# 🔥 ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
model = DistilBertForSequenceClassification.from_pretrained("final_model")
tokenizer = AutoTokenizer.from_pretrained("final_model")

model.eval()

class NewsRequest(BaseModel):
    text: str

@app.post("/predict")
def predict(news: NewsRequest):
    inputs = tokenizer(
        news.text,
        truncation=True,
        padding="max_length",
        max_length=256,
        return_tensors="pt"
    )

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