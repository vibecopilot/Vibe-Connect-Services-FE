import React from "react";
import { FiSearch } from "react-icons/fi";

interface TopSearchProps {
  searchActive: boolean;
  onSearchToggle: () => void;
  onButtonClick: (type: string) => void;
  buttons: React.ReactNode[];
}

const TopSearch: React.FC<TopSearchProps> = ({
  searchActive,
  onSearchToggle,
  onButtonClick,
  buttons,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-start items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onSearchToggle}
          className={`p-2 ${searchActive ? "text-blue-600" : "text-gray-600"} hover:text-blue-600`}
        >
          <FiSearch size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => onButtonClick(typeof btn === 'string' ? btn : idx.toString())}
            className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopSearch;