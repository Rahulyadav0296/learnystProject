import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./Form.css";

interface FormProps {
  search: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, search, onChange }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          className="search-input"
          value={search}
          placeholder={"Enter Celebrity Name.."}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default Form;
