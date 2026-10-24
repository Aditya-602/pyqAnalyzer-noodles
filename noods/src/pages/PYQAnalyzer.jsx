import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Loader2, X, ArrowRight } from "lucide-react";

const PYQAnalyzer = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const pdfFiles = Array.from(e.dataTransfer.files).filter(
        (file) => file.type === "application/pdf",
      );
      setFiles((prev) => [...prev, ...pdfFiles]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const pdfFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...pdfFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      if (files.length === 0 && !textInput.trim()) {
        throw new Error("Please upload a PDF or paste text to analyze");
      }

      if (files.length > 0) {
        files.forEach((file) => formData.append("pdfs", file));
      } else {
        formData.append("text", textInput);
      }

      const response = await fetch("http://localhost:5001/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      if (!data.success || !data.analysis) {
        throw new Error(data.error || "Invalid response from server");
      }

      console.log("Analysis response:", data);
      navigate("/results", { state: { analysis: data.analysis } });
    } catch (err) {
      navigate("/results", { state: { error: err.message } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full px-8 overflow-hidden">
      <div className="w-full max-w-5xl animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-3">Get Started</h1>
          <p className="text-gray-400 text-sm">Choose your input method</p>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Left Column - Upload PDF */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-md font-semibold text-white text-center mb-2">
              Upload PDF
            </h2>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex-1 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all min-h-[400px] ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/20 hover:border-white/40 bg-white/5"
              }`}
            >
              <Upload className="w-16 h-16 mb-4 text-white/60" />
              <h3 className="text-xs font-semibold mb-2 text-white">
                Drop PDFs here
              </h3>
              <p className="text-gray-400 text-xs mb-4 text-center">
                or click to browse
              </p>
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-xs cursor-pointer transition-all"
              >
                Select Files
              </label>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 w-full space-y-2 max-h-32 overflow-y-auto">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg group"
                    >
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-white flex-1 truncate">
                        {file.name}
                      </span>
                      <button
                        onClick={() => removeFile(idx)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Paste Text */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-md font-semibold text-white text-center mb-2">
              Paste Text
            </h2>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste your questions here...&#10;&#10;Example:&#10;1. What is machine learning?&#10;2. Explain neural networks.&#10;3. Describe backpropagation."
              className="flex-1 min-h-100 bg-white/5 border-2 border-white/20 hover:border-white/40 rounded-2xl p-6 text-white text-xs placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={loading || (files.length === 0 && !textInput.trim())}
            className={`px-8 py-3 rounded-full font-semibold text-sm transition-all flex items-center gap-3 ${
              loading || (files.length === 0 && !textInput.trim())
                ? "bg-white/10 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 hover:shadow-2xl"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PYQAnalyzer;
