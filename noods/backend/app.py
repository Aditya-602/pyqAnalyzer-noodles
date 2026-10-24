import os
import re
import json
import pdfplumber
import fitz  # PyMuPDF
import easyocr
from PIL import Image
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Gemini API configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_API_URL = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}'

# Initialize EasyOCR reader (models will be stored in project directory)
MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')
os.makedirs(MODELS_DIR, exist_ok=True)
# Using GPU=False for CPU, set to True if CUDA available
reader = easyocr.Reader(['en'], model_storage_directory=MODELS_DIR, gpu=False)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def detect_pdf_type(pdf_path):
    """Detect if PDF has selectable text or needs OCR"""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages[:3]:  # Check first 3 pages
                text = page.extract_text()
                if text and len(text.strip()) > 50:
                    return 'text'
        return 'scanned'
    except Exception as e:
        print(f"Error detecting PDF type: {e}")
        return 'scanned'

def extract_text_from_pdf(pdf_path):
    """Extract text directly from PDF with selectable text"""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text_pages = []
            for i, page in enumerate(pdf.pages, 1):
                text = page.extract_text() or ''
                text_pages.append(f"[PAGE {i}]\n{text}")
            return '\n\n'.join(text_pages)
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

def ocr_scanned_pdf(pdf_path):
    """Perform OCR on scanned PDF using EasyOCR and PyMuPDF"""
    try:
        # Open PDF with PyMuPDF
        pdf_document = fitz.open(pdf_path)
        text_pages = []
        total_pages = len(pdf_document)
        print(f"Starting OCR for {total_pages} pages...")
        
        for page_num in range(total_pages):
            print(f"Processing page {page_num + 1}/{total_pages}...")
            # Convert page to image
            page = pdf_document[page_num]
            pix = page.get_pixmap(matrix=fitz.Matrix(1.2, 1.2))  # 1.2x scale - faster than 2x, still good quality
            
            # Convert pixmap to PIL Image
            img_data = pix.tobytes("png")
            image = Image.open(io.BytesIO(img_data))
            
            # Convert PIL Image to numpy array for EasyOCR
            img_array = np.array(image)
            
            # Perform OCR with EasyOCR (optimized settings)
            result = reader.readtext(
                img_array, 
                detail=0,  # detail=0 returns only text
                paragraph=True,  # Group text into paragraphs for faster processing
                batch_size=1  # Process in batches
            )
            text = '\n'.join(result)
            
            text_pages.append(f"[PAGE {page_num + 1}]\n{text}")
            print(f"Page {page_num + 1} completed")
        
        pdf_document.close()
        print(f"OCR completed for all {total_pages} pages")
        return '\n\n'.join(text_pages)
    except Exception as e:
        print(f"Error performing OCR: {e}")
        return None

def clean_text(raw_text):
    """Clean and normalize extracted text"""
    if not raw_text:
        return ''
    
    # Remove page headers/footers patterns
    text = re.sub(r'Page \d+ of \d+', '', raw_text, flags=re.IGNORECASE)
    text = re.sub(r'^\d+\s*$', '', text, flags=re.MULTILINE)
    
    # Remove common instruction patterns
    text = re.sub(r'Attempt any \w+', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Answer all questions', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Time:.*?hours?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Maximum Marks?:.*?\d+', '', text, flags=re.IGNORECASE)
    
    # Merge broken lines (lines ending without punctuation)
    lines = text.split('\n')
    merged_lines = []
    temp_line = ''
    
    for line in lines:
        line = line.strip()
        if not line:
            if temp_line:
                merged_lines.append(temp_line)
                temp_line = ''
            continue
        
        # Keep page markers
        if line.startswith('[PAGE'):
            if temp_line:
                merged_lines.append(temp_line)
                temp_line = ''
            merged_lines.append(line)
            continue
        
        # Merge lines
        temp_line += ' ' + line if temp_line else line
        
        # End of sentence/question
        if line.endswith(('.', '?', ':', ')')):
            merged_lines.append(temp_line)
            temp_line = ''
    
    if temp_line:
        merged_lines.append(temp_line)
    
    # Remove excessive whitespace
    text = '\n'.join(merged_lines)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' {2,}', ' ', text)
    
    return text.strip()

