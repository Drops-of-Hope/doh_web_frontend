"use client";
import React from 'react';

interface ComparisonPanelProps {
  inconsistencies: Array<{
    questionNumber: number;
    question: string;
    currentAnswer: string;
    previousAnswers: Array<{ date: string; answer: string; id: string; isInconsistent: boolean }>;
  }>;
  onClose: () => void;
  previousResponses: Array<{
    id: string;
    date: string;
    responses: Record<string, string>;
  }>;
}

const PreScreeningComparisonPanel: React.FC<ComparisonPanelProps> = ({
  inconsistencies,
  onClose,
  previousResponses
}) => {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-gray-50 border-l border-gray-300 shadow-lg z-10">
      <div className="sticky top-0 p-4 border-b border-gray-200 bg-white z-20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Response Comparison</h3>
            <p className="text-sm text-gray-600 mt-1">
              Comparing with {previousResponses.length} recent responses
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close comparison panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-20">
        <div className="p-4">
          {inconsistencies.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-800 font-medium">All responses are consistent</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                No inconsistencies found with previous submissions.
              </p>
            </div>
          ) : (
            <div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700 text-sm mt-1">
                  Some answers differ from previous submissions.
                </p>
              </div>

              <div className="space-y-4">
                {inconsistencies.map((inconsistency, index) => (
                  <div key={index} className="bg-white border border-red-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-800 mb-2">
                      Q{inconsistency.questionNumber}
                    </div>
                    <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {inconsistency.question}
                    </div>

                    <div className="space-y-2">
                      <div className="bg-blue-50 border border-blue-200 rounded p-2">
                        <div className="text-xs text-blue-700 font-medium">Current (Mar 15, 2024)</div>
                        <div className="text-sm text-blue-900">{inconsistency.currentAnswer}</div>
                      </div>

                      {inconsistency.previousAnswers.map((prev, prevIndex) => (
                        <div
                          key={prevIndex}
                          className={`border rounded p-2 ${
                            prev.isInconsistent ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div
                            className={`text-xs font-medium ${
                              prev.isInconsistent ? 'text-red-700' : 'text-gray-600'
                            }`}
                          >
                            {prev.date} ({prev.id})
                          </div>
                          <div
                            className={`text-sm ${
                              prev.isInconsistent ? 'text-red-900 font-medium' : 'text-gray-800'
                            }`}
                          >
                            {prev.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-3">Previous Submissions</h4>
            {previousResponses.map((response, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 mb-2">
                <div className="text-sm font-medium text-gray-800">{response.id}</div>
                <div className="text-xs text-gray-600">{response.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreScreeningComparisonPanel;
