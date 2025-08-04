
import type React from "react"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"

interface TopBarProps {
  onSearchToggle: (isVisible: boolean) => void // Changed to onSearchToggle
  onButtonClick: (type: string) => void
  buttons: string[]
}

const TopBar: React.FC<TopBarProps> = ({ onSearchToggle, onButtonClick, buttons }) => {
  const [searchVisible, setSearchVisible] = useState(false)

  const handleSearchClick = () => {
    const newVisibility = !searchVisible
    setSearchVisible(newVisibility)
    onSearchToggle(newVisibility)
  }

  return (
    <div className="flex flex-col md:flex-row justify-start items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <button onClick={handleSearchClick} className="p-2 text-gray-600 hover:text-blue-600">
          <FiSearch size={20} />
        </button>
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
  )
}

export default TopBar
