import React from "react";
import { FiX } from "react-icons/fi";

interface Question {
  id: string;
  question: string;
  type: string;
}

interface SurveyData {
  id: number;
  surveyName: string;
  startDate: Date | null;
  endDate: Date | null;
  status: boolean;
  responses: {
    current: number;
    total: number;
  };
  threadDescription?: string;
  questions?: Question[];
}

interface Props {
  survey: SurveyData;
  isOpen: boolean;
  onClose: () => void;
}

const SurveyViewModal: React.FC<Props> = ({ survey, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Survey Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Survey Name
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {survey.surveyName}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    survey.status
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {survey.status ? "Open" : "Closed"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {survey.startDate?.toLocaleDateString("en-US") || "Not set"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {survey.endDate?.toLocaleDateString("en-US") || "Not set"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responses
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {survey.responses.current} / {survey.responses.total}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Rate
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {survey.responses.total > 0
                  ? Math.round((survey.responses.current / survey.responses.total) * 100)
                  : 0}%
              </div>
            </div>
          </div>

          {/* Thread Description */}
          {survey.threadDescription && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thread Description
              </label>
              <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
                {survey.threadDescription}
              </div>
            </div>
          )}

          {/* Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Questions ({survey.questions?.length || 0})
            </label>
            {survey.questions && survey.questions.length > 0 ? (
              <div className="space-y-4">
                {survey.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Question {index + 1}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {question.type}
                      </span>
                    </div>
                    <div className="text-gray-800 font-medium">
                      {question.question}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border">
                No questions added to this survey yet.
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyViewModal;