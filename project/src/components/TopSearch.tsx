import React from "react";
import { FiSearch } from "react-icons/fi";

interface TopBarProps {
  onSearch: () => void;
  onButtonClick: (type: string) => void;
  buttons: string[];
  isSearchOpen?: boolean;
  searchTerm?: string;
  placehoder?: string;
  setSearchTerm?: (val: string) => void;
}

const TopSearch: React.FC<TopBarProps> = ({
  onSearch,
  onButtonClick,
  buttons,
  isSearchOpen,
  searchTerm,
  placehoder,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-start items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onSearch}
          className="p-2 text-gray-600 hover:text-blue-600"
        >
          <FiSearch size={20} />
        </button>
        {isSearchOpen && setSearchTerm !== undefined && (
          <input
            type="text"
            placeholder={placehoder || "Search..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => onButtonClick(btn)}
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