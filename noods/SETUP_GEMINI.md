# 🚀 ADD YOUR GEMINI API KEY

Your backend has been switched to Google Gemini!

## Quick Setup (2 steps)

### 1. Add Your API Key

Open this file: [backend/.env](backend/.env)

Replace:

```
GEMINI_API_KEY=your_api_key_here
```

With your actual key:

```
GEMINI_API_KEY=AIza...your_actual_key
```

If you don't have a key yet, get one here: https://aistudio.google.com/app/apikey

### 2. Restart Backend

```bash
# Stop current backend (if running): Ctrl+C

# Start backend
cd backend
source venv/bin/activate
python app.py
```

Or with absolute path:

```bash
/Users/adityasriv/Coding/noodles/noods/backend/venv/bin/python \
  /Users/adityasriv/Coding/noodles/noods/backend/app.py
```

That's it! Your PYQ analyzer will now use Gemini.

---

## What Changed

✅ **Removed**: Anthropic Claude SDK  
✅ **Added**: Google Gemini SDK (google-generativeai)  
✅ **Fixed**: JSON parsing bug ("error analysis failed")  
✅ **Model**: Using `gemini-1.5-flash` (fast and accurate)

---

## Testing

After adding your key and restarting:

1. Open http://localhost:5174/start
2. Upload a PDF with questions
3. Click "Analyze Questions"
4. Should see topics, frequency, and importance!

---

_Note: Gemini is free tier friendly with generous limits!_
