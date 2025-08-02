import React from "react";
import { FiSearch } from "react-icons/fi";

interface ButtonConfig {
  label: string;
  icon?: React.ReactNode;
}

interface TopBarProps {
  onButtonClick: (type: string) => void;
  buttons: (string | ButtonConfig)[];
  onSearchIconClick?: () => void; // Only this prop is needed now
}

const TopBar: React.FC<TopBarProps> = ({ 
  onButtonClick, 
  buttons,
  onSearchIconClick
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-start items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onSearchIconClick}
          className="p-2 text-gray-600 hover:text-blue-600"
        >
          <FiSearch size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {buttons.map((btn, index) => {
          const isObject = typeof btn === "object" && btn !== null;
          const label = isObject ? btn.label : btn;
          const icon = isObject ? btn.icon : null;

          return (
            <button
              key={index}
              onClick={() => onButtonClick(label)}
              className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer flex items-center"
            >
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopBar;