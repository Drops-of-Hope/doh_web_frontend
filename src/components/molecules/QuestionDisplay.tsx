import React from 'react';

interface QuestionDisplayProps {
  questionNumber: number;
  question: string;
  answer: string;
  isYesNoQuestion?: boolean;
  description?: string;
  additionalDetails?: string;
  selectedItems?: string[];
  note?: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  questionNumber,
  question,
  answer,
  isYesNoQuestion = true,
  description,
  additionalDetails,
  selectedItems,
  note
}) => {
  const getBadgeColor = (answer: string, isYesNoQuestion: boolean) => {
    if (!isYesNoQuestion) {
      return "bg-blue-100 text-blue-800";
    }
    
    return answer === "yes" 
      ? "bg-red-100 text-red-800" 
      : "bg-green-100 text-green-800";
  };

  return (
    <div className="mb-8">
      <h3 className="font-medium text-gray-700 mb-3">
        {questionNumber}. {question}
      </h3>
      {note && (
        <p className="text-sm text-gray-600 mb-3">
          {note}
        </p>
      )}
      <div className="bg-gray-100 p-4 rounded-md">
        <div className="flex items-center mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(answer, isYesNoQuestion)}`}>
            {answer.toUpperCase()}
          </span>
        </div>
        
        {answer === "yes" && additionalDetails && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {description}
            </p>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-gray-800">{additionalDetails}</p>
            </div>
          </div>
        )}
        
        {answer === "yes" && selectedItems && selectedItems.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Selected conditions:
            </p>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedItems.map((item, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;