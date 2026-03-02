# 📰 News Credibility System
End-to-End Fake News Detection using Transformers

This project implements a complete **News Credibility System** using Transformer-based models such as **BERT / DistilBERT**.

It evolves from a structured research pipeline into a deployable full-stack ML system.

---

## Project Status

✅ Transformer model trained
✅ Evaluation completed
🔄 Backend (FastAPI) in development
🔄 Frontend integration pending
🔄 Deployment planned

---

## 📊 Project Scope Presentation:

A presentation explaining the problem statement, motivation, scope, and planned methodology for fake news detection.

👉 [Download Presentation](presentation/Understanding-Fake-News-Cassification-System-and-Project-Scope-of-my-Model.pptx)

---

## 🎯 Goal

Binary classification of news articles into:
0 → Real News
1 → Fake News

The system takes raw article text as input and outputs:
Prediction (Fake / Real)
Confidence score

---

## 🧠 Problem Statement

Misinformation spreads rapidly across digital platforms.
This project aims to detect fake news using Transformer-based deep learning models capable of contextual text understanding.

---

## 🏗️ System Architecture
```
User Input (Text)
↓
Frontend (HTML / CSS / JavaScript)
↓
POST Request → /predict
↓
FastAPI Backend
↓
Tokenizer
↓
Fine-Tuned Transformer Model
↓
Prediction + Confidence
↓
JSON Response
↓
Displayed in UI
```

---

## 📂 Repository Structure
```
fake-news-detection-transformers/
│
├── data/                       # Dataset placeholder (.gitkeep used)
├── models/                     # Saved trained models
├── notebooks/                  # Step-by-step ML development
│   ├── 01_environment_setup.ipynb
│   ├── 02_dataset_exploration.ipynb
│   ├── 03_tokenization_exploration.ipynb
│   ├── 04_data_pipeline.ipynb
│   ├── 05_first_training_run.ipynb
│   └── 06_final_training_and_inference.ipynb
│
├── presentation/               # Project documentation slides
├── results/                    # Evaluation outputs
│
└── README.md
```

---

## 🧪 Model Development Pipeline
### 1. Environment Setup
- Library installation
- GPU configuration
- Dependency management

### 2️. Dataset Exploration
- Label distribution analysis
- Data inspection
- Preprocessing validation

### 3️. Tokenization Analysis
- Sequence length study
- Padding & truncation
- Attention masks

### 4️. Data Pipeline Construction
- HuggingFace Dataset integration
- PyTorch DataLoader setup

### 5. Baseline Models
- Logistic Regression
- Naive Bayes
- TF-IDF Vectorization
- These models establish performance benchmarks.

### 6. Transformer Fine-Tuning
- Pretrained BERT / DistilBERT
- Cross-Entropy Loss
- AdamW Optimizer
- GPU-based training

### 7. Final Model Export
- Model saved for deployment
- Tokenizer exported
- Inference tested

---

## 📊 Evaluation Metrics

Models evaluated using:
- Accuracy
- Precision
- Recall
- F1-Score
- Confusion Matrix

Transformer models outperform traditional ML baselines.

---

## 🚫 Dataset Notice

The dataset is not included in this repository due to size limitations.

To reproduce results:
1. Download dataset from original source
2. Place it inside the `data/` folder
3. Run notebooks sequentially

The `.gitignore` file excludes dataset files while preserving folder structure.

---

## 🏗️ Backend (Planned Architecture)

The trained model will be served using FastAPI.

### Backend Structure
```
fake-news-web/
│
└── backend/
    ├── app.py
    ├── final_model/
    └── requirements.txt
```
### API Endpoint

`POST /predict`

#### Request Body
```
{
  "text": "News article content..."
}
```
#### Response
```
{
  "prediction": "Fake",
  "confidence": 0.93
}
```
The model will be loaded once at server startup for efficient inference.

---

## 🎨 Frontend (Planned)

The frontend will include:
- Textarea for article input
- “Check News” button
- POST request to backend
- Display of:
  1. Fake / Real result
  2. Confidence percentage
  3. Visual indicator (green/red)

Built using:
- HTML
- CSS
- JavaScript (Fetch API)

---
