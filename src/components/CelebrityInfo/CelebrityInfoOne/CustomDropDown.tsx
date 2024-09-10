import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";
import "./CustomDropDown.css";

interface CustomDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`custom-dropdown ${isOpen ? "isOpen" : ""}`}>
      <div className="custom-dropdown-selected" onClick={toggleDropdown}>
        {selectedOption}
        <button className="collapse-button">
          {isOpen ? (
            <KeyboardArrowUpIcon sx={{ fontSize: "40px" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ fontSize: "40px" }} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="custom-dropdown-options">
          {options.map((option) => (
            <div
              key={option}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