def analyze_with_llm(cleaned_text):
    """Send cleaned text to Claude for analysis"""
    
    prompt = f"""You are analyzing Previous Year Questions (PYQs) to help students prepare for exams.

Here is the cleaned text from PYQ papers:

{cleaned_text}

Your task:
1. Extract all unique questions
2. Identify topics from the syllabus
3. Count topic frequency
4. Classify importance (Very Important, Important, Low Frequency)
5. Generate exam-oriented notes for each important topic

Output ONLY valid JSON in this exact format:

{{
  "topics": [
    {{
      "name": "Topic Name",
      "frequency": 0,
      "importance": "Very Important/Important/Low Frequency",
      "questionPatterns": ["pattern 1", "pattern 2"],
      "notes": {{
        "definition": "Clear definition",
        "keyPoints": ["point 1", "point 2"],
        "examples": ["example 1"],
        "examTips": ["tip 1", "tip 2"]
      }}
    }}
  ],
  "summary": {{
    "totalQuestions": 0,
    "mostRepeatedTopics": ["topic1", "topic2"],
    "suggestedFocusOrder": ["topic1", "topic2", "topic3"]
  }}
}}

Rules:
- Very Important: 5+ occurrences
- Important: 3-4 occurrences
- Low Frequency: 1-2 occurrences
- No markdown, no commentary, JSON only"""

    try:
        print("Sending request to Gemini API...")
        # Call Gemini API directly
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }
        
        response = requests.post(GEMINI_API_URL, json=payload, timeout=60)
        print(f"Gemini API responded with status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"Gemini API error: {response.status_code} - {response.text}")
            return None
        
        result_data = response.json()
        result_text = result_data['candidates'][0]['content']['parts'][0]['text']
        
        # Try to extract JSON if wrapped in markdown code blocks
        json_match = re.search(r'```(?:json)?\s*({[\s\S]*?})\s*```', result_text)
        if json_match:
            result_text = json_match.group(1)
        else:
            # Try to extract raw JSON
            json_match = re.search(r'({[\s\S]*})', result_text)
            if json_match:
                result_text = json_match.group(1)
        
        # Parse and return as dict (not string)
        parsed_json = json.loads(result_text)
        return parsed_json
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON from LLM: {e}")
        print(f"Raw response: {result_text}")
        return None
    except Exception as e:
        print(f"Error calling LLM: {e}")
        return None

@app.route('/api/analyze', methods=['POST'])
def analyze_pyq():
    """Main endpoint for PYQ analysis"""
    try:
        print("=== Starting PYQ Analysis ===")
        # Check if PDF files or text input
        if 'pdfs' in request.files:
            files = request.files.getlist('pdfs')
            all_text = []
            
            print(f"Processing {len(files)} PDF file(s)...")
            for file in files:
                # Save file temporarily
                filepath = os.path.join(UPLOAD_FOLDER, file.filename)
                file.save(filepath)
                
                # Detect PDF type
                pdf_type = detect_pdf_type(filepath)
                
                # Extract text
                if pdf_type == 'text':
                    text = extract_text_from_pdf(filepath)
                else:
                    text = ocr_scanned_pdf(filepath)
                
                if text:
                    all_text.append(text)
                
                # Clean up
                os.remove(filepath)
            
            raw_text = '\n\n'.join(all_text)
        
        elif 'text' in request.form:
            raw_text = request.form['text']
        
        else:
            return jsonify({'error': 'No PDF files or text provided'}), 400
        
        # Clean text
        print("Cleaning extracted text...")
        cleaned_text = clean_text(raw_text)
        
        if not cleaned_text:
            return jsonify({'error': 'Could not extract text from files'}), 400
        
        print(f"Cleaned text length: {len(cleaned_text)} characters")
        # Analyze with LLM
        print("Starting AI analysis...")
        analysis = analyze_with_llm(cleaned_text)
        
        if not analysis:
            return jsonify({'error': 'Analysis failed. Please check if your API key is configured correctly.'}), 500
        
        return jsonify({
            'success': True,
            'analysis': analysis,  # Now this is a dict, not a string
            'cleanedText': cleaned_text[:500] + '...'  # Preview
        })
    
    except Exception as e:
        print(f"Error in analyze endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Backend is running'})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
