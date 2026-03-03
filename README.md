# News Credibility System
### End-to-End Fake News Detection using Transformers

A project that started as a research notebook and ended up as a fully deployed web app. It uses a fine-tuned DistilBERT model to classify news articles as real or fake, with a FastAPI backend and a Next.js frontend — both live in the cloud.

---

## Live Links

- **Frontend:** https://your-vercel-url.vercel.app
- **Backend API:** https://fake-news-detection-transformers-2.onrender.com
- **Presentation:** [Download here](./presentation/)

> The backend is on Render's free tier, so the first request after a period of inactivity can take up to ~60 seconds to wake up. The frontend handles this with an extended timeout.

---

## What's been done

- [x] Trained and evaluated a DistilBERT classifier
- [x] Built a FastAPI backend that loads the model at startup
- [x] Built a Next.js frontend with animated predictions
- [x] Deployed everything (Vercel + Render)
- [x] Set up uptime monitoring via UptimeRobot

---

## How it works

The user pastes a news article into the frontend. It hits a `/predict` endpoint on the backend, which runs the text through the fine-tuned model and returns a label (REAL or FAKE) and a confidence score.

```
Next.js (Vercel)  →  POST /predict  →  FastAPI (Render)  →  DistilBERT  →  JSON response
```

Full flow if you want the detail:

```
User Input
    │
    ▼
Next.js Frontend
    │
    ▼  POST /predict
    │
    ▼
FastAPI Backend
    │
    ▼
Tokenizer → DistilBERT → Softmax
    │
    ▼
{ label: "REAL", confidence: 0.94 }
    │
    ▼
Rendered result
```

---

## Repo structure

```
fake-news-detection-transformers/
│
├── data/                    # dataset goes here (not committed, see below)
├── models/                  # saved model checkpoints
├── notebooks/               # all training and evaluation code
├── presentation/            # project writeup / slides
├── results/                 # evaluation outputs
│
├── fake-news-web/
│   ├── backend/             # FastAPI app
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── final_model/     # not in git (too large)
│   │
│   └── frontend/            # Next.js 15
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── package.json
│
└── README.md
```

---

## Model development

The notebooks walk through the full pipeline:

1. **Environment setup** — installs, GPU config, reproducibility
2. **Data exploration** — label distribution, cleaning, validation
3. **Tokenization** — figuring out sequence lengths, padding strategy
4. **Baselines** — Logistic Regression, Naive Bayes, TF-IDF (spoiler: transformers win)
5. **Fine-tuning** — DistilBERT with AdamW + Cross-Entropy, trained on GPU
6. **Export** — model and tokenizer saved, tested standalone, then plugged into FastAPI

---

## Results

Evaluated on accuracy, precision, recall, F1, and confusion matrix. DistilBERT significantly outperforms the baseline models. Full numbers are in `results/`.

---

## Running locally

**Backend:**
```bash
cd fake-news-web/backend
pip install -r requirements.txt
uvicorn app:app --reload
# runs at http://127.0.0.1:8000
```

**Frontend:**
```bash
cd fake-news-web/frontend
npm install
npm run dev
# runs at http://localhost:3000
```

---

## API

**`POST /predict`**

```json
// request
{ "text": "article content here..." }

// response
{ "label": "REAL", "confidence": 0.94 }
```

---

## Dataset

Not included in the repo (too large). To retrain:
1. Download the dataset
2. Drop it in `data/`
3. Run the notebooks in order

---

## A few notes on decisions made

- Went with **DistilBERT** over full BERT — good accuracy, much faster to train and serve
- Kept the frontend and backend separate so they can be deployed and scaled independently
- Extended the frontend request timeout to handle Render cold starts gracefully
- Added a monitoring endpoint (`GET /`) so UptimeRobot can ping it and reduce sleep frequency

---

## Things I'd do differently / next steps

- [ ] Move to a paid backend tier to avoid cold starts
- [ ] Add attention visualization for explainability
- [ ] Batch prediction endpoint
- [ ] Log predictions to a database
- [ ] Proper CI/CD pipeline

---

## Stack

| | |
|---|---|
| Model | DistilBERT via HuggingFace |
| Backend | FastAPI + PyTorch |
| Frontend | Next.js 15, TypeScript, Tailwind, Framer Motion |
| Hosting | Vercel (frontend), Render (backend) |
| Monitoring | UptimeRobot |

---

<div align="center">
  <sub>Built with HuggingFace Transformers · FastAPI · Next.js</sub>
</div>