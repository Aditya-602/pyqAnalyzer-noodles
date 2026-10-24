# PYQ Analyzer - Setup Instructions

## 🚀 Complete Installation Guide

### Prerequisites

- Node.js (v18+)
- Python 3.9+
- Tesseract OCR engine

---

## Backend Setup

### 1. Install Tesseract OCR

**macOS:**

```bash
brew install tesseract
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install tesseract-ocr
```

**Windows:**
Download installer from: https://github.com/UB-Mannheim/tesseract/wiki

### 2. Create Python Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key from: https://console.anthropic.com/

### 5. Run Backend Server

```bash
python app.py
```

Backend will start on `http://localhost:5000`

---

## Frontend Setup

### 1. Install Dependencies

```bash
cd .. # Go back to root
npm install react-router-dom lucide-react
```

### 2. Run Development Server

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

---

## 🎯 How to Use

1. **Start Backend**: Run Python Flask server
2. **Start Frontend**: Run Vite dev server
3. **Navigate**: Open browser to `http://localhost:5173`
4. **Upload PDFs**: Click "Start" in the Dynamic Island menu
5. **Analyze**: Upload PDF files or paste text
6. **View Results**: Get intelligent topic analysis and study notes

---

## 📁 Project Structure

```
noods/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # API keys (create this)
│   └── uploads/           # Temporary PDF storage
│
├── src/
│   ├── components/
│   │   ├── DynamicIsland.jsx  # Navigation menu
│   │   └── Aurora.jsx         # Background effect
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── PYQAnalyzer.jsx   # Main analyzer interface
│   │   └── About.jsx         # About page
│   └── App.jsx               # Router setup
│
└── package.json
```

---

## 🔧 Troubleshooting

### Tesseract not found

```bash
# Add to your PATH or set in code
export TESSDATA_PREFIX=/usr/local/share/tessdata/
```

### CORS errors

- Ensure backend is running on port 5000
- Check Flask-CORS is installed

### PDF upload fails

- Check file size limits
- Ensure `uploads/` directory exists
- Verify PDF file is not corrupted

---

## 🌟 Features

✅ **PDF Text Extraction** - Direct text extraction from PDFs
✅ **OCR Support** - Scanned document processing
✅ **Text Cleaning** - Intelligent normalization
✅ **AI Analysis** - Claude-powered topic extraction
✅ **Frequency Analysis** - Identify important topics
✅ **Study Notes** - Exam-oriented notes generation
✅ **Beautiful UI** - Modern, animated interface

---

## 📝 API Endpoints

### POST `/api/analyze`

Analyze PYQ papers

**Request:**

- Form data with `pdfs` (files) OR `text` (string)

**Response:**

```json
{
  "success": true,
  "analysis": {...},
  "cleanedText": "..."
}
```

### GET `/api/health`

Check backend status

---

## 🔐 Security Notes

- Never commit `.env` file
- Keep API keys secret
- Uploaded files are temporary and deleted after processing
- Use environment variables for sensitive data

---

## 📚 Tech Stack

**Frontend:**

- React 19
- React Router
- Tailwind CSS
- Lucide Icons
- OGL (WebGL effects)

**Backend:**

- Python Flask
- Tesseract OCR
- PyMuPDF
- PDFPlumber
- Anthropic Claude API

---

## 🎓 Usage Tips

1. **Multiple PDFs**: Upload multiple papers for comprehensive analysis
2. **Text Mode**: Use for quick testing or when you have typed questions
3. **Best Results**: Use clear, readable PDF scans
4. **Topic Focus**: Follow the suggested focus order for efficient studying

---

## 📞 Support

For issues or questions:

1. Check Tesseract installation
2. Verify API key is valid
3. Ensure all dependencies are installed
4. Check console for error messages
