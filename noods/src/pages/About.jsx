function About() {
  return (
    <div className="flex items-center justify-center h-full w-full px-8">
      <div className="max-w-4xl w-full animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-4">About</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-white to-transparent" />
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              An intelligent platform designed to make studying more efficient
              using AI-powered analysis.
            </p>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-4">
            <div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10
                          hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-xl mb-3 group-hover:scale-110 transition-transform">
                📄
              </div>
              <h3 className="text-white font-semibold mb-2">PDF Analysis</h3>
              <p className="text-gray-400 text-xs">
                Upload PYQs and extract questions automatically
              </p>
            </div>

            <div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10
                          hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-xl mb-3 group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-white font-semibold mb-2">AI Powered</h3>
              <p className="text-gray-400 text-xs">
                Gemini AI analyzes topics and importance
              </p>
            </div>

            <div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10
                          hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-xl mb-3 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="text-white font-semibold mb-2">Smart Insights</h3>
              <p className="text-gray-400 text-xs">
                Get frequency and exam preparation tips
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-xs">
            Built with React · Flask · EasyOCR · Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
