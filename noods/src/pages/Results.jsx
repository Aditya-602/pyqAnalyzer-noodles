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
    if (importance === "Very Important") return "text-red-500";
    if (importance === "Important") return "text-yellow-500";
    return "text-blue-500";
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
            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
        </div>

        {/* A4 Portrait Document */}
        <div className="w-full max-w-[210mm] bg-white shadow-2xl animate-fadeIn">
          {/* Error Display */}
          {error && (
            <div className="p-16 text-gray-900 min-h-[297mm] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-6">❌</div>
                <h1 className="text-4xl font-bold text-red-600 mb-4">
                  Analysis Failed
                </h1>
                <p className="text-gray-700 text-lg mb-6">{error}</p>
                <button
                  onClick={() => navigate("/start")}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:scale-105 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Full Document Content */}
          {analysis && (
            <div className="px-12 py-10 text-gray-900">
              {/* Header */}
              <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  PYQ Analysis Report
                </h1>
                <p className="text-gray-600">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📊 Summary
                </h2>
                <div className="grid grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {analysis.summary?.totalQuestions || 0}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Total Questions
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {analysis.topics?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Topics Identified
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {analysis.summary?.mostRepeatedTopics?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      High Priority
                    </div>
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              {analysis.summary?.mostRepeatedTopics && (
                <div className="mb-10 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Key Focus Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.summary.mostRepeatedTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium"
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    🎯 Recommended Study Order
                  </h2>
                  <ol className="space-y-2">
                    {analysis.summary.suggestedFocusOrder.map(
                      (topic, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                        >
                          <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-gray-900 font-medium">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  📚 Detailed Topic Analysis
                </h2>
                <div className="space-y-8">
                  {analysis.topics?.map((topic, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-gray-300 pl-6 py-2"
                    >
                      {/* Topic Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {topic.name}
                          </h3>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
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
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Common Question Patterns:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              {topic.questionPatterns.map((pattern, i) => (
                                <li key={i}>{pattern}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {/* Notes */}
                      {topic.notes && (
                        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                          {topic.notes.definition && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                                Definition:
                              </h4>
                              <p className="text-gray-700 text-sm italic">
                                {topic.notes.definition}
                              </p>
                            </div>
                          )}

                          {topic.notes.keyPoints &&
                            topic.notes.keyPoints.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                                  Key Points:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                                  {topic.notes.keyPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {topic.notes.examples &&
                            topic.notes.examples.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                                  Examples:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                                  {topic.notes.examples.map((example, i) => (
                                    <li key={i}>{example}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {topic.notes.examTips &&
                            topic.notes.examTips.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1 text-sm flex items-center gap-1">
                                  💡 Exam Tips:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
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
              <div className="mt-12 pt-6 border-t-2 border-gray-200 text-center text-gray-500 text-sm">
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
