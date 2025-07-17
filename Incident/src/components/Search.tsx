import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchIconProps {
  onClick: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ onClick }) => {
  return (
    <div className="mr-4 cursor-pointer" onClick={onClick}>
      <FiSearch className="text-gray-400" size={18} />
    </div>
  );
};

export default SearchIcon;
