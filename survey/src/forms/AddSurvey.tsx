import React, { useState } from "react";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import DatePickerReact from "../components/ReactDatePicker";
import { FiTrash2, FiPlus } from "react-icons/fi";

interface Question {
  id: string;
  question: string;
  type: string;
}

interface SurveyFormData {
  surveyTitle: string;
  startDate: Date | null;
  endDate: Date | null;
  threadDescription: string;
  questions: Question[];
}

interface Props {
  onBack: () => void;
  onSave: (surveyData: SurveyFormData) => void;
  editData?: SurveyFormData;
}

const AddSurvey: React.FC<Props> = ({ onBack, onSave, editData }) => {
  const [formData, setFormData] = useState<SurveyFormData>(
    editData || {
      surveyTitle: "",
      startDate: null,
      endDate: null,
      threadDescription: "",
      questions: [],
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const questionTypes = [
    "Multiple choice",
    "Check Boxes",
    "Star",
    "Best Worst Scale",
    "File Upload",
    "Single TextBox",
    "Comment Box",
    "Matrix Of Dropdown Menu",
    "Dropdown",
    "Matrix Rating",
    "Ranking",
    "Slider",
    "Multiple Textboxes",
    "Date/Time",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (e: { target: { name: string; value: Date | null } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user selects date
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      type: "Multiple choice",
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const removeQuestion = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.surveyTitle.trim()) {
      newErrors.surveyTitle = "Survey title is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!formData.threadDescription.trim()) {
      newErrors.threadDescription = "Thread description is required";
    }

    // Validate questions
    formData.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${question.id}`] = "Question text is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editData ? "Edit Survey" : "Create New Survey"}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First row - Survey Title, Start Date, End Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput
            label="Survey Title"
            name="surveyTitle"
            value={formData.surveyTitle}
            onChange={handleInputChange}
            required
            error={errors.surveyTitle}
          />
          <DatePickerReact
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleDateChange}
            required
            error={errors.startDate}
          />
          <DatePickerReact
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={handleDateChange}
            required
            minDate={formData.startDate || undefined}
            error={errors.endDate}
          />
        </div>

        {/* Second row - Thread Description */}
        <div className="w-full">
          <TextArea
            label="Thread Description"
            name="threadDescription"
            value={formData.threadDescription}
            onChange={handleInputChange}
            required
            rows={4}
            error={errors.threadDescription}
          />
        </div>

        {/* Questions Section */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Questions</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiPlus size={16} />
              Add Question
            </button>
          </div>

          {formData.questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No questions added yet. Click "Add Question" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {formData.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Question {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove Question"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="Enter Question"
                      name={`question_${question.id}`}
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, "question", e.target.value)
                      }
                      required
                      error={errors[`question_${question.id}`]}
                    />
                    <Select
                      label="Question Type"
                      name={`type_${question.id}`}
                      value={question.type}
                      onChange={(e) =>
                        updateQuestion(question.id, "type", e.target.value)
                      }
                      options={questionTypes}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
          >
            {editData ? "Update Survey" : "Create Survey"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSurvey;