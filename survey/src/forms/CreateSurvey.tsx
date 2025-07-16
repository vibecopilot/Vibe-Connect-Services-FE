import React, { useState } from "react";
import { FaRegFileAlt, FaCopy, FaRegStar } from "react-icons/fa";
import ExistingSurvey from "./ExistingSurvey";
import PopularTemplates from "./PopularTemplates";
import AddSurvey from "./AddSurvey";

interface Props {
  onBack: () => void;
  onStartFromScratch: () => void;
}

const CreateSurvey: React.FC<Props> = ({ onBack, onStartFromScratch }) => {
  const [showExistingSurvey, setShowExistingSurvey] = useState(false);
  const [showPopularTemplates, setShowPopularTemplates] = useState(false);
  const [showAddSurvey, setShowAddSurvey] = useState(false);

  

  // If showing popular templates component, render it instead
  if (showPopularTemplates) {
    return <PopularTemplates onBack={() => setShowPopularTemplates(false)} />;
  }

  const handleAddSurveyClose = () => {
    setShowAddSurvey(false);
  };

  const handleExisitingSurveyClose = () => {
    setShowExistingSurvey(false);
  };

  const handleAddSurveySave = (surveyData: any) => {
    // Handle save logic here
    console.log("Survey saved:", surveyData);
    setShowAddSurvey(false);
    // You can call onStartFromScratch or any other callback here
    onStartFromScratch();
  };

  const cards = [
    {
      icon: <FaRegFileAlt className="text-blue-600 text-4xl mb-4" />,
      title: "Start from Scratch",
      description:
        "Begin with a blank survey or form then add your questions, texts and images.",
      onClick: () => setShowAddSurvey(true),
    },
    {
      icon: <FaCopy className="text-green-600 text-4xl mb-4" />,
      title: "Copy an existing survey",
      description: "Choose a survey, make a copy, edit as needed.",
      onClick: () => {
        setShowExistingSurvey(true);
      },
    },
    {
      icon: <FaRegStar className="text-yellow-600 text-4xl mb-4" />,
      title: "Pick a popular template",
      description:
        "Ask the right questions and save time with a template built for your situation.",
      onClick: () => {
        setShowPopularTemplates(true);
      },
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Heading and Back button */}
      <div className="w-full relative mb-6">
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-semibold">Create Survey</h2>
        </div>
        <div className="absolute right-4 top-0">
          <button
            onClick={onBack}
            className="text-sm text-blue-600 border border-blue-600 rounded px-3 py-1 hover:bg-blue-50"
          >
            Back
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="w-60 h-60 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow cursor-pointer text-center p-4 flex flex-col items-center justify-center"
          >
            {card.icon}
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>

      {/* AddSurvey Popup Modal */}
      {showAddSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
            onClick={handleAddSurveyClose}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <AddSurvey
              onBack={handleAddSurveyClose}
              onSave={handleAddSurveySave}
            />
          </div>
        </div>
      )}

      {showExistingSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
            onClick={handleExisitingSurveyClose}
          />

          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <ExistingSurvey onBack={handleExisitingSurveyClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSurvey;
