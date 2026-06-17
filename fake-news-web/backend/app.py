from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn.functional as F
import numpy as np
import os
import gc
import re
from transformers import AutoModelForSequenceClassification, AutoTokenizer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = "V1gnesh/fake-news-model"
HF_TOKEN   = os.getenv("HF_TOKEN")
MAX_LENGTH = 256

device = torch.device("cpu")
torch.set_num_threads(1)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    token=HF_TOKEN,
    low_cpu_mem_usage=True
)

model = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

model.to(device)
model.eval()

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME,
    token=HF_TOKEN
)

gc.collect()

# ── Must match training-time cleaning exactly ──────────────
DATELINE_RE   = re.compile(r'^[A-Z][A-Z\s,\.]{2,}\s*\([^)]+\)\s*[-–]\s*')
SOURCE_TAG_RE = re.compile(r'\((Reuters|AP|AFP|UPI|CNN|BBC|NPR|REUTERS)\)', re.IGNORECASE)
HTML_TAG_RE   = re.compile(r'<[^>]+>')
WHITESPACE_RE = re.compile(r'\s+')

def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = DATELINE_RE.sub('', text)
    text = SOURCE_TAG_RE.sub('', text)
    text = HTML_TAG_RE.sub('', text)
    text = WHITESPACE_RE.sub(' ', text)
    return text.strip()


class NewsRequest(BaseModel):
    text: str


@app.post("/predict")
def predict(news: NewsRequest):
    cleaned = clean_text(news.text)   # ← the actual fix

    inputs = tokenizer(
        cleaned,
        truncation=True,
        padding="max_length",
        max_length=MAX_LENGTH,
        return_tensors="pt"
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        logits = model(**inputs).logits
        probs  = F.softmax(logits, dim=-1)[0].cpu().numpy()

    pred_id = int(np.argmax(probs))
    label   = "REAL" if pred_id == 1 else "FAKE"

    return {
        "label"     : label,
        "confidence": round(float(probs[pred_id]), 4),
        "prob_fake" : round(float(probs[0]), 4),
        "prob_real" : round(float(probs[1]), 4),
    }


@app.api_route("/", methods=["GET", "HEAD"])
async def home(request: Request):
    return {"status": "Fake News Detection API is running"}