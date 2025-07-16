import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div 
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
        isOn ? 'bg-green-500' : 'bg-gray-300'
      }`}
      onClick={handleToggle}
    >
      <div 
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;