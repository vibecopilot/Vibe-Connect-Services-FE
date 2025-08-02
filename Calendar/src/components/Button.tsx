// components/Button.tsx
import React from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "light";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-1 rounded text-sm font-medium transition duration-200";
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "bg-[#213A8F] text-white hover:bg-[#1a2f70]";
      break;
    case "secondary":
      variantStyles = "bg-[#e0e0e0] text-gray-800";
      break;
    case "light":
      variantStyles = "bg-[#F2F4F7] text-gray-700 border border-gray-400";
      break;
  }

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${disabledStyles}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
