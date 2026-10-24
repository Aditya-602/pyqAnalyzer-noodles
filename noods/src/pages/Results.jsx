import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useEffect } from "react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;
  const error = location.state?.error;

  useEffect(() => {
    if (!analysis && !error) {
      navigate("/start");
    }
  }, [analysis, error, navigate]);

  if (!analysis && !error) {
    return null;
  }

  const getImportanceColor = (importance) => {
    if (importance === "Very Important")
      return "text-red-400 bg-red-500/10 border border-red-500/20";
    if (importance === "Important")
      return "text-amber-400 bg-amber-500/10 border border-amber-500/20";
    return "text-neutral-300 bg-white/5 border border-white/10";
  };

  const getImportanceIcon = (importance) => {
    if (importance === "Very Important") return "🔥";
    if (importance === "Important") return "⭐";
    return "📌";
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex justify-center py-8 px-4">
        {/* Back Button - Floating */}
        <div className="fixed top-8 left-8 z-20">
          <button
            onClick={() => navigate("/start")}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900/80 border border-white/10 backdrop-blur-md rounded-full text-white hover:bg-neutral-800 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-medium">Back</span>
          </button>
        </div>

        {/* Dark Mode Document */}
        <div className="w-full max-w-[210mm] bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-fadeIn text-white">
          {/* Error Display */}
          {error && (
            <div className="p-16 min-h-[297mm] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-6">❌</div>
                <h1 className="text-3xl font-bold text-red-400 mb-4">
                  Analysis Failed
                </h1>
                <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">{error}</p>
                <button
                  onClick={() => navigate("/start")}
                  className="px-8 py-3 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold hover:scale-105 transition-all shadow-md"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Full Document Content */}
          {analysis && (
            <div className="px-8 md:px-12 py-10">
              {/* Header */}
              <div className="text-center mb-10 pb-6 border-b border-white/10">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                  PYQ Analysis Report
                </h1>
                <p className="text-neutral-400 text-xs">
                  Generated on{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Summary Section */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  📊 Summary
                </h2>
                <div className="grid grid-cols-3 gap-4 bg-white/[0.02] border border-white/10 p-6 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {analysis.summary?.totalQuestions || 0}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                      Total Questions
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neutral-200">
                      {analysis.topics?.length || 0}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                      Topics Identified
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">
                      {analysis.summary?.mostRepeatedTopics?.length || 0}
                    </div>
                    <div className="text-xs text-red-400/80 mt-1 uppercase tracking-wider">
                      High Priority
                    </div>
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              {analysis.summary?.mostRepeatedTopics && (
                <div className="mb-10 p-6 bg-emerald-500/[0.06] border border-emerald-500/20 rounded-xl">
                  <h3 className="text-md font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Key Focus Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.summary.mostRepeatedTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Study Order */}
              {analysis.summary?.suggestedFocusOrder && (
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    🎯 Recommended Study Order
                  </h2>
                  <ol className="space-y-2">
                    {analysis.summary.suggestedFocusOrder.map(
                      (topic, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-lg"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs">
                            {index + 1}
                          </span>
                          <span className="text-neutral-200 font-medium text-sm">
                            {topic}
                          </span>
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              )}

              {/* Detailed Topic Analysis */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-6">
                  📚 Detailed Topic Analysis
                </h2>
                <div className="space-y-8">
                  {analysis.topics?.map((topic, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-white/20 pl-6 py-2"
                    >
                      {/* Topic Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-white">
                            {topic.name}
                          </h3>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white/10 border border-white/10 text-neutral-200 rounded-full text-xs font-semibold">
                              {topic.frequency}x
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getImportanceColor(topic.importance)}`}
                            >
                              {getImportanceIcon(topic.importance)}{" "}
                              {topic.importance}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Question Patterns */}
                      {topic.questionPatterns &&
                        topic.questionPatterns.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-neutral-300 text-xs mb-2 uppercase tracking-wider">
                              Common Question Patterns:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-neutral-400 text-xs">
                              {topic.questionPatterns.map((pattern, i) => (
                                <li key={i}>{pattern}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {/* Notes */}
                      {topic.notes && (
                        <div className="space-y-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                          {topic.notes.definition && (
                            <div>
                              <h4 className="font-semibold text-neutral-300 mb-1 text-xs uppercase tracking-wider">
                                Definition:
                              </h4>
                              <p className="text-neutral-300 text-xs italic">
                                {topic.notes.definition}
                              </p>
                            </div>
                          )}

                          {topic.notes.keyPoints &&
                            topic.notes.keyPoints.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-neutral-300 mb-1 text-xs uppercase tracking-wider">
                                  Key Points:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-neutral-300 text-xs">
                                  {topic.notes.keyPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {topic.notes.examples &&
                            topic.notes.examples.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-neutral-300 mb-1 text-xs uppercase tracking-wider">
                                  Examples:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-neutral-300 text-xs">
                                  {topic.notes.examples.map((example, i) => (
                                    <li key={i}>{example}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {topic.notes.examTips &&
                            topic.notes.examTips.length > 0 && (
                              <div className="pt-1 border-t border-white/5">
                                <h4 className="font-semibold text-emerald-400 mb-1 text-xs flex items-center gap-1">
                                  💡 Exam Tips:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-emerald-300/90 text-xs">
                                  {topic.notes.examTips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-6 border-t border-white/10 text-center text-neutral-500 text-xs">
                <p>End of Analysis Report</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
