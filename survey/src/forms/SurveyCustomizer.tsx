import React, { useState, useRef } from "react";
import { 
  FaTimes, 
  FaGripVertical, 
  FaImage, 
  FaFont, 
  FaColumns, 
  FaPalette, 
  FaEllipsisH,
  FaPlus,
  FaStar,
  FaAngleDoubleDown
} from "react-icons/fa";

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

interface StyleSettings {
  logo: string;
  footer: string;
  font: string;
  layout: string;
  background: string;
}

interface Theme {
  id: string;
  name: string;
  preview: string;
  isCustom?: boolean;
}

interface Props {
  survey: Survey;
  onClose: () => void;
  onDone: () => void;
}

const SurveyCustomizer: React.FC<Props> = ({ survey, onClose, onDone }) => {
  const [splitPosition, setSplitPosition] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'theme'>('settings');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [styleVariations, setStyleVariations] = useState<{[key: string]: number}>({
    logo: 0,
    footer: 0,
    fonts: 0,
    layout: 0,
    background: 0
  });
  const [starRatings, setStarRatings] = useState<{[key: string]: number}>({});
  
  const containerRef = useRef<HTMLDivElement>(null);

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

  const styleOptions = [
    { id: 'logo', name: 'Your Logo', icon: FaImage },
    { id: 'footer', name: 'Footer', icon: FaAngleDoubleDown },
    { id: 'fonts', name: 'Fonts', icon: FaFont },
    { id: 'layout', name: 'Layout', icon: FaColumns },
    { id: 'background', name: 'Background', icon: FaPalette }
  ];

  const myThemes: Theme[] = [
    { id: 'create', name: 'Create Custom Theme', preview: '', isCustom: true },
    { id: 'my1', name: 'My Blue Theme', preview: '#3B82F6', isCustom: true },
    { id: 'my2', name: 'Corporate Red', preview: '#EF4444', isCustom: true }
  ];

  const standardThemes: Theme[] = [
    { id: 'heritage', name: 'Heritage', preview: '#8B4513' },
    { id: 'simple', name: 'Simple', preview: '#6B7280' },
    { id: 'pastel', name: 'Pastel', preview: '#F3E8FF' },
    { id: 'modern', name: 'Modern', preview: '#1F2937' },
    { id: 'ocean', name: 'Ocean', preview: '#0EA5E9' }
  ];

  const handleStyleClick = (styleId: string) => {
    if (selectedStyle === styleId) {
      // Cycle through variations (0, 1, 2, then back to 0)
      const currentVariation = styleVariations[styleId];
      const nextVariation = (currentVariation + 1) % 3;
      setStyleVariations(prev => ({
        ...prev,
        [styleId]: nextVariation
      }));
    } else {
      // New style selected, start with variation 0
      setSelectedStyle(styleId);
      setStyleVariations(prev => ({
        ...prev,
        [styleId]: 0
      }));
      setSelectedTheme(''); // Clear theme selection when style is selected
    }
  };

  const handleThemeClick = (themeId: string) => {
    if (themeId !== 'create') {
      setSelectedTheme(themeId);
      setSelectedStyle(''); // Clear style selection when theme is selected
    }
  };

  const handleStarClick = (questionId: string, rating: number) => {
    setStarRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const getAppliedStyles = () => {
    let styles = {
      container: {},
      preview: {},
      details: {},
      questions: {},
      text: {},
      logo: false,
      footer: ''
    };

    // Apply individual style settings with variations
    if (selectedStyle) {
      const variation = styleVariations[selectedStyle];
      
      switch (selectedStyle) {
        case 'logo':
          styles.logo = true;
          if (variation === 0) {
            styles.preview = { 
              borderTop: '6px solid #3B82F6',
              paddingTop: '24px'
            };
            styles.details = {
              borderTop: '4px solid #3B82F6'
            };
          } else if (variation === 1) {
            styles.preview = { 
              borderTop: '8px solid #10B981',
              paddingTop: '28px',
              background: '#F0FDF4'
            };
            styles.details = {
              borderTop: '6px solid #10B981',
              background: '#F0FDF4'
            };
          } else {
            styles.preview = { 
              borderTop: '10px solid #F59E0B',
              paddingTop: '32px',
              background: '#FFFBEB'
            };
            styles.details = {
              borderTop: '8px solid #F59E0B',
              background: '#FFFBEB'
            };
          }
          break;
          
        case 'footer':
          if (variation === 0) {
            styles.footer = '© 2025 Custom Survey Footer - All Rights Reserved';
            styles.preview = { 
              borderBottom: '4px solid #6B7280',
              paddingBottom: '20px'
            };
            styles.details = {
              borderBottom: '3px solid #6B7280'
            };
          } else if (variation === 1) {
            styles.footer = 'Powered by Your Survey Platform | Contact: support@yoursite.com';
            styles.preview = { 
              borderBottom: '6px solid #8B5CF6',
              paddingBottom: '24px',
              background: '#FAF5FF'
            };
            styles.details = {
              borderBottom: '4px solid #8B5CF6',
              background: '#FAF5FF'
            };
          } else {
            styles.footer = 'Thank you for participating | Visit us at www.yourwebsite.com';
            styles.preview = { 
              borderBottom: '8px solid #EF4444',
              paddingBottom: '28px',
              background: '#FEF2F2'
            };
            styles.details = {
              borderBottom: '6px solid #EF4444',
              background: '#FEF2F2'
            };
          }
          break;
          
        case 'fonts':
          if (variation === 0) {
            styles.text = { 
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: '16px',
              lineHeight: '1.6'
            };
          } else if (variation === 1) {
            styles.text = { 
              fontFamily: '"Helvetica Neue", "Arial", sans-serif',
              fontSize: '15px',
              lineHeight: '1.5',
              fontWeight: '300'
            };
          } else {
            styles.text = { 
              fontFamily: '"Courier New", "Monaco", monospace',
              fontSize: '14px',
              lineHeight: '1.7',
              letterSpacing: '0.5px'
            };
          }
          break;
          
        case 'layout':
          if (variation === 0) {
            styles.container = { 
              padding: '32px',
              backgroundColor: '#F8FAFC'
            };
            styles.preview = { 
              padding: '28px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '2px solid #E2E8F0'
            };
            styles.details = {
              padding: '28px',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
            };
          } else if (variation === 1) {
            styles.container = { 
              padding: '24px',
              backgroundColor: '#F1F5F9'
            };
            styles.preview = { 
              padding: '32px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '3px solid #CBD5E1',
              margin: '16px'
            };
            styles.details = {
              padding: '32px',
              borderRadius: '24px',
              boxShadow: '0 15px 30px rgba(0,0,0,0.12)'
            };
          } else {
            styles.container = { 
              padding: '40px',
              backgroundColor: '#FAFAFA'
            };
            styles.preview = { 
              padding: '40px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid #F0F0F0'
            };
            styles.details = {
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            };
          }
          break;
          
        case 'background':
          if (variation === 0) {
            styles.container = { 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            };
            styles.preview = { 
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              color: 'white',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)'
            };
            styles.details = {
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              color: 'white',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)'
            };
            styles.questions = {
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white'
            };
          } else if (variation === 1) {
            styles.container = { 
              background: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 100%)',
              color: 'white'
            };
            styles.preview = { 
              background: 'linear-gradient(45deg, #FF5722 0%, #00BCD4 100%)',
              color: 'white',
              borderRadius: '20px',
              border: '3px solid rgba(255,255,255,0.3)'
            };
            styles.details = {
              background: 'linear-gradient(45deg, #E91E63 0%, #009688 100%)',
              color: 'white',
              borderRadius: '20px',
              border: '3px solid rgba(255,255,255,0.3)'
            };
            styles.questions = {
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.4)',
              color: 'white'
            };
          } else {
            styles.container = { 
              background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
              color: '#333'
            };
            styles.preview = { 
              background: 'linear-gradient(90deg, #00D4FF 0%, #7BFFB8 100%)',
              color: '#333',
              borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            };
            styles.details = {
              background: 'linear-gradient(90deg, #00A8CC 0%, #5FE68A 100%)',
              color: '#333',
              borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.5)'
            };
            styles.questions = {
              backgroundColor: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.6)',
              color: '#333'
            };
          }
          break;
      }
    }

    // Apply theme settings (override individual styles)
    if (selectedTheme) {
      switch (selectedTheme) {
        case 'heritage':
          styles.container = { 
            backgroundColor: '#FDF6E3',
            color: '#8B4513'
          };
          styles.preview = { 
            backgroundColor: '#F4E6D3',
            border: '3px solid #8B4513',
            borderRadius: '8px'
          };
          styles.details = {
            backgroundColor: '#F4E6D3',
            border: '2px solid #8B4513',
            borderRadius: '8px'
          };
          styles.text = { 
            fontFamily: '"Times New Roman", serif',
            color: '#654321'
          };
          styles.questions = {
            backgroundColor: '#FFFFFF',
            border: '2px solid #D2B48C'
          };
          break;
        case 'simple':
          styles.container = { 
            backgroundColor: '#F9FAFB'
          };
          styles.preview = { 
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D5DB',
            borderRadius: '6px'
          };
          styles.details = {
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D5DB',
            borderRadius: '6px'
          };
          styles.text = { 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#374151'
          };
          break;
        case 'pastel':
          styles.container = { 
            background: 'linear-gradient(135deg, #FEF7FF 0%, #F3E8FF 100%)'
          };
          styles.preview = { 
            backgroundColor: '#FAF5FF',
            border: '2px solid #E9D5FF',
            borderRadius: '16px'
          };
          styles.details = {
            backgroundColor: '#FAF5FF',
            border: '2px solid #E9D5FF',
            borderRadius: '16px'
          };
          styles.text = { 
            color: '#7C3AED'
          };
          styles.questions = {
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDD6FE'
          };
          break;
        case 'modern':
          styles.container = { 
            backgroundColor: '#0F172A',
            color: '#F1F5F9'
          };
          styles.preview = { 
            backgroundColor: '#1E293B',
            border: '2px solid #334155',
            borderRadius: '12px'
          };
          styles.details = {
            backgroundColor: '#1E293B',
            border: '2px solid #334155',
            borderRadius: '12px',
            color: '#F1F5F9'
          };
          styles.text = { 
            color: '#F1F5F9'
          };
          styles.questions = {
            backgroundColor: '#334155',
            border: '1px solid #475569',
            color: '#F1F5F9'
          };
          break;
        case 'ocean':
          styles.container = { 
            background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)'
          };
          styles.preview = { 
            backgroundColor: '#F0F9FF',
            border: '3px solid #0EA5E9',
            borderRadius: '12px'
          };
          styles.details = {
            backgroundColor: '#F0F9FF',
            border: '2px solid #0EA5E9',
            borderRadius: '12px'
          };
          styles.text = { 
            color: '#0C4A6E'
          };
          styles.questions = {
            backgroundColor: '#FFFFFF',
            border: '2px solid #7DD3FC'
          };
          break;
        case 'my1':
          styles.container = { 
            background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)'
          };
          styles.preview = { 
            backgroundColor: '#EFF6FF',
            border: '3px solid #3B82F6',
            borderRadius: '12px'
          };
          styles.details = {
            backgroundColor: '#EFF6FF',
            border: '2px solid #3B82F6',
            borderRadius: '12px'
          };
          styles.text = { 
            color: '#1E40AF'
          };
          break;
        case 'my2':
          styles.container = { 
            backgroundColor: '#FEF2F2'
          };
          styles.preview = { 
            backgroundColor: '#FFFFFF',
            border: '3px solid #EF4444',
            borderRadius: '8px'
          };
          styles.details = {
            backgroundColor: '#FFFFFF',
            border: '2px solid #EF4444',
            borderRadius: '8px'
          };
          styles.text = { 
            color: '#DC2626'
          };
          break;
      }
    }

    return styles;
  };

  const renderStyleBox = (style: { id: string; name: string; icon: React.ComponentType<any> }) => {
    const IconComponent = style.icon;
    const variation = styleVariations[style.id];
    const isSelected = selectedStyle === style.id;
    
    return (
      <div
        key={style.id}
        onClick={() => handleStyleClick(style.id)}
        className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}
      >
        <div className="text-center">
          <IconComponent className={`text-2xl mx-auto mb-2 ${
            isSelected ? 'text-blue-600' : 'text-gray-600'
          }`} />
          <span className="text-sm font-medium text-gray-900">{style.name}</span>
          {isSelected && (
            <div className="mt-2 text-xs text-blue-600">
              Style {variation + 1} of 3
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderThemeItem = (theme: Theme, isCustom: boolean = false) => {
    if (theme.isCustom && theme.id === 'create') {
      return (
        <div key={theme.id} className="flex items-center p-3 bg-white border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
            <FaPlus className="text-gray-400" />
          </div>
          <span className="flex-1 text-sm font-medium text-gray-700">{theme.name}</span>
          <FaEllipsisH className="text-gray-400 text-sm cursor-pointer" />
        </div>
      );
    }

    return (
      <div 
        key={theme.id} 
        onClick={() => handleThemeClick(theme.id)}
        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
          selectedTheme === theme.id 
            ? 'bg-blue-50 border-blue-500' 
            : 'bg-white border-gray-200 hover:bg-gray-50'
        }`}
      >
        <div 
          className="w-12 h-12 rounded mr-3"
          style={{ backgroundColor: theme.preview }}
        />
        <span className="flex-1 text-sm font-medium text-gray-900">{theme.name}</span>
        <FaEllipsisH className="text-gray-400 text-sm cursor-pointer hover:text-gray-600" />
      </div>
    );
  };

  const renderQuestionInput = (question: Question, questionIndex: number) => {
    const appliedStyles = getAppliedStyles();
    
    switch (question.type) {
      case 'MCQ':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input 
                  type="radio" 
                  name={`question_${questionIndex}`} 
                  className="mr-2" 
                  style={appliedStyles.questions}
                />
                {option}
              </label>
            ))}
          </div>
        );
      
      case 'CheckBox':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2" 
                  style={appliedStyles.questions}
                />
                {option}
              </label>
            ))}
          </div>
        );
      
      case 'Star':
        const currentRating = starRatings[question.id] || 0;
        return (
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => handleStarClick(question.id, star)}
                className={`text-2xl transition-colors hover:scale-110 transform ${
                  star <= currentRating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <FaStar />
              </button>
            ))}
            {currentRating > 0 && (
              <span className="ml-2 text-sm text-gray-600">
                {currentRating} of 5 stars
              </span>
            )}
          </div>
        );
      
      case 'Slider':
        return (
          <div className="space-y-2">
            <input 
              type="range" 
              min="0" 
              max="10" 
              className="w-full" 
              style={appliedStyles.questions}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        );
      
      case 'Dropdown':
        return (
          <select 
            className="w-full p-2 border border-gray-300 rounded" 
            style={appliedStyles.questions}
          >
            <option value="">Select an option...</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'SingleText':
        return (
          <input 
            type="text" 
            placeholder="Enter your response..." 
            className="w-full p-2 border border-gray-300 rounded" 
            style={appliedStyles.questions}
          />
        );
      
      case 'Comment':
        return (
          <textarea 
            className="w-full p-2 border border-gray-300 rounded" 
            rows={3} 
            placeholder="Enter your comments..."
            style={appliedStyles.questions}
          />
        );
      
      case 'DateTime':
        return (
          <input 
            type="datetime-local" 
            className="w-full p-2 border border-gray-300 rounded" 
            style={appliedStyles.questions}
          />
        );
      
      case 'FileUpload':
        return (
          <div 
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded text-center cursor-pointer hover:border-gray-400"
            style={appliedStyles.questions}
          >
            <div className="text-gray-500">
              <FaImage className="mx-auto mb-2 text-2xl" />
              Click to upload files or drag and drop
            </div>
          </div>
        );
      
      default:
        return (
          <input 
            type="text" 
            placeholder="Response..." 
            className="w-full p-2 border border-gray-300 rounded" 
            style={appliedStyles.questions}
          />
        );
    }
  };

  const renderPreview = () => {
    const appliedStyles = getAppliedStyles();
    
    return (
      <div 
        className="bg-white border border-gray-200 rounded-lg p-6 mb-4" 
        style={{...appliedStyles.preview, ...appliedStyles.text}}
      >
        {appliedStyles.logo && (
          <div className="flex items-center mb-4 pb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <FaImage className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold">Your Company Logo</span>
          </div>
        )}
        
        <h3 className="text-lg font-semibold mb-4">{survey.name}</h3>
        <p className="mb-4 opacity-80">
          {selectedStyle === 'logo' && `Survey with your custom logo displayed at the top (Style ${styleVariations.logo + 1})`}
          {selectedStyle === 'footer' && `Survey with custom footer information (Style ${styleVariations.footer + 1})`}
          {selectedStyle === 'fonts' && `Survey with custom typography (Style ${styleVariations.fonts + 1})`}
          {selectedStyle === 'layout' && `Survey with enhanced spacing and layout (Style ${styleVariations.layout + 1})`}
          {selectedStyle === 'background' && `Survey with gradient background design (Style ${styleVariations.background + 1})`}
          {selectedTheme && `Survey styled with ${standardThemes.find(t => t.id === selectedTheme)?.name || myThemes.find(t => t.id === selectedTheme)?.name} theme`}
          {!selectedStyle && !selectedTheme && "Survey preview with default styling"}
        </p>
        
        <div className="space-y-4">
          {survey.questionList && survey.questionList.length > 0 ? (
            survey.questionList.map((question, index) => (
              <div 
                key={question.id}
                className="border rounded p-4" 
                style={appliedStyles.questions}
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="font-medium">
                    {index + 1}. {question.title}
                  </p>
                  {question.required && (
                    <span className="text-red-500 text-sm ml-2">*</span>
                  )}
                </div>
                {renderQuestionInput(question, index)}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No questions available for this survey
            </div>
          )}
        </div>

        {appliedStyles.footer && (
          <div className="mt-6 pt-4 border-t text-sm text-center opacity-70">
            {appliedStyles.footer}
          </div>
        )}
      </div>
    );
  };

  const appliedStyles = getAppliedStyles();

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Customize Survey - {survey.name}</h1>
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
        {/* Left Panel - Customization Options */}
        <div 
          className="overflow-y-auto bg-white border-r border-gray-200"
          style={{ width: `${splitPosition}%` }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Style</h2>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('theme')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'theme'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Theme
                </button>
              </nav>
            </div>

            {/* Settings Tab Content */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-2 gap-4">
                {styleOptions.map((style) => renderStyleBox(style))}
              </div>
            )}

            {/* Theme Tab Content */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                {/* My Themes Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">My Themes</h3>
                  <div className="space-y-2">
                    {myThemes.map((theme) => renderThemeItem(theme, true))}
                  </div>
                </div>

                {/* Standard Themes Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Standard Themes</h3>
                  <div className="space-y-2">
                    {standardThemes.map((theme) => renderThemeItem(theme))}
                  </div>
                </div>
              </div>
            )}
          </div>
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

        {/* Right Panel - Preview */}
        <div 
          className="overflow-y-auto p-6"
          style={{
            width: `${100 - splitPosition}%`,
            ...appliedStyles.container
          }}
        >
          <div className="max-w-2xl">
            <h2 
              className="text-xl font-semibold mb-6"
              style={appliedStyles.text}
            >
              Preview
            </h2>
            
            {/* Survey Preview */}
            {renderPreview()}
            
            {/* Done Button */}
            <button 
              onClick={onDone}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCustomizer;