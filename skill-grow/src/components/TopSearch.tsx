import React, { useState } from "react";
import { Search } from "lucide-react";

interface TopSearchProps {
  onSearch: () => void; // toggle function for filter row
  onButtonClick: (type: string) => void;
  buttons: string[];
  searchValue: string;
  placeholder: string;
  onSearchChange: (value: string) => void;
}

const TopSearch: React.FC<TopSearchProps> = ({
  onSearch,
  onButtonClick,
  buttons,
  searchValue,
  placeholder,
  onSearchChange,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchClick = () => {
    setShowSearchInput((prev) => !prev);
    onSearch(); // optional: keep if you want the original filter row toggle
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handleSearchClick}
          className="p-2 text-gray-600 hover:text-blue-600"
        >
          <Search size={25} />
        </button>

        {showSearchInput && (
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none"
          />
        )}
      </div>

      <div className="flex gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => onButtonClick(btn)}
            className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer hover:bg-gray-50"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopSearch;
