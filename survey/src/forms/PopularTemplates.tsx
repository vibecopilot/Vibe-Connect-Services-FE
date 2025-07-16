import React, { useState, useMemo } from "react";
import { Search, ArrowRight, Calendar, Star, TrendingUp } from "lucide-react";
import AddSurvey from "./AddSurvey";
import EditTemplate from "./EditTemplate";

// Template interface
interface Template {
  id: number;
  name: string;
  description: string;
  usedCount: number;
  image: string;
  category: string;
  isFree: boolean;
}

// Question interface for detailed view
interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  required?: boolean;
  scale?: { min: number; max: number; minLabel?: string; maxLabel?: string };
}

// Template details interface
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

interface Category {
  name: string;
  count: number;
  key: string;
}

interface Props {
  onBack: () => void;
}

// Sample data interface for results
interface SampleResult {
  questionId: number;
  totalResponded: number;
  totalSkipped: number;
  responses: { [key: string]: number };
}

// Survey Template Details Component
const SurveyTemplateDetails: React.FC<{
  template: TemplateDetails;
  onBack: () => void;
  onUseTemplate: () => void;
  onStartBlank: () => void;
}> = ({ template, onBack, onUseTemplate, onStartBlank }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "sample">("preview");
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [starRatings, setStarRatings] = useState<{ [key: number]: number }>({});

  // Mock sample results data
  const generateSampleResults = (): SampleResult[] => {
    return template.questions.map((question) => {
      const totalResponded = Math.floor(Math.random() * 3000) + 1000;
      const totalSkipped = Math.floor(Math.random() * 500) + 50;

      let responses: { [key: string]: number } = {};

      if (question.options) {
        // Distribute responses across options
        let remaining = totalResponded;
        question.options.forEach((option, index) => {
          if (index === question.options!.length - 1) {
            responses[option] = remaining;
          } else {
            const count = Math.floor(Math.random() * (remaining / 2)) + 50;
            responses[option] = count;
            remaining -= count;
          }
        });
      } else if (question.type === "star-rating") {
        // Generate star rating distribution
        for (let i = 1; i <= 5; i++) {
          responses[`${i} Star${i > 1 ? "s" : ""}`] =
            Math.floor(Math.random() * (totalResponded / 3)) + 100;
        }
      } else if (question.type === "slider") {
        // Generate slider distribution
        const scale = question.scale || { min: 0, max: 10 };
        for (let i = scale.min; i <= scale.max; i++) {
          responses[i.toString()] =
            Math.floor(Math.random() * (totalResponded / 5)) + 50;
        }
      } else {
        // For text/textarea questions, create sample categories
        responses = {
          "Positive Response": Math.floor(totalResponded * 0.6),
          "Neutral Response": Math.floor(totalResponded * 0.25),
          "Negative Response": Math.floor(totalResponded * 0.15),
        };
      }

      return {
        questionId: question.id,
        totalResponded,
        totalSkipped,
        responses,
      };
    });
  };

  const sampleResults = useMemo(
    () => generateSampleResults(),
    [template.questions]
  );

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const containerRect = document
      .querySelector(".details-container")
      ?.getBoundingClientRect();
    if (!containerRect) return;

    const newWidth = e.clientX - containerRect.left;
    const minWidth = 300;
    const maxWidth = 950;

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setLeftPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleStarClick = (questionId: number, rating: number) => {
    setStarRatings((prev) => ({
      ...prev,
      [questionId]: rating,
    }));
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  // Bar chart component
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-teal-500",
  ];

  const BarChart: React.FC<{
    data: { [key: string]: number };
    total: number;
  }> = ({ data, total }) => {
    const maxValue = Math.max(...Object.values(data));

    const entries = Object.entries(data);

    return (
      <div className="flex items-end justify-center space-x-6 h-52">
        {entries.map(([label, value], index) => {
          const height = (value / maxValue) * 100;
          const percentage = ((value / total) * 100).toFixed(1);
          const color = colors[index % colors.length];

          return (
            <div key={label} className="flex flex-col items-center w-16">
              {/* Bar */}
              <div className="flex items-end h-40 w-full">
                <div
                  className={`${color} w-full rounded-t-md transition-all duration-300 relative`}
                  style={{ height: `${height}%`, minHeight: "0.25rem" }}
                >
                  <div className="absolute -top-5 text-xs text-gray-700 font-semibold w-full text-center">
                    {value}
                  </div>
                </div>
              </div>

              {/* Label */}
              <div
                className="mt-2 text-xs text-center truncate w-full"
                title={label}
              >
                {label}
              </div>
              <div className="text-xs text-gray-500">{percentage}%</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Results table component
  const ResultsTable: React.FC<{
    data: { [key: string]: number };
    total: number;
  }> = ({ data, total }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 border-b font-medium">Option</th>
              <th className="text-left p-3 border-b font-medium">Responses</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([option, count]) => {
              const percentage = ((count / total) * 100).toFixed(2);
              return (
                <tr key={option} className="border-b">
                  <td className="p-3">{option}</td>
                  <td className="p-3">
                    {count.toLocaleString()} - {percentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
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
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={question.scale?.min || 0}
              max={question.scale?.max || 10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {question.scale?.minLabel || question.scale?.min || 0}
              </span>
              <span>
                {question.scale?.maxLabel || question.scale?.max || 10}
              </span>
            </div>
          </div>
        );

      case "dropdown":
        return (
          <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
            <option>Select an option...</option>
            {question.options?.map((option, index) => (
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
          />
        );

      case "time":
        return (
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        );

      case "text":
        return (
          <input
            type="text"
            placeholder="Enter your answer..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder="Enter your detailed response..."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md resize-none"
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
                    {question.options?.map((_, colIndex) => (
                      <td key={colIndex} className="text-center p-2 border-b">
                        <input
                          type="radio"
                          name={`matrix-${question.id}-${rowIndex}`}
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
          <h1 className="text-2xl font-semibold text-gray-900">
            {template.name}
          </h1>
          <button
            onClick={onBack}
            className="text-sm text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50"
          >
            Back to Templates
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("preview")}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === "preview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("sample")}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sample"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Sample Result
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden details-container">
        {activeTab === "preview" ? (
          <>
            {/* Left Panel - Survey Questions */}
            <div
              className="bg-white p-6 overflow-y-auto flex-shrink-0 border-r border-gray-200"
              style={{ width: `${leftPanelWidth}px` }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {template.name}
              </h2>

              <div className="space-y-6">
                {template.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border-b border-gray-100 pb-6"
                  >
                    <div className="flex items-start space-x-2 mb-3">
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-500 mb-2">
                          {question.question}
                          {question.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </h3>
                        <div className="text-xs text-gray-500 mb-3 capitalize">
                          {question.type.replace("-", " ")}
                        </div>
                        {renderQuestion(question)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Draggable bar */}
            <div
              className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize flex items-center justify-center relative group flex-shrink-0"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute inset-y-0 flex items-center justify-center w-4 -ml-1.5">
                <div className="w-1 h-8 bg-gray-400 rounded-full group-hover:bg-gray-500"></div>
              </div>
            </div>

            {/* Right Panel - Template Info */}
            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
              <div className="max-w-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {template.name}
                </h2>

                <div className="space-y-3 mb-30">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {template.createdDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Modified: {template.modifiedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Benchmarks Available</span>
                  </div>
                </div>

                <div className="flex-1 flex items-end">
                  <div className="w-full space-y-4">
                    <p className="text-sm text-gray-600">
                      You can always make changes to the theme and template
                    </p>

                    <button
                      onClick={onUseTemplate}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <span>Use this Template</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-2">
                        Didn't find what you are looking for?
                      </p>

                      <button
                        onClick={onStartBlank}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer"
                      >
                        Start with a Blank Survey
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Sample Result Tab */
          <>
            {/* Left Panel - Sample Results */}
            <div
              className="bg-white p-6 overflow-y-auto flex-shrink-0 border-r border-gray-200"
              style={{ width: `${leftPanelWidth}px` }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {template.name}
              </h2>

              <div className="space-y-8">
                {template.questions.map((question, index) => {
                  const result = sampleResults.find(
                    (r) => r.questionId === question.id
                  );
                  if (!result) return null;

                  const totalUsers =
                    result.totalResponded + result.totalSkipped;

                  return (
                    <div
                      key={question.id}
                      className="border-b border-gray-100 pb-8"
                    >
                      <div className="flex items-start space-x-2 mb-4">
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-500 mb-4">
                            {question.question}
                          </h3>

                          {/* Bar Chart */}
                          <div className="mb-4">
                            <BarChart
                              data={result.responses}
                              total={result.totalResponded}
                            />
                          </div>

                          {/* Statistics */}
                          <div className="flex space-x-4 mb-4 text-sm">
                            <div className="text-green-600 font-medium">
                              Answered: {result.totalResponded.toLocaleString()}
                            </div>
                            <div className="text-red-600 font-medium">
                              Skipped: {result.totalSkipped.toLocaleString()}
                            </div>
                          </div>

                          {/* Results Table */}
                          <ResultsTable
                            data={result.responses}
                            total={result.totalResponded}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Draggable bar */}
            <div
              className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize flex items-center justify-center relative group flex-shrink-0"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute inset-y-0 flex items-center justify-center w-4 -ml-1.5">
                <div className="w-1 h-8 bg-gray-400 rounded-full group-hover:bg-gray-500"></div>
              </div>
            </div>

            {/* Right Panel - Template Info with Description */}
            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
              <div className="max-w-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {template.name}
                </h2>

                {/* Template Description */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="space-y-3 mb-15">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {template.createdDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Modified: {template.modifiedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Benchmarks Available</span>
                  </div>
                </div>

                <div className="flex-1 flex items-end">
                  <div className="w-full space-y-4">
                    <p className="text-sm text-gray-600">
                      You can always make changes to the theme and template
                    </p>

                    <button
                      onClick={onUseTemplate}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <span>Use this Template</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-2">
                        Didn't find what you are looking for?
                      </p>
                      <button
                        onClick={onStartBlank}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer"
                      >
                        Start with a Blank Survey
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main PopularTemplates Component
const PopularTemplates: React.FC<Props> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [showBlankSurvey, setShowBlankSurvey] = useState(false);
  const [showEditTemplate, setShowEditTemplate] = useState(false);

  // Mock template data
  const templates: Template[] = [
    {
      id: 1,
      name: "Employee Satisfaction Survey",
      description:
        "Measure employee engagement and satisfaction levels across your organization.",
      usedCount: 1250,
      image:
        "https://via.placeholder.com/200x120/4F46E5/FFFFFF?text=Employee+Survey",
      category: "Team Templates",
      isFree: true,
    },
    {
      id: 2,
      name: "Customer Feedback Form",
      description:
        "Collect valuable feedback from customers about products and services.",
      usedCount: 2100,
      image:
        "https://via.placeholder.com/200x120/10B981/FFFFFF?text=Customer+Form",
      category: "Forms",
      isFree: true,
    },
    {
      id: 3,
      name: "Event Registration",
      description:
        "Streamlined registration process for events and conferences.",
      usedCount: 890,
      image: "https://via.placeholder.com/200x120/F59E0B/FFFFFF?text=Event+Reg",
      category: "Events",
      isFree: false,
    },
    {
      id: 4,
      name: "Marketing Campaign Analysis",
      description:
        "Analyze the effectiveness of your marketing campaigns and strategies.",
      usedCount: 650,
      image: "https://via.placeholder.com/200x120/EF4444/FFFFFF?text=Marketing",
      category: "Marketing",
      isFree: false,
    },
    {
      id: 5,
      name: "Service Quality Assessment",
      description:
        "Evaluate service quality and identify areas for improvement.",
      usedCount: 420,
      image:
        "https://via.placeholder.com/200x120/8B5CF6/FFFFFF?text=Service+Quality",
      category: "Services",
      isFree: true,
    },
    {
      id: 6,
      name: "Team Building Survey",
      description: "Assess team dynamics and collaboration effectiveness.",
      usedCount: 780,
      image:
        "https://via.placeholder.com/200x120/06B6D4/FFFFFF?text=Team+Building",
      category: "Team Templates",
      isFree: true,
    },
    {
      id: 7,
      name: "Product Launch Survey",
      description: "Gather insights before and after product launches.",
      usedCount: 1450,
      image:
        "https://via.placeholder.com/200x120/84CC16/FFFFFF?text=Product+Launch",
      category: "Most Popular",
      isFree: false,
    },
    {
      id: 8,
      name: "Contact Information Form",
      description: "Simple and effective way to collect contact details.",
      usedCount: 3200,
      image:
        "https://via.placeholder.com/200x120/6366F1/FFFFFF?text=Contact+Form",
      category: "Forms",
      isFree: true,
    },
  ];

  // Categories with counts
  const categories: Category[] = [
    { name: "Team Templates", count: 12, key: "Team Templates" },
    { name: "Forms", count: 24, key: "Forms" },
    { name: "Most Popular", count: 8, key: "Most Popular" },
    { name: "Events", count: 15, key: "Events" },
    { name: "Services", count: 18, key: "Services" },
    { name: "Marketing", count: 22, key: "Marketing" },
    { name: "Customer Research", count: 16, key: "Customer Research" },
    { name: "HR & Recruitment", count: 10, key: "HR & Recruitment" },
  ];

  // Mock detailed template data
  const getTemplateDetails = (templateId: number): TemplateDetails => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) throw new Error("Template not found");

    // Generate different questions based on template type
    const questionSets: { [key: number]: Question[] } = {
      1: [
        // Employee Satisfaction Survey
        {
          id: 1,
          type: "multiple-choice",
          question: "How satisfied are you with your current role?",
          options: [
            "Very Satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very Dissatisfied",
          ],
          required: true,
        },
        {
          id: 2,
          type: "star-rating",
          question: "Rate your overall experience with the company",
          required: true,
        },
        {
          id: 3,
          type: "checkbox",
          question:
            "Which benefits are most important to you? (Select all that apply)",
          options: [
            "Health Insurance",
            "Retirement Plan",
            "Flexible Hours",
            "Remote Work",
            "Professional Development",
          ],
          required: false,
        },
        {
          id: 4,
          type: "slider",
          question:
            "How likely are you to recommend this company as a place to work?",
          scale: {
            min: 0,
            max: 10,
            minLabel: "Not Likely",
            maxLabel: "Very Likely",
          },
          required: true,
        },
        {
          id: 5,
          type: "dropdown",
          question: "Which department do you work in?",
          options: [
            "Engineering",
            "Marketing",
            "Sales",
            "HR",
            "Finance",
            "Operations",
          ],
          required: true,
        },
        {
          id: 6,
          type: "textarea",
          question:
            "What suggestions do you have for improving workplace culture?",
          required: false,
        },
      ],
      2: [
        // Customer Feedback Form
        {
          id: 1,
          type: "star-rating",
          question: "How would you rate our product/service overall?",
          required: true,
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "How did you hear about us?",
          options: [
            "Social Media",
            "Search Engine",
            "Friend/Family",
            "Advertisement",
            "Other",
          ],
          required: true,
        },
        {
          id: 3,
          type: "matrix",
          question: "Please rate the following aspects of our service",
          options: ["Excellent", "Good", "Fair", "Poor"],
          required: true,
        },
        {
          id: 4,
          type: "textarea",
          question: "What can we do to improve your experience?",
          required: false,
        },
        {
          id: 5,
          type: "checkbox",
          question: "Which features do you use most? (Select all that apply)",
          options: [
            "Feature A",
            "Feature B",
            "Feature C",
            "Feature D",
            "Feature E",
          ],
          required: false,
        },
      ],
      3: [
        // Event Registration
        {
          id: 1,
          type: "text",
          question: "Full Name",
          required: true,
        },
        {
          id: 2,
          type: "text",
          question: "Email Address",
          required: true,
        },
        {
          id: 3,
          type: "text",
          question: "Phone Number",
          required: true,
        },
        {
          id: 4,
          type: "dropdown",
          question: "Which session are you most interested in?",
          options: [
            "Morning Session",
            "Afternoon Session",
            "Evening Session",
            "All Sessions",
          ],
          required: true,
        },
        {
          id: 5,
          type: "checkbox",
          question: "Dietary Requirements (Select all that apply)",
          options: [
            "Vegetarian",
            "Vegan",
            "Gluten-Free",
            "Dairy-Free",
            "No Restrictions",
          ],
          required: false,
        },
        {
          id: 6,
          type: "date",
          question: "Preferred Event Date",
          required: true,
        },
      ],
    };

    return {
      id: template.id,
      name: template.name,
      description: template.description,
      createdDate: "Jan 15, 2024",
      modifiedDate: "Feb 20, 2024",
      category: template.category,
      usedCount: template.usedCount,
      questions: questionSets[template.id] || [
        {
          id: 1,
          type: "text",
          question: "Sample question for this template",
          required: true,
        },
      ],
    };
  };

  // Filter templates based on search, free filter, and categories
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFree = !showFreeOnly || template.isFree;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(template.category);

      return matchesSearch && matchesFree && matchesCategory;
    });
  }, [searchTerm, showFreeOnly, selectedCategories, templates]);

  const handleCategoryChange = (categoryKey: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryKey)
        ? prev.filter((cat) => cat !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const containerRect = document
      .querySelector(".main-container")
      ?.getBoundingClientRect();
    if (!containerRect) return;

    const newWidth = e.clientX - containerRect.left;
    const minWidth = 250;
    const maxWidth = 500;

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setLeftPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  // Calculate grid columns based on right panel width
  const getGridColumns = () => {
    const rightPanelWidth = window.innerWidth - leftPanelWidth - 24; // 24px for draggable bar and padding
    if (rightPanelWidth < 600) return "grid-cols-1";
    if (rightPanelWidth < 900) return "grid-cols-2";
    if (rightPanelWidth < 1200) return "grid-cols-3";
    return "grid-cols-4";
  };

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
  };

  const handleUseTemplate = () => {
    setShowEditTemplate(true);
  };

  const handleStartBlank = () => {
    setSelectedTemplate(null);
    setShowBlankSurvey(true);
  };

  const handleBackFromBlankSurvey = () => {
    setShowBlankSurvey(false);
  };

  const handleSaveSurvey = (surveyData: any) => {
    // Handle the survey save logic here
    console.log("Survey saved:", surveyData);
    // You can add your save logic here (API call, state management, etc.)

    // Optionally go back to templates after saving
    setShowBlankSurvey(false);

    // Or you could navigate to a different page
    // onBack(); // This would go back to the parent component
  };

  const handleBackFromEditTemplate = () => {
  setShowEditTemplate(false);
  setSelectedTemplate(null);
};

const handleSaveEditedTemplate = (updatedTemplate: TemplateDetails) => {
  // Handle the updated template here (save to database, update state, etc.)
  console.log("Template saved:", updatedTemplate);
  
  // Optionally show a success message
  alert("Template saved successfully!");
  
  // Go back to template details or templates list
  setShowEditTemplate(false);
  // setSelectedTemplate(null); // Uncomment to go back to template list
};

  // Show AddSurvey component when showBlankSurvey is true
  if (showBlankSurvey) {
    return (
      <AddSurvey onBack={handleBackFromBlankSurvey} onSave={handleSaveSurvey} />
    );
  }

  // Show EditTemplate component when editing
if (showEditTemplate && selectedTemplate) {
  const templateDetails = getTemplateDetails(selectedTemplate.id);
  return (
    <EditTemplate
      template={templateDetails}
      onBack={handleBackFromEditTemplate}
      onSave={handleSaveEditedTemplate}
    />
  );
}

  // Show template details if a template is selected
  if (selectedTemplate) {
    const templateDetails = getTemplateDetails(selectedTemplate.id);
    return (
      <SurveyTemplateDetails
        template={templateDetails}
        onBack={handleBackToTemplates}
        onUseTemplate={handleUseTemplate}
        onStartBlank={handleStartBlank}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create Template Survey
          </h1>

          <button
            onClick={onBack}
            className="text-sm text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50"
          >
            Back
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden main-container">
        {/* Left Panel */}
        <div
          className="bg-white p-6 overflow-y-auto flex-shrink-0"
          style={{ width: `${leftPanelWidth}px` }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Explore Templates
          </h2>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Templates"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Filters</h3>

            {/* Plan Type */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Plan Type
              </h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Show Free Templates
                </span>
              </label>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Categories
              </h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.key)}
                      onChange={() => handleCategoryChange(category.key)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {category.name} ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Draggable bar */}
        <div
          className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize flex items-center justify-center relative group flex-shrink-0"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 flex items-center justify-center w-4 -ml-1.5">
            <div className="w-1 h-8 bg-gray-400 rounded-full group-hover:bg-gray-500"></div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <div className={`grid gap-6 ${getGridColumns()}`}>
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => handleTemplateClick(template)}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Used {template.usedCount.toLocaleString()}+ times
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {template.description}
                  </p>
                  {!template.isFree && (
                    <div className="mt-2">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Premium
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No templates found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularTemplates;
