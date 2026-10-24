# Quick Start Guide

## ✅ Backend is Running!

Your Flask backend is successfully running on port 5000.

### Current Status:

- ✅ Python dependencies installed
- ✅ Tesseract OCR installed
- ✅ Poppler installed (for pdf2image)
- ✅ Backend server running on http://localhost:5000

### ⚠️ Important: Add Your API Key

To use the LLM analysis feature, you need to add your Anthropic API key:

1. Open `/backend/.env`
2. Replace `your_api_key_here` with your actual API key
3. Get your key from: https://console.anthropic.com/

Example:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

### Running the Application

**Backend is already running!** Keep that terminal open.

**Frontend:**

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### How to Use:

1. **Navigate**: Click "Start" in the Dynamic Island menu
2. **Upload**: Either:
   - Drag & drop PDF files, or
   - Paste text directly
3. **Analyze**: Click the analyze button
4. **Results**: View topic frequency, importance, and study notes

### Available Features:

- ✅ PDF text extraction (for regular PDFs)
- ✅ OCR support (for scanned PDFs)
- ✅ Multi-file processing
- ✅ Text paste alternative
- ⚠️ LLM analysis (requires API key)

### Stopping the Backend:

Press `Ctrl+C` in the terminal running the backend.

### Troubleshooting:

**"Backend not responding"**

- Check if backend terminal is still running
- Verify it's on port 5000: `curl http://localhost:5000/api/health`

**"Analysis failed"**

- Make sure you've added your Anthropic API key in `.env`
- Restart the backend after adding the key

**OCR errors**

- Tesseract is installed and should work
- If issues persist, check: `which tesseract`

---

Everything is set up and ready to go! 🚀
