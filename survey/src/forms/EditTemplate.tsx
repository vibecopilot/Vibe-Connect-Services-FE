import React, { useState } from "react";
import { 
  MessageCircle, 
  Edit2, 
  Trash2, 
  Copy, 
  Save, 
  Star,
  Plus,
  ArrowLeft,
  Check
} from "lucide-react";

// Interfaces (reusing from the main component)
interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  required?: boolean;
  scale?: { min: number; max: number; minLabel?: string; maxLabel?: string };
}

interface TemplateDetails {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
  questions: Question[];
  category: string;
  usedCount: number;
}

interface Props {
  template: TemplateDetails;
  onBack: () => void;
  onSave: (template: TemplateDetails) => void;
}

const EditTemplate: React.FC<Props> = ({ template, onBack, onSave }) => {
  const [questions, setQuestions] = useState<Question[]>(template.questions);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string>("");
  const [editingOptions, setEditingOptions] = useState<string[]>([]);
  const [starRatings, setStarRatings] = useState<{ [key: number]: number }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: any }>({});
  const [sliderValues, setSliderValues] = useState<{ [key: number]: number }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [copiedQuestionId, setCopiedQuestionId] = useState<number | null>(null);

  // Mock comments count for each question
  const getCommentsCount = (questionId: number) => {
    return Math.floor(Math.random() * 12) + 1;
  };

  const handleEditClick = (question: Question) => {
    setEditingQuestionId(question.id);
    setEditingQuestion(question.question);
    setEditingOptions(question.options || []);
  };

  const handleSaveClick = () => {
    if (editingQuestionId) {
      setQuestions(prev => 
        prev.map(q => 
          q.id === editingQuestionId
            ? { 
                ...q, 
                question: editingQuestion,
                options: editingOptions.length > 0 ? editingOptions : q.options
              }
            : q
        )
      );
      setEditingQuestionId(null);
      setEditingQuestion("");
      setEditingOptions([]);
    }
  };

  const handleDeleteClick = (questionId: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    }
  };

  const handleCopyClick = async (question: Question) => {
    try {
      const questionText = `${question.question}${question.options ? '\nOptions: ' + question.options.join(', ') : ''}`;
      await navigator.clipboard.writeText(questionText);
      
      // Show copied feedback
      setCopiedQuestionId(question.id);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedQuestionId(null);
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy question to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `${question.question}${question.options ? '\nOptions: ' + question.options.join(', ') : ''}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // Show copied feedback for fallback too
      setCopiedQuestionId(question.id);
      setTimeout(() => {
        setCopiedQuestionId(null);
      }, 2000);
    }
  };

  const handleStarClick = (questionId: number, rating: number) => {
    setStarRatings((prev) => ({
      ...prev,
      [questionId]: rating,
    }));
  };

  const handleSaveTemplate = () => {
    const updatedTemplate = {
      ...template,
      questions: questions,
      modifiedDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    };
    onSave(updatedTemplate);
  };

  const handleRadioChange = (questionId: number, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [`radio-${questionId}`]: value
    }));
  };

  const handleCheckboxChange = (questionId: number, value: string, checked: boolean) => {
    setSelectedOptions(prev => {
      const key = `checkbox-${questionId}`;
      const current = prev[key] || [];
      if (checked) {
        return {
          ...prev,
          [key]: [...current, value]
        };
      } else {
        return {
          ...prev,
          [key]: current.filter((item: string) => item !== value)
        };
      }
    });
  };

  const handleSliderChange = (questionId: number, value: number) => {
    setSliderValues(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleInputChange = (key: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderQuestion = (question: Question) => {
    const isEditing = editingQuestionId === question.id;

    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-2">
            {(isEditing ? editingOptions : question.options)?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  className="text-blue-600"
                  disabled={isEditing}
                  checked={selectedOptions[`radio-${question.id}`] === option}
                  onChange={(e) => handleRadioChange(question.id, e.target.value)}
                />
                {isEditing ? (
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...editingOptions];
                      newOptions[index] = e.target.value;
                      setEditingOptions(newOptions);
                    }}
                    className="text-sm text-gray-700 border border-gray-300 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span className="text-sm text-gray-700">{option}</span>
                )}
              </label>
            ))}
            {isEditing && (
              <button
                onClick={() => setEditingOptions([...editingOptions, "New Option"])}
                className="text-blue-600 text-sm hover:text-blue-700 flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Option</span>
              </button>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {(isEditing ? editingOptions : question.options)?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600" 
                  disabled={isEditing}
                  checked={(selectedOptions[`checkbox-${question.id}`] || []).includes(option)}
                  onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                />
                {isEditing ? (
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...editingOptions];
                      newOptions[index] = e.target.value;
                      setEditingOptions(newOptions);
                    }}
                    className="text-sm text-gray-700 border border-gray-300 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span className="text-sm text-gray-700">{option}</span>
                )}
              </label>
            ))}
            {isEditing && (
              <button
                onClick={() => setEditingOptions([...editingOptions, "New Option"])}
                className="text-blue-600 text-sm hover:text-blue-700 flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Option</span>
              </button>
            )}
          </div>
        );

      case "star-rating":
        const currentRating = starRatings[question.id] || 0;
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  star <= currentRating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
                onClick={() => handleStarClick(question.id, star)}
              />
            ))}
          </div>
        );

      case "slider":
        const sliderValue = sliderValues[question.id] || question.scale?.min || 0;
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={question.scale?.min || 0}
              max={question.scale?.max || 10}
              value={sliderValue}
              onChange={(e) => handleSliderChange(question.id, parseInt(e.target.value))}
              className="w-full"
              disabled={isEditing}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {question.scale?.minLabel || question.scale?.min || 0}
              </span>
              <span className="font-medium">Current: {sliderValue}</span>
              <span>
                {question.scale?.maxLabel || question.scale?.max || 10}
              </span>
            </div>
          </div>
        );

      case "dropdown":
        return (
          <select 
            className="w-full p-2 border border-gray-300 rounded-md bg-white" 
            disabled={isEditing}
            value={inputValues[`dropdown-${question.id}`] || ''}
            onChange={(e) => handleInputChange(`dropdown-${question.id}`, e.target.value)}
          >
            <option value="">Select an option...</option>
            {(isEditing ? editingOptions : question.options)?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "date":
        return (
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isEditing}
            value={inputValues[`date-${question.id}`] || ''}
            onChange={(e) => handleInputChange(`date-${question.id}`, e.target.value)}
          />
        );

      case "time":
        return (
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isEditing}
            value={inputValues[`time-${question.id}`] || ''}
            onChange={(e) => handleInputChange(`time-${question.id}`, e.target.value)}
          />
        );

      case "text":
        return (
          <input
            type="text"
            placeholder="Enter your answer..."
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isEditing}
            value={inputValues[`text-${question.id}`] || ''}
            onChange={(e) => handleInputChange(`text-${question.id}`, e.target.value)}
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder="Enter your detailed response..."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md resize-none"
            disabled={isEditing}
            value={inputValues[`textarea-${question.id}`] || ''}
            onChange={(e) => handleInputChange(`textarea-${question.id}`, e.target.value)}
          />
        );

      case "matrix":
        return (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border-b"></th>
                  {question.options?.map((option, index) => (
                    <th
                      key={index}
                      className="text-center p-2 border-b text-sm"
                    >
                      {option}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Quality", "Price", "Service"].map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="p-2 border-b text-sm font-medium">{row}</td>
                    {question.options?.map((option, colIndex) => (
                      <td key={colIndex} className="text-center p-2 border-b">
                        <input
                          type="radio"
                          name={`matrix-${question.id}-${rowIndex}`}
                          value={option}
                          disabled={isEditing}
                          checked={selectedOptions[`matrix-${question.id}-${rowIndex}`] === option}
                          onChange={(e) => handleRadioChange(question.id * 1000 + rowIndex, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 italic">
            Question type not supported
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Template: {template.name}
            </h1>
          </div>
          <button
            onClick={handleSaveTemplate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Template</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {template.name}
              </h2>
              <p className="text-gray-600">{template.description}</p>
            </div>

            <div className="p-6">
              <div className="space-y-8">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          {editingQuestionId === question.id ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={editingQuestion}
                                onChange={(e) => setEditingQuestion(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md font-medium text-gray-900"
                                placeholder="Enter question..."
                              />
                              <div className="text-xs text-gray-500 capitalize">
                                {question.type.replace("-", " ")}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">
                                {question.question}
                                {question.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </h3>
                              <div className="text-xs text-gray-500 mb-3 capitalize">
                                {question.type.replace("-", " ")}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        {/* Comments */}
                        <div className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 cursor-pointer">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{getCommentsCount(question.id)}</span>
                        </div>

                        {/* Edit/Save Button */}
                        {editingQuestionId === question.id ? (
                          <button
                            onClick={handleSaveClick}
                            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(question)}
                            className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteClick(question.id)}
                          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopyClick(question)}
                          className={`p-2 text-white rounded-md transition-colors ${
                            copiedQuestionId === question.id
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-600 hover:bg-gray-700"
                          }`}
                          title={copiedQuestionId === question.id ? "Copied!" : "Copy to Clipboard"}
                        >
                          {copiedQuestionId === question.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="ml-11">
                      {renderQuestion(question)}
                    </div>
                  </div>
                ))}

                {questions.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg mb-2">No questions in this template</p>
                    <p className="text-sm">Start by adding some questions to your survey template.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;