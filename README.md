# 🟡 Gold Price Prediction MVP

A minimal yet intelligent machine learning application that predicts gold prices based on historical and macroeconomic data. Designed to be simple, elegant, and insightful — powered by lovable AI.

---

## ✨ Features

- 📊 Predicts next-day or next-week gold prices
- 🧠 Uses ML algorithms like Linear Regression or Random Forest
- 💛 Gold-themed, minimalist UI with easy-to-read outputs
- 📈 Visuals for trend direction and confidence level
- 🔁 Feedback loop for continuous improvement

---

## 🚀 Tech Stack

| Layer       | Technology         |
|------------|--------------------|
| Frontend   | Streamlit / React (optional) |
| Backend    | Python (Flask / FastAPI) |
| ML Model   | Scikit-learn (Random Forest / Linear Regression) |
| Data       | CSV, Kaggle, or Gold Price API |
| Hosting    | Streamlit Cloud / HuggingFace Spaces / Heroku |

---

## 🔍 How It Works

1. **Data Input**: 
   - Historical gold price data
   - Optional indicators: USD/INR, crude oil, inflation, stock index

2. **Model Training**:
   - Clean and preprocess the dataset
   - Train model (e.g., Random Forest)
   - Evaluate with MAE, RMSE, etc.

3. **Prediction & Display**:
   - Predict upcoming price
   - Show trend direction and confidence (high/medium/low)
   - Friendly assistant text:  
     _"Gold might shine brighter tomorrow ✨"_

---

## 📸 Screenshots

| Simple View | Analyst View |
|-------------|--------------|
| ![basic](assets/simple.png) | ![detailed](assets/detailed.png) |

---

## ⚙️ Installation & Run (Locally)

```bash
git clone https://github.com/yourusername/gold-price-prediction.git
cd gold-price-prediction
pip install -r requirements.txt
streamlit run app.py

