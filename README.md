# N👀DLES (PYQ Analyzer)

<p align="center">
  <strong>An AI-powered Previous Year Questions (PYQ) analysis system that extracts exam topics, calculates frequency, and generates smart revision notes.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-3.0+-000000?logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-8E75B2?logo=google&logoColor=white" alt="Gemini AI">
</p>

---

## 🌟 Overview

**N👀DLES** is built to make exam preparation faster and more strategic. Instead of manually combing through years of past exam papers, students can upload PDF question papers or paste questions directly.

The platform automatically extracts questions (using direct PDF extraction or **EasyOCR** for scanned papers), passes them to **Google Gemini AI**, and produces:
- 📌 **Topic Breakdown**: Comprehensive identification of every syllabus topic asked.
- 📊 **Frequency & Importance**: Identification of high-yield vs. low-frequency topics.
- 💡 **Exam-Oriented Revision Notes**: Curated study notes and key concepts for each topic to accelerate revision.
- 🎨 **Modern Interactive UI**: Minimalist interface featuring a Dynamic Island navigation bar and WebGL Aurora visualizer.

---

## ✨ Features

- **Multi-Format PDF Ingestion**: Extracts digital text via `pdfplumber` / `PyMuPDF` and uses `EasyOCR` fallback for scanned exam sheets.
- **Direct Text Input**: Alternative paste mode for quick testing or custom question lists.
- **AI-Powered Topic Modeling**: Powered by `gemini-2.5-flash` to structure chaotic question papers into structured study priorities.
- **Smart Prioritization**: Classifies topics into **Very Important**, **Important**, and **Low Frequency** to help students allocate study time effectively.
- **Instant Revision Notes**: Synthesizes definitions, core formulas, and model points directly from exam trends.
- **Modern UI / UX**: Built with React 19, Tailwind CSS v4, Lucide icons, and interactive hover animations.

---

## 📂 Project Structure

```text
pyqAnalyzer-noodles/
├── noods/
│   ├── backend/
│   │   ├── app.py                 # Flask server & Gemini analysis logic
│   │   ├── requirements.txt       # Python dependencies (EasyOCR, Flask, PyMuPDF)
│   │   ├── .env.example           # Example environment template
│   │   └── uploads/               # Temporary file storage (gitignored)
│   ├── src/
│   │   ├── components/            # DynamicIsland, Aurora background, etc.
│   │   ├── pages/                 # Home, PYQAnalyzer, Results, About
│   │   ├── context/               # UI state contexts
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                    # Static assets
│   ├── package.json               # Frontend dependencies & scripts
│   └── vite.config.js
├── .gitignore                     # Git ignore rules for node_modules, .env, models
├── CONTRIBUTING.md                # Contribution guidelines
├── LICENSE                        # MIT License
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **Google Gemini API Key** ([Get a free key from Google AI Studio](https://aistudio.google.com/app/apikey))

---

### 1. Clone the Repository

```bash
git clone https://github.com/Aditya-602/pyqAnalyzer-noodles.git
cd pyqAnalyzer-noodles
```

---

### 2. Backend Setup

Open a terminal window and navigate to the backend directory:

```bash
cd noods/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS / Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Configure your API key
cp .env.example .env
```

Open `.env` in your editor and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

Start the Flask server:

```bash
python app.py
```
> The backend server will run on `http://127.0.0.1:5000`.

---

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd noods

# Install dependencies
npm install

# Start development server
npm run dev
```

> The application will be available at `http://localhost:5173`.

*(Alternatively, you can also run `npm run dev` directly from the repository root).*

---

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide React, OGL (WebGL) |
| **Backend** | Python 3, Flask, Flask-CORS |
| **PDF & OCR** | EasyOCR, PyMuPDF (`fitz`), `pdfplumber`, Pillow |
| **LLM Engine** | Google Gemini (`gemini-2.5-flash`) |

---

## 🔒 Security & Privacy

- All API keys are loaded via environment variables (`.env`) and are **never** committed to version control.
- Uploaded exam files in `uploads/` and downloaded EasyOCR model weights (`.pth`) are ignored via `.gitignore`.

---

## 🤝 Contributing

Contributions are welcome! Whether it is adding new features, improving the UI, or optimizing OCR extraction:

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">
  Crafted by <a href="https://github.com/Aditya-602">Aditya Srivastava</a>
</p>
