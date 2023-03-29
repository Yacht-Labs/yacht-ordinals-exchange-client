import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
// font-bold py-2 px-4 rounded
const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-blue-700 text-white  ${className} bg-blue-500`}
    >
      {children}
    </button>
  );
};

export default Button;
