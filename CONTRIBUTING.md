# Contributing to PYQ Analyzer (N👀DLES)

Thank you for your interest in contributing! We welcome contributions to improve features, fix bugs, refine UI animations, or enhance OCR and AI prompt performance.

## Getting Started

1. **Fork the Repository** on GitHub: [https://github.com/Aditya-602/pyqAnalyzer-noodles](https://github.com/Aditya-602/pyqAnalyzer-noodles)
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/pyqAnalyzer-noodles.git
   cd pyqAnalyzer-noodles
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### 1. Backend (Flask + EasyOCR + Gemini API)
```bash
cd noods/backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your Gemini API Key in .env
python app.py
```

### 2. Frontend (React + Vite + Tailwind CSS)
In a separate terminal:
```bash
cd noods
npm install
npm run dev
```

## Guidelines

- **Keep Secrets Out of Commits**: Never commit `.env` or sensitive API keys.
- **Clean Commits**: Write clear, descriptive commit messages.
- **Code Style**: Ensure JavaScript code adheres to project ESLint standards and Python code is clean and readable.

## Submitting Changes

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a **Pull Request (PR)** against the `main` branch of this repository.
3. Describe the problem your PR solves and what changes you made.

Thank you for helping make studying smarter for everyone!

