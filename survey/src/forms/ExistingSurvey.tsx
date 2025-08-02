import React, { useState, useMemo, useRef } from "react";
import { FaSearch, FaStar, FaRegStar, FaTimes, FaArrowRight, FaGripVertical } from "react-icons/fa";
import SurveyCustomizer from "./SurveyCustomizer";

interface Survey {
  id: string;
  name: string;
  created: string;
  modified: string;
  responses: number;
  questions: number;
  timeSpent: string;
  isFavorite: boolean;
  isRecent: boolean;
  completionRate?: number;
  questionList?: Question[];
}

interface Question {
  id: string;
  type: 'MCQ' | 'CheckBox' | 'Star' | 'BestWorst' | 'FileUpload' | 'SingleText' | 'Comment' | 'MatrixDropdown' | 'Dropdown' | 'MatrixRating' | 'Ranking' | 'Slider' | 'MultipleText' | 'DateTime';
  title: string;
  options?: string[];
  required?: boolean;
}

interface Props {
  onBack: () => void;
}

const SurveyDetailView: React.FC<{ 
  survey: Survey; 
  onClose: () => void; 
  onToggleFavorite: (surveyId: string) => void;
  surveys: Survey[];
  onCopySurvey: (survey: Survey) => void;
}> = ({ survey, onClose, onToggleFavorite, surveys, onCopySurvey }) => {
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [formResponses, setFormResponses] = useState<Record<string, any>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the updated survey data from the surveys array
  const currentSurvey = surveys.find(s => s.id === survey.id) || survey;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPosition(Math.max(20, Math.min(80, newPosition)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleFormResponse = (questionId: string, value: any) => {
    setFormResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const renderQuestion = (question: Question, index: number) => {
    const questionTypeLabels = {
      'MCQ': 'Multiple Choice',
      'CheckBox': 'Check Boxes',
      'Star': 'Star Rating',
      'BestWorst': 'Best Worst Scale',
      'FileUpload': 'File Upload',
      'SingleText': 'Single Text Box',
      'Comment': 'Comment Box',
      'MatrixDropdown': 'Matrix of Dropdown Menu',
      'Dropdown': 'Dropdown',
      'MatrixRating': 'Matrix Rating',
      'Ranking': 'Ranking',
      'Slider': 'Slider',
      'MultipleText': 'Multiple Text Boxes',
      'DateTime': 'Date/Time'
    };

    const currentResponse = formResponses[question.id];

    return (
      <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Q{index + 1}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {questionTypeLabels[question.type]}
          </span>
        </div>
        
        <h3 className="font-medium text-gray-500 mb-3">{question.title}</h3>
        
        {question.options && question.options.length > 0 && (
          <div className="space-y-2">
            {question.type === 'MCQ' && question.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name={`question-${question.id}`} 
                  checked={currentResponse === option}
                  onChange={() => handleFormResponse(question.id, option)}
                  className="text-blue-600" 
                />
                <span className="text-sm text-gray-700">{option}</span>
              </div>
            ))}
            
            {question.type === 'CheckBox' && question.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={currentResponse && currentResponse.includes(option)}
                  onChange={(e) => {
                    const currentChecked = currentResponse || [];
                    if (e.target.checked) {
                      handleFormResponse(question.id, [...currentChecked, option]);
                    } else {
                      handleFormResponse(question.id, currentChecked.filter((item: string) => item !== option));
                    }
                  }}
                  className="text-blue-600" 
                />
                <span className="text-sm text-gray-700">{option}</span>
              </div>
            ))}
            
            {question.type === 'Dropdown' && (
              <select 
                value={currentResponse || ''}
                onChange={(e) => handleFormResponse(question.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="">Select an option...</option>
                {question.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        )}
        
        {question.type === 'SingleText' && (
          <input 
            type="text" 
            value={currentResponse || ''}
            onChange={(e) => handleFormResponse(question.id, e.target.value)}
            placeholder="Single line text input" 
            className="w-full p-2 border border-gray-300 rounded text-sm" 
          />
        )}
        
        {question.type === 'Comment' && (
          <textarea 
            value={currentResponse || ''}
            onChange={(e) => handleFormResponse(question.id, e.target.value)}
            placeholder="Multi-line text input" 
            rows={3} 
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
          />
        )}
        
        {question.type === 'Star' && (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleFormResponse(question.id, star)}
                className="hover:scale-110 transition-transform"
              >
                {currentResponse >= star ? (
                  <FaStar className="text-yellow-500 text-lg" />
                ) : (
                  <FaRegStar className="text-gray-300 text-lg hover:text-yellow-300" />
                )}
              </button>
            ))}
          </div>
        )}
        
        {question.type === 'Slider' && (
          <div className="space-y-2">
            <input 
              type="range" 
              value={currentResponse || 50}
              onChange={(e) => handleFormResponse(question.id, parseInt(e.target.value))}
              className="w-full" 
              min="0" 
              max="100" 
            />
            <div className="text-center text-sm text-gray-600">
              Value: {currentResponse || 50}
            </div>
          </div>
        )}
        
        {question.type === 'DateTime' && (
          <input 
            type="datetime-local" 
            value={currentResponse || ''}
            onChange={(e) => handleFormResponse(question.id, e.target.value)}
            className="p-2 border border-gray-300 rounded text-sm" 
          />
        )}
        
        {question.type === 'FileUpload' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <input
              type="file"
              multiple
              onChange={(e) => handleFormResponse(question.id, Array.from(e.target.files || []))}
              className="hidden"
              id={`file-${question.id}`}
            />
            <label htmlFor={`file-${question.id}`} className="cursor-pointer">
              <span className="text-sm text-gray-500">
                {currentResponse && currentResponse.length > 0 
                  ? `${currentResponse.length} file(s) selected` 
                  : 'Click to upload or drag and drop files'
                }
              </span>
            </label>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">{currentSurvey.name}</h1>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      </div>

      {/* Split View Container */}
      <div 
        ref={containerRef}
        className="flex h-full relative"
        style={{ height: 'calc(100vh - 73px)' }}
      >
        {/* Left Panel - Questions */}
        <div 
          className="overflow-y-auto bg-gray-50 p-6"
          style={{ width: `${splitPosition}%` }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Survey Questions</h2>
          {currentSurvey.questionList && currentSurvey.questionList.length > 0 ? (
            currentSurvey.questionList.map((question, index) => renderQuestion(question, index))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No questions available for this survey
            </div>
          )}
        </div>

        {/* Draggable Divider */}
        <div
          className={`w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors relative ${
            isDragging ? 'bg-gray-400' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaGripVertical className="text-gray-500 text-xs" />
          </div>
        </div>

        {/* Right Panel - Survey Details */}
        <div 
          className="overflow-y-auto bg-white p-6"
          style={{ width: `${100 - splitPosition}%` }}
        >
          <div className="max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentSurvey.name}</h2>
            
            <div className="text-sm text-gray-600 mb-2">
              <div>Created: {currentSurvey.created}</div>
              <div>Modified: {currentSurvey.modified}</div>
            </div>

            <button 
              onClick={() => onToggleFavorite(currentSurvey.id)}
              className="flex items-center space-x-2 text-sm text-gray-700 hover:text-yellow-600 transition-colors mb-4"
            >
              {currentSurvey.isFavorite ? (
                <FaStar className="text-yellow-500" />
              ) : (
                <FaRegStar className="text-gray-400" />
              )}
              <span>{currentSurvey.isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}</span>
            </button>

            <p className="text-lg text-gray-600 mb-6">
              You can always edit the surveys later.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Questions</span>
                <span className="text-lg font-semibold text-gray-600">{currentSurvey.questions}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Responses</span>
                <span className="text-lg font-semibold text-gray-600">{currentSurvey.responses}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Time To Complete</span>
                <span className="text-lg font-semibold text-gray-600">{currentSurvey.timeSpent} min</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="text-lg font-semibold text-gray-600">{currentSurvey.completionRate || 85}%</span>
              </div>
            </div>

            <button 
              onClick={() => onCopySurvey(currentSurvey)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Copy this Survey</span>
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExistingSurvey: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'recent' | 'all' | 'favorites'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [surveyToCopy, setSurveyToCopy] = useState<Survey | null>(null);
  
  // Enhanced dummy data with sample questions
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      name: 'Customer Feedback',
      created: '28/2/2025',
      modified: '29/2/2025',
      responses: 12,
      questions: 5,
      timeSpent: '5',
      isFavorite: false,
      isRecent: true,
      completionRate: 92,
      questionList: [
        {
          id: 'q1',
          type: 'MCQ',
          title: 'How would you rate our service?',
          options: ['Excellent', 'Good', 'Average', 'Poor'],
          required: true
        },
        {
          id: 'q2',
          type: 'Star',
          title: 'Please rate your overall experience',
          required: true
        },
        {
          id: 'q3',
          type: 'Comment',
          title: 'Any additional feedback or suggestions?',
          required: false
        }
      ]
    },
    {
      id: '2',
      name: 'Employee Satisfaction Survey',
      created: '25/2/2025',
      modified: '27/2/2025',
      responses: 8,
      questions: 7,
      timeSpent: '7',
      isFavorite: true,
      isRecent: true,
      completionRate: 78,
      questionList: [
        {
          id: 'q1',
          type: 'Slider',
          title: 'How satisfied are you with your current role?',
          required: true
        },
        {
          id: 'q2',
          type: 'CheckBox',
          title: 'Which benefits are most important to you?',
          options: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Professional Development'],
          required: true
        },
        {
          id: 'q3',
          type: 'SingleText',
          title: 'What is your department?',
          required: true
        }
      ]
    },
    {
      id: '3',
      name: 'Product Feedback Form',
      created: '20/2/2025',
      modified: '26/2/2025',
      responses: 15,
      questions: 6,
      timeSpent: '4',
      isFavorite: false,
      isRecent: false,
      completionRate: 88,
      questionList: [
        {
          id: 'q1',
          type: 'Dropdown',
          title: 'Which product did you purchase?',
          options: ['Product A', 'Product B', 'Product C', 'Product D'],
          required: true
        },
        {
          id: 'q2',
          type: 'DateTime',
          title: 'When did you make your purchase?',
          required: true
        }
      ]
    },
    {
      id: '4',
      name: 'Market Research Survey',
      created: '18/2/2025',
      modified: '24/2/2025',
      responses: 23,
      questions: 10,
      timeSpent: '8',
      isFavorite: true,
      isRecent: false,
      completionRate: 65,
      questionList: [
        {
          id: 'q1',
          type: 'MCQ',
          title: 'What is your age group?',
          options: ['18-25', '26-35', '36-45', '46-55', '55+'],
          required: true
        },
        {
          id: 'q2',
          type: 'FileUpload',
          title: 'Please upload any relevant documents',
          required: false
        }
      ]
    },
    {
      id: '5',
      name: 'Event Feedback',
      created: '15/2/2025',
      modified: '22/2/2025',
      responses: 6,
      questions: 4,
      timeSpent: '3',
      isFavorite: false,
      isRecent: false,
      completionRate: 95,
      questionList: [
        {
          id: 'q1',
          type: 'Star',
          title: 'How would you rate the event overall?',
          required: true
        },
        {
          id: 'q2',
          type: 'Comment',
          title: 'What did you like most about the event?',
          required: false
        }
      ]
    }
  ]);

  const toggleFavorite = (surveyId: string) => {
    setSurveys(prevSurveys => 
      prevSurveys.map(survey => 
        survey.id === surveyId 
          ? { ...survey, isFavorite: !survey.isFavorite }
          : survey
      )
    );
  };

  const handleViewSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
  };

  const handleCloseSurvey = () => {
    setSelectedSurvey(null);
  };

  const handleCopySurvey = (survey: Survey) => {
    setSurveyToCopy(survey);
    setShowCustomizer(true);
  };

  const handleCloseCustomizer = () => {
    setShowCustomizer(false);
    setSurveyToCopy(null);
  };

  const handleCustomizerDone = () => {
    // Here you can handle the completion of customization
    // For now, we'll just close the customizer
    setShowCustomizer(false);
    setSurveyToCopy(null);
    // You might want to navigate to a new survey or show a success message
  };

  const filteredSurveys = useMemo(() => {
    let filtered = surveys;

    // Filter by tab
    if (activeTab === 'recent') {
      filtered = filtered.filter(survey => survey.isRecent);
    } else if (activeTab === 'favorites') {
      filtered = filtered.filter(survey => survey.isFavorite);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(survey => 
        survey.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [surveys, activeTab, searchQuery]);

  // Show customizer if a survey is being copied
  if (showCustomizer && surveyToCopy) {
    return (
      <SurveyCustomizer 
        survey={surveyToCopy} 
        onClose={handleCloseCustomizer} 
        onDone={handleCustomizerDone}
      />
    );
  }

  // Show survey detail view if a survey is selected
  if (selectedSurvey) {
    return (
      <SurveyDetailView 
        survey={selectedSurvey} 
        onClose={handleCloseSurvey} 
        onToggleFavorite={toggleFavorite}
        surveys={surveys}
        onCopySurvey={handleCopySurvey}
      />
    );
  }

  const SurveyCard = ({ survey }: { survey: Survey }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <button 
          onClick={() => handleViewSurvey(survey)}
          className="text-blue-600 text-sm border border-blue-600 rounded px-2 py-1 hover:bg-blue-50"
        >
          view
        </button>
        <button
          onClick={() => toggleFavorite(survey.id)}
          className="text-gray-400 hover:text-yellow-500 transition-colors"
        >
          {survey.isFavorite ? (
            <FaStar className="text-yellow-500" />
          ) : (
            <FaRegStar />
          )}
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>
          <div className="font-medium text-gray-900 mb-1">{survey.name}</div>
          <div className="text-gray-500 text-xs">
            <div>Created: {survey.created}</div>
            <div>Modified: {survey.modified}</div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{survey.responses}</div>
          <div className="text-xs text-gray-500">Responses</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{survey.questions}</div>
          <div className="text-xs text-gray-500">Questions</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{survey.timeSpent}</div>
          <div className="text-xs text-gray-500">Typical Time Spent</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Copy an existing Survey</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaSearch className="text-lg" />
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'favorites' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FaStar className="text-sm" />
            Favourites
          </button>
          <button
            onClick={onBack}
            className="text-sm text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50"
          >
            Back
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search surveys by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('recent')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'recent'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All
          </button>
        </nav>
      </div>

      {/* Survey List */}
      <div className="space-y-4">
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {activeTab === 'favorites' 
              ? 'No favorite surveys found' 
              : searchQuery 
                ? 'No surveys found matching your search' 
                : 'No surveys found'
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingSurvey;