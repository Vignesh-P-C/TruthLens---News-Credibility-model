from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn.functional as F
import numpy as np
import os
from transformers import AutoModelForSequenceClassification, AutoTokenizer  # ← changed

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = "V1gnesh/fake-news-model"  # ← same, no change
HF_TOKEN = os.getenv("HF_TOKEN")

device = torch.device("cpu")

# This line stays exactly the same — AutoModel handles RoBERTa automatically
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,  # "V1gnesh/fake-news-model"
    token=HF_TOKEN,
        low_cpu_mem_usage=True   # ← add this

)

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME,
    token=HF_TOKEN
)

model.to(device)
model.eval()
import gc
torch.set_num_threads(1)
gc.collect()
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
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        logits = model(**inputs).logits
        probs = F.softmax(logits, dim=-1)[0].cpu().numpy()  # ← changed

    pred_id = int(np.argmax(probs))
    label = "REAL" if pred_id == 1 else "FAKE"

    return {
        "label": label,
        "confidence": round(float(probs[pred_id]), 4),
        "prob_fake":  round(float(probs[0]), 4),   # ← new
        "prob_real":  round(float(probs[1]), 4),   # ← new
    }

@app.api_route("/", methods=["GET", "HEAD"])
async def home(request: Request):
    return {"status": "Fake News Detection API is running"}