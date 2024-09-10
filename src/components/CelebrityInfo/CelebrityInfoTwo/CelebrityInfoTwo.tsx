import React, { useState } from "react";
import "./CelebrityInfoTwo.css";

interface Celebrity {
  description: string;
}

interface CelebrityInfoTwoProps {
  editable: boolean;
  celebrityDetails: Celebrity;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CelebrityInfoTwo: React.FC<CelebrityInfoTwoProps> = ({
  editable,
  celebrityDetails,
  handleInputChange,
}) => {
  const [description, setDescription] = useState(celebrityDetails.description);

  return (
    <div className="celebrity-two-info">
      <p>Description</p>
      {editable ? (
        <textarea
          value={description || ""}
          onChange={(e) => {
            setDescription(e.target.value);
            handleInputChange(e as React.ChangeEvent<HTMLTextAreaElement>);
          }}
          name="description"
          className="editable-textarea"
        />
      ) : (
        <span className="celebrity-two-span">{description}</span>
      )}
    </div>
  );
};

export default CelebrityInfoTwo;
