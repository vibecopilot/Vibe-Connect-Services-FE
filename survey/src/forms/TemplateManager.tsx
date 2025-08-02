import React, { useState } from "react";
import { FaSearch, FaStar, FaArrowRight, FaChartBar, FaCalendarAlt } from "react-icons/fa";

interface Template {
  id: number;
  name: string;
  description: string;
  usedCount: number;
  image: string;
  category: string;
  isFree: boolean;
}

interface Category {
  name: string;
  count: number;
  key: string;
}

interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  required?: boolean;
}

interface SampleResponse {
  questionId: number;
  responses: { [key: string]: number };
  answered: number;
  skipped: number;
}

// PopularTemplates Component
const PopularTemplates: React.FC<{
  onBack: () => void;
  onTemplateSelect: (template: Template) => void;
}> = ({ onBack, onTemplateSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);

  // Mock template data
  const templates: Template[] = [
    {
      id: 1,
      name: "Employee Satisfaction Survey",
      description: "Measure employee engagement and satisfaction levels across your organization.",
      usedCount: 1250,
      image: "https://via.placeholder.com/200x120/4F46E5/FFFFFF?text=Employee+Survey",
      category: "Team Templates",
      isFree: true,
    },
    {
      id: 2,
      name: "Customer Feedback Form",
      description: "Collect valuable feedback from customers about products and services.",
      usedCount: 2100,
      image: "https://via.placeholder.com/200x120/10B981/FFFFFF?text=Customer+Form",
      category: "Forms",
      isFree: true,
    },
    {
      id: 3,
      name: "Event Registration",
      description: "Streamlined registration process for events and conferences.",
      usedCount: 890,
      image: "https://via.placeholder.com/200x120/F59E0B/FFFFFF?text=Event+Reg",
      category: "Events",
      isFree: false,
    },
    {
      id: 4,
      name: "Marketing Campaign Analysis",
      description: "Analyze the effectiveness of your marketing campaigns and strategies.",
      usedCount: 650,
      image: "https://via.placeholder.com/200x120/EF4444/FFFFFF?text=Marketing",
      category: "Marketing",
      isFree: false,
    },
    {
      id: 5,
      name: "Service Quality Assessment",
      description: "Evaluate service quality and identify areas for improvement.",
      usedCount: 420,
      image: "https://via.placeholder.com/200x120/8B5CF6/FFFFFF?text=Service+Quality",
      category: "Services",
      isFree: true,
    },
    {
      id: 6,
      name: "Team Building Survey",
      description: "Assess team dynamics and collaboration effectiveness.",
      usedCount: 780,
      image: "https://via.placeholder.com/200x120/06B6D4/FFFFFF?text=Team+Building",
      category: "Team Templates",
      isFree: true,
    },
    {
      id: 7,
      name: "Product Launch Survey",
      description: "Gather insights before and after product launches.",
      usedCount: 1450,
      image: "https://via.placeholder.com/200x120/84CC16/FFFFFF?text=Product+Launch",
      category: "Most Popular",
      isFree: false,
    },
    {
      id: 8,
      name: "Contact Information Form",
      description: "Simple and effective way to collect contact details.",
      usedCount: 3200,
      image: "https://via.placeholder.com/200x120/6366F1/FFFFFF?text=Contact+Form",
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

  // Filter templates
  const filteredTemplates = React.useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFree = !showFreeOnly || template.isFree;
      const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(template.category);
      
      return matchesSearch && matchesFree && matchesCategory;
    });
  }, [searchTerm, showFreeOnly, selectedCategories]);

  const handleCategoryChange = (categoryKey: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryKey) 
        ? prev.filter(cat => cat !== categoryKey)
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
    
    const containerRect = document.querySelector('.main-container')?.getBoundingClientRect();
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

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';  
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Calculate grid columns
  const getGridColumns = () => {
    const rightPanelWidth = window.innerWidth - leftPanelWidth - 24;
    if (rightPanelWidth < 600) return 'grid-cols-1';
    if (rightPanelWidth < 900) return 'grid-cols-2';
    if (rightPanelWidth < 1200) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Create Template Survey</h1>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore Templates</h2>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
              <h4 className="text-sm font-medium text-gray-700 mb-2">Plan Type</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Show Free Templates</span>
              </label>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
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
                onClick={() => onTemplateSelect(template)}
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
              <p className="text-gray-500 text-lg">No templates found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// TemplatePreview Component
const TemplatePreview: React.FC<{
  template: Template;
  onBack: () => void;
  onStartBlankSurvey: () => void;
}> = ({ template, onBack, onStartBlankSurvey }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'sampleResult'>('preview');
  const [leftPanelWidth, setLeftPanelWidth] = useState(480);
  const [isDragging, setIsDragging] = useState(false);

  // Sample questions for selected templates
  const getQuestionsForTemplate = (templateId: number): Question[] => {
    switch (templateId) {
      case 1: // Employee Satisfaction Survey
        return [
          {
            id: 1,
            type: "Multiple Choice",
            question: "How satisfied are you with your current role?",
            options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
            required: true
          },
          {
            id: 2,
            type: "Star Rating",
            question: "Rate your overall job satisfaction",
            required: true
          },
          {
            id: 3,
            type: "Comment Box",
            question: "What aspects of your job do you enjoy most?",
            required: false
          }
        ];
      case 2: // Customer Feedback Form
        return [
          {
            id: 1,
            type: "Star Rating",
            question: "How would you rate our service overall?",
            required: true
          },
          {
            id: 2,
            type: "Multiple Choice",
            question: "How likely are you to recommend us to others?",
            options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"],
            required: true
          },
          {
            id: 3,
            type: "Comment Box",
            question: "Please share any additional feedback or suggestions",
            required: false
          }
        ];
      case 8: // Contact Information Form
        return [
          {
            id: 1,
            type: "Single Textbox",
            question: "Full Name",
            required: true
          },
          {
            id: 2,
            type: "Single Textbox",
            question: "Email Address",
            required: true
          },
          {
            id: 3,
            type: "Single Textbox",
            question: "Phone Number",
            required: false
          }
        ];
      default:
        return [
          {
            id: 1,
            type: "Multiple Choice",
            question: "Sample question for this template",
            options: ["Option 1", "Option 2", "Option 3"],
            required: true
          }
        ];
    }
  };

  const questions = getQuestionsForTemplate(template.id);

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "Multiple Choice":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input type="radio" name={`q${question.id}`} className="mr-2" />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );
      case "Star Rating":
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className="text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        );
      case "Comment Box":
        return (
          <textarea 
            placeholder="Enter your response..." 
            className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
          />
        );
      case "Single Textbox":
        return (
          <input 
            type="text" 
            placeholder="Enter your answer..." 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        );
      default:
        return <div className="text-gray-500 text-sm">Question type: {question.type}</div>;
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
              className="text-sm text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50"
            >
              Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">{template.name}</h1>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preview' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('sampleResult')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'sampleResult' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sample Result
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-white p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{template.name}</h2>
          
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 flex-1">
                      {index + 1}. {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">{question.type}</span>
                  </div>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sampleResult' && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Sample Analytics</h3>
              <p className="text-gray-600">Sample result data would be displayed here based on template responses.</p>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
            {/* Template Info */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{template.name}</h2>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>Created: Jan 15, 2024</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
                <FaChartBar className="mr-2" />
                <span>Benchmarks Available</span>
              </div>
            </div>

            {/* Middle Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Survey Template</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {template.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-600 text-center">
                You can always make changes to the theme and template
              </p>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                <span>Use this Template</span>
                <FaArrowRight className="ml-2" />
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Didn't find what you are looking for?</p>
                <button 
                  onClick={onStartBlankSurvey}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                >
                  Start with a blank survey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Template Manager Component
const TemplateManager: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'preview'>('list');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('preview');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedTemplate(null);
  };

  const handleStartBlankSurvey = () => {
    alert('Starting blank survey...');
  };

  const handleMainBack = () => {
    alert('Going back to main menu...');
  };

  if (currentView === 'preview' && selectedTemplate) {
    return (
      <TemplatePreview 
        template={selectedTemplate}
        onBack={handleBackToList}
        onStartBlankSurvey={handleStartBlankSurvey}
      />
    );
  }

  return (
    <PopularTemplates 
      onBack={handleMainBack}
      onTemplateSelect={handleTemplateSelect}
    />
  );
};

export default TemplateManager;