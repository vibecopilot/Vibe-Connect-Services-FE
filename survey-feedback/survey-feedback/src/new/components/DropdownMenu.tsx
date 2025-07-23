import React, { useRef, useEffect } from "react";
import type { ReactNode } from "react";

type DropdownItem = {
  label: string;
  onClick: () => void;
  content?: ReactNode; // Add support for custom content
};

type DropdownMenuProps = {
  items: DropdownItem[];
  trigger: ReactNode;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  open: boolean;
  onToggle: (open: boolean) => void;
  className?: string;
  disabled?: boolean;
};

const positionClassMap = {
  "bottom-left": "top-full left-0",
  "bottom-right": "top-full right-0",
  "top-left": "bottom-full left-0",
  "top-right": "bottom-full right-0",
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  trigger,
  position = "bottom-left",
  open,
  onToggle,
  className = "",
  disabled = false,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onToggle(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onToggle]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div onClick={() => !disabled && onToggle(!open)}>{trigger}</div>
      {open && (
        <div
          className={`absolute z-50 mt-1 ${positionClassMap[position]} ${className}`}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="cursor-pointer hover:bg-gray-100 transition-colors duration-150"
              onClick={(e) => {
                e.stopPropagation(); // Prevent dropdown from closing when clicking on checkbox
                item.onClick();
                // Don't close dropdown automatically for checkbox items
                if (!item.content) {
                  onToggle(false);
                }
              }}
            >
              {item.content || (
                <div className="px-4 py-2 text-sm text-gray-700">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;