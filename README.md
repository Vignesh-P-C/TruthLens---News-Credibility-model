# 📰 News Credibility System

> **End-to-End Fake News Detection using Transformers**
> A Production-Ready Distributed AI System

A complete news credibility pipeline — from research experimentation to a fully deployed, cloud-based AI application — powered by fine-tuned **DistilBERT** and served through a scalable full-stack architecture.

---

## 🌍 Live Deployment

| | Link |
|---|---|
| 🔗 **Frontend** | [https://fake-news-detection-transformers.vercel.app/](https://fake-news-detection-transformers.vercel.app/) |
| 🔗 **Backend API** | [https://fake-news-detection-transformers-2.onrender.com](https://fake-news-detection-transformers-2.onrender.com) |
| 📊 **Presentation** | [Download here](./presentation/) |

> ⚠️ **Note:** Backend runs on Render's free tier. Initial requests after inactivity may take up to ~60 seconds due to cold starts.

---

## 🚀 Project Status

| Task | Status |
|------|--------|
| Transformer model trained | ✅ Complete |
| Evaluation completed | ✅ Complete |
| FastAPI backend implemented | ✅ Complete |
| Next.js frontend implemented | ✅ Complete |
| Production deployment (Vercel + Render) | ✅ Complete |
| Monitoring (UptimeRobot) | ✅ Active |

---

## 🌐 Full-Stack Web Application

This project includes a complete, production-ready web interface for real-time news credibility prediction.

```
User → Vercel Frontend → Render Backend → Transformer Model → Prediction
```

### ✨ Features

- 🎨 **Interactive UI** with animated results
- ⚡ **Real-time prediction** using fine-tuned DistilBERT
- 📊 **Confidence score visualization**
- 🔌 **REST API** endpoint (`POST /predict`)
- 🧠 **Model loaded at startup** for low-latency inference
- 🌍 **Fully deployed** cloud infrastructure
- 🟢 **Uptime monitoring** via UptimeRobot

---

## 🏗️ System Architecture

```
User Input (Text)
        │
        ▼
Next.js Frontend  (Vercel)
TypeScript + Tailwind + Framer Motion
        │
        ▼ POST /predict
        │
        ▼
FastAPI Backend  (Render)
        │
        ▼
    Tokenizer
        │
        ▼
Fine-Tuned DistilBERT Model
        │
        ▼
 Softmax → Label + Confidence
        │
        ▼
    JSON Response
        │
        ▼
Rendered Result  →  🟢 REAL  /  🔴 FAKE
```

---

## ☁️ Production Infrastructure

| Layer | Platform |
|-------|----------|
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Monitoring | UptimeRobot |
| Model Framework | HuggingFace Transformers |
| Deep Learning | PyTorch |

### Deployment Characteristics

- 🔐 Environment variables secured via Vercel
- 🩺 Backend supports `GET` and `HEAD` for health monitoring
- ⏱️ Cold-start resilient frontend (90s timeout handling)
- 🔀 Distributed architecture with frontend/API separation

---

## 📂 Repository Structure

```
fake-news-detection-transformers/
│
├── data/                        # Dataset placeholder
├── models/                      # Trained model checkpoints
├── notebooks/                   # Research + training pipeline
├── presentation/                # Project documentation
├── results/                     # Evaluation metrics
│
├── fake-news-web/
│   ├── backend/                 # FastAPI inference server
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── final_model/         # ⚠️ Ignored from Git
│   │
│   └── frontend/                # Next.js 15 web app
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── package.json
│
└── README.md
```

---

## 🧠 Model Development Pipeline

### 1️⃣ Environment Setup
- Dependency management, GPU configuration, reproducible notebook structure

### 2️⃣ Dataset Exploration
- Label distribution analysis, data validation, cleaning & preprocessing

### 3️⃣ Tokenization Strategy
- Sequence length tuning, padding & truncation optimization

### 4️⃣ Baseline Models
- Logistic Regression, Naive Bayes, TF-IDF benchmarks

### 5️⃣ Transformer Fine-Tuning
- DistilBERT from HuggingFace
- Cross-Entropy Loss + AdamW Optimizer
- GPU-accelerated training

### 6️⃣ Model Export & Integration
- Model + tokenizer serialized, inference validated, integrated into FastAPI

---

## 📊 Evaluation Metrics

Models are evaluated across the following:

- **Accuracy** — Overall correctness
- **Precision** — Positive predictive value
- **Recall** — Sensitivity / true positive rate
- **F1-Score** — Harmonic mean of precision & recall
- **Confusion Matrix** — Full error breakdown

> ✨ Transformer-based models significantly outperform traditional ML baselines.

---

## 🖥️ Running Locally

### 1️⃣ Start the Backend

```bash
cd fake-news-web/backend
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend available at → `http://127.0.0.1:8000`

### 2️⃣ Start the Frontend

```bash
cd fake-news-web/frontend
npm install
npm run dev
```

Frontend available at → `http://localhost:3000`

---

## 📡 API Reference

### `POST /predict`

**Request**
```json
{
  "text": "News article content..."
}
```

**Response**
```json
{
  "label": "REAL",
  "confidence": 0.94
}
```

---

## ⚠️ Dataset Notice

The dataset is **excluded from this repository** due to size constraints.

To reproduce training:
1. Download the dataset
2. Place it inside `data/`
3. Run the notebooks sequentially

---

## 📌 Key Engineering Decisions

- **DistilBERT** chosen for its efficiency-performance tradeoff
- **Separate frontend/backend** architecture for scalability and independent deployment
- **Cloud-native deployment** with secured environment variables
- **Cold-start mitigation** via extended timeout handling on the frontend
- **Monitoring integration** for uptime reliability via UptimeRobot

---

## 📈 Future Improvements

- [ ] Switch to non-sleeping backend hosting tier
- [ ] Add explainability via attention visualization
- [ ] Add batch prediction endpoint
- [ ] Add database logging for predictions
- [ ] Implement model versioning & CI/CD automation

---

## 🧩 Technologies Used

| Layer | Technology |
|-------|------------|
| NLP Model | DistilBERT (HuggingFace Transformers) |
| Deep Learning | PyTorch |
| Backend | FastAPI |
| Frontend | Next.js 15 + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment | Vercel + Render |
| Monitoring | UptimeRobot |

---

<div align="center">
  <sub>Built with 🤗 Transformers · FastAPI · Next.js · Cloud Deployment</sub>
</div>
