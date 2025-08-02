import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchIconProps {
  onClick: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ onClick }) => {
  return (
    <div className="mr-4 cursor-pointer" onClick={onClick}>
      <FiSearch className="text-gray-600" size={19} />
    </div>
  );
};

export default SearchIcon; 