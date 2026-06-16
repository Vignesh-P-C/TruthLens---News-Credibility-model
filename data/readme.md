# Data

This folder contains the datasets used to train the TruthLens news credibility model. Dataset files are excluded from the repository due to size constraints — see download instructions below.

---

## Datasets Used

### 1. Fake/True News CSV (Primary Corpus)
| Property | Detail |
|---|---|
| Source | Kaggle — Fake and Real News Dataset |
| URL | https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset |
| Files | `Fake.csv`, `True.csv` |
| Size | ~39,000 articles after cleaning |
| Labels | 0 = Fake, 1 = Real |
| Domain | US political news, 2016–2017 |
| Format | `title`, `text`, `subject`, `date` |

Real articles sourced from Reuters. Fake articles sourced from flagged domains identified by PolitiFact and Wikipedia.

---

### 2. LIAR Dataset
| Property | Detail |
|---|---|
| Source | William Yang Wang, ACL 2017 |
| URL | https://www.kaggle.com/datasets/doanquanvietnamca/liar-dataset |
| Files | `train.tsv`, `test.tsv` |
| Size | ~8,000 statements after filtering |
| Labels | Remapped from 6-class to binary (pants-fire/false/barely-true → 0, mostly-true/true → 1) |
| Domain | Short political statements from PolitiFact |
| Format | `id`, `label`, `statement`, `speaker`, `context`, and more |

Half-true statements were excluded to maintain clean binary signal. Used train and test splits for training.

---

### 3. WELFake Dataset
| Property | Detail |
|---|---|
| Source | Kaggle — WELFake |
| URL | https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification |
| File | `WELFake_Dataset.csv` |
| Size | ~63,000 articles after cleaning and deduplication |
| Labels | 0 = Fake, 1 = Real |
| Domain | Politics, health, science, business, entertainment |
| Format | `title`, `text`, `label` |

WELFake combines four sources: Kaggle fake news, McIntire, Reuters, and BuzzFeed News. Added to expand domain coverage beyond US political news.

---

## Combined Training Corpus

| Dataset | Samples | Class Balance |
|---|---|---|
| Fake/True CSVs | ~39,000 | ~49% real |
| LIAR (3x oversampled) | ~24,000 | ~45% real |
| WELFake | ~63,000 | ~49% real |
| **Total (after dedup)** | **71,744** | **49.85% real** |

All datasets were deduplicated against each other. Datelines (`WASHINGTON (Reuters) —`) and source tags were stripped from all text before training to prevent shortcut learning.

---

## Download Instructions

To reproduce training, download the following files and place them in this `data/` folder:

```bash
# 1. Fake/True CSVs
# Download from: https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset
# Place: data/Fake.csv and data/True.csv

# 2. LIAR dataset
# Download from: https://huggingface.co/datasets/liar
# Place: data/train.tsv and data/test.tsv

# 3. WELFake
# Download from: https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification
# Place: data/WELFake_Dataset.csv
```

Then run the notebooks in order from `notebooks/` to reproduce the full training pipeline.