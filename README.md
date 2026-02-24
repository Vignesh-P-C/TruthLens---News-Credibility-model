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

## 📊 Project Scope Presentation

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
