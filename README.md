# 📰 News Credibility System

> **End-to-End Fake News Detection using Transformers**

A complete news credibility pipeline — from research experimentation to a deployable full-stack AI application — powered by fine-tuned **DistilBERT** and served through a modern web interface.

---

## 📊 Project Scope Presentation

A detailed presentation explaining:
-Problem statement
- Motivation
- Research background
- Methodology
- System design
- Implementation roadmap

👉 Download here:
presentation/Understanding-Fake-News-Cassification-System-and-Project-Scope-of-my-Model.pptx

---

## 🚀 Project Status

| Task | Status |
|------|--------|
| Transformer model trained | ✅ Complete |
| Evaluation completed | ✅ Complete |
| FastAPI backend implemented | ✅ Complete |
| Next.js frontend implemented | ✅ Complete |
| Cloud deployment | 🔄 In Progress |

---



## 🌐 Full-Stack Web Application

This project includes a complete, working web interface for real-time news credibility prediction.

```
User → Next.js Frontend → FastAPI Backend → Transformer Model → Prediction
```

### Features

- 🎨 **Interactive UI** with animated results
- ⚡ **Real-time prediction** using fine-tuned DistilBERT
- 📊 **Confidence score visualization**
- 🔌 **REST API** endpoint (`POST /predict`)
- 🧩 **Modular backend** serving model at startup

---

## 🏗️ System Architecture

```
User Input (Text)
        │
        ▼
Next.js Frontend
(TypeScript + Tailwind + Framer Motion)
        │
        ▼ POST /predict
        │
        ▼
FastAPI Backend
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
- Library installation, GPU configuration, dependency management

### 2️⃣ Dataset Exploration
- Label distribution analysis, data inspection, preprocessing validation

### 3️⃣ Tokenization Study
- Sequence length optimization, padding & truncation strategy

### 4️⃣ Baseline Models
- Logistic Regression, Naive Bayes, TF-IDF benchmarks

### 5️⃣ Transformer Fine-Tuning
- Pretrained BERT / DistilBERT
- Cross-Entropy Loss + AdamW Optimizer
- GPU-accelerated training

### 6️⃣ Model Export
- Model + tokenizer saved, inference tested, integrated into FastAPI

---

## 📊 Evaluation Metrics

Transformer models are evaluated against traditional ML baselines across the following:

- **Accuracy** — Overall correctness
- **Precision** — Positive predictive value
- **Recall** — Sensitivity / true positive rate
- **F1-Score** — Harmonic mean of precision & recall
- **Confusion Matrix** — Full error breakdown

> ✨ Transformer models significantly outperform traditional ML baselines.

---

## 🖥️ Running Locally

### 1️⃣ Start the Backend

```bash
cd fake-news-web/backend
python -m uvicorn app:app --reload
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

## 🧩 Technologies Used

| Layer | Technology |
|-------|------------|
| NLP Model | DistilBERT (HuggingFace Transformers) |
| Backend | FastAPI + PyTorch |
| Frontend | Next.js 15 + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment *(Planned)* | Vercel + Render |

---

<div align="center">
  <sub>Built with 🤗 Transformers · FastAPI · Next.js</sub>
</div>