# TruthLens — News Credibility System

[![Frontend](https://img.shields.io/badge/FRONTEND-VERCEL-black?style=for-the-badge&logo=vercel)](https://fake-news-detection-transformers.vercel.app/)
[![Backend](https://img.shields.io/badge/BACKEND-HUGGINGFACE-yellow?style=for-the-badge&logo=huggingface)](https://v1gnesh-truthlens.hf.space)
![Model](https://img.shields.io/badge/MODEL-DISTILBERT-orange?style=for-the-badge&logo=huggingface)
![Framework](https://img.shields.io/badge/FASTAPI-PRODUCTION-green?style=for-the-badge&logo=fastapi)
![Monitoring](https://img.shields.io/badge/MONITORING-UPTIMEROBOT-purple?style=for-the-badge)

> End-to-end fake news detection using fine-tuned DistilBERT — from research experimentation to a fully deployed, cloud-based AI application.

| | Link |
|---|---|
| 🔗 Frontend | [fake-news-detection-transformers.vercel.app](https://fake-news-detection-transformers.vercel.app/) |
| 🔗 Backend API | [v1gnesh-truthlens.hf.space](https://v1gnesh-truthlens.hf.space) |
| 📊 Presentation | [Download](./presentation/Fake-News-Credibility-System-Project-Scope.pptx) |

> ⚠️ Backend runs on Hugging Face Spaces' free CPU Basic tier. First request after inactivity may take ~60 seconds due to cold start.

---

## 📸 Screenshots

### Prediction UI
![Prediction UI](./screenshots/prediction-ui.png)

---

## Overview

Most ML projects stop at a notebook. TruthLens goes further — a complete research-to-production pipeline covering model training, API serving, frontend integration, cloud deployment, and uptime monitoring.

A user pastes a news article. The frontend sends it to a FastAPI backend on Hugging Face Spaces, which runs it through a fine-tuned DistilBERT model and returns a prediction with a confidence score. The whole round trip takes under a second on a warm instance.

---

## System Architecture

```
User Input (Text)
       │
       ▼
Next.js Frontend  (Vercel)
TypeScript + Tailwind + Framer Motion
       │
       ▼  POST /predict
       │
       ▼
FastAPI Backend  (Hugging Face Spaces)
       │
       ▼
   Tokenizer
       │
       ▼
Fine-Tuned DistilBERT
       │
       ▼
Softmax → Label + Confidence
       │
       ▼
   JSON Response
       │
       ▼
  🟢 REAL  /  🔴 FAKE
```

---

## Features

- Real-time prediction via fine-tuned DistilBERT
- Confidence score visualization with animated results
- REST API with `POST /predict` endpoint
- Model loaded at startup for low-latency inference
- Cold-start resilient frontend with 60s timeout handling
- Uptime monitoring via UptimeRobot

---

## Model Development Pipeline

**1. Dataset Exploration**
Label distribution analysis, data validation, cleaning, and preprocessing.

**2. Tokenization Strategy**
Sequence length tuning, padding and truncation optimization for DistilBERT input constraints.

**3. Baseline Models**
Logistic Regression, Naive Bayes, and TF-IDF benchmarks established before fine-tuning.

**4. Transformer Fine-Tuning**
DistilBERT fine-tuned using Cross-Entropy Loss + AdamW optimizer with GPU-accelerated training via HuggingFace Transformers and PyTorch.

**5. Export & Integration**
Model and tokenizer serialized, inference validated locally, then integrated into FastAPI for production serving.

---

## Evaluation

| Model | Accuracy | F1-Score |
|-------|----------|----------|
| Logistic Regression | 0.9212 | 0.9245 |
| Naive Bayes | 0.8799 | 0.8878 |
| **DistilBERT (Fine-Tuned)** | **0.9505** | **0.9505** |

Transformer fine-tuning significantly outperforms traditional ML baselines across all metrics. *(Baseline scores reflect the original dataset prior to the WELFake expansion; DistilBERT scores reflect the final 71,744-sample corpus.)*

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| NLP Model | DistilBERT (HuggingFace Transformers) |
| Deep Learning | PyTorch |
| Backend | FastAPI |
| Frontend | Next.js 15 + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment | Vercel + Hugging Face Spaces |
| Monitoring | UptimeRobot |

---

## Repository Structure

```
fake-news-detection-transformers/
├── data/                        # Dataset placeholder
├── models/                      # Trained model checkpoints
├── notebooks/                   # Research + training pipeline
├── presentation/                # Project documentation
├── results/                     # Evaluation metrics
│
└── fake-news-web/
    ├── backend/                 # FastAPI inference server
    │   ├── app.py
    │   ├── requirements.txt
    │   └── final_model/         # ⚠️ Git-ignored — download separately
    │
    └── frontend/                # Next.js 15 web app
        ├── app/
        ├── components/
        ├── lib/
        └── package.json
```

---

## API Reference

### `POST /predict`

**Request**
```json
{ "text": "News article content..." }
```

**Response**
```json
{ "label": "REAL", "confidence": 0.94 }
```

**cURL**
```bash
curl -X POST https://v1gnesh-truthlens.hf.space/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Scientists confirm new climate policy impact..."}'
```

**JavaScript**
```js
const res = await fetch("https://v1gnesh-truthlens.hf.space/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Scientists confirm new climate policy impact..." })
});
const data = await res.json();
```

---

## Run Locally

**Backend**
```bash
cd fake-news-web/backend
pip install -r requirements.txt
uvicorn app:app --reload
# http://127.0.0.1:8000
```

**Frontend**
```bash
cd fake-news-web/frontend
npm install
npm run dev
# http://localhost:3000
```

> Dataset excluded from repo due to size. To reproduce training: download the dataset, place it in `data/`, and run the notebooks sequentially.

---

## Key Engineering Decisions

**DistilBERT over full BERT** — 40% smaller, 60% faster, retains 97% of BERT's performance. Right tradeoff for a free-tier deployment target.

**Separate frontend/backend deployment** — Vercel for the frontend and Hugging Face Spaces for the backend allows independent scaling, separate environment variable management, and zero-downtime frontend updates while the model server restarts.

**Cold-start mitigation** — The frontend implements a 60-second timeout with a user-facing loading state rather than failing silently. UptimeRobot pings the backend periodically to reduce cold start frequency.

**Model loaded at startup** — DistilBERT is loaded once when FastAPI starts rather than per-request, keeping inference latency low on warm instances.

---

## Roadmap

- [ ] Upgrade to a non-sleeping backend tier
- [ ] Add attention visualization for explainability
- [ ] Batch prediction endpoint
- [ ] Prediction logging with database
- [ ] Model versioning and CI/CD pipeline

---

## Contact

**Vignesh P C** — [GitHub](https://github.com/Vignesh-P-C) · [LinkedIn](https://www.linkedin.com/in/vignesh-p-c/)
<div align="center">
  <sub>Built with 🤗 Transformers · FastAPI · Next.js · Cloud Deployment</sub>
</div>