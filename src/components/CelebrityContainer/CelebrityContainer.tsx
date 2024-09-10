import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useRef, useState } from "react";
import "./CelebrityContainer.css";

interface Celebrity {
  picture: string;
  first: string;
  last: string;
}

interface CelebrityContainerProps {
  editable: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  celebrityDetails: Celebrity;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    id: number
  ) => void;
  handleArrow: () => void;
  collapse: boolean;
}

const CelebrityContainer: React.FC<CelebrityContainerProps> = ({
  editable,
  onImageChange,
  celebrityDetails,
  handleInputChange,
  handleArrow,
  collapse,
}) => {
  const [localFullName, setLocalFullName] = useState<string>(
    `${celebrityDetails.first} ${celebrityDetails.last}`
  );

  const [imagePreview, setImagePreview] = useState<string>(
    celebrityDetails.picture
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handle iamge upload here
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const splitFullName = (fullName: string): [string, string] => {
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts.shift() || "";
    const lastName = nameParts.join(" ");
    return [firstName, lastName];
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = e.target.value;
    setLocalFullName(fullName);

    const [firstName, lastName] = splitFullName(fullName);

    handleInputChange(
      {
        target: {
          name: "first",
          value: firstName,
        },
      } as React.ChangeEvent<HTMLInputElement>,
      0
    );

    handleInputChange(
      {
        target: {
          name: "last",
          value: lastName,
        },
      } as React.ChangeEvent<HTMLInputElement>,
      0
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // create previw URL here
      setImagePreview(imageURL);
      onImageChange(e);
    }
  };

  return (
    <div className="celebrity-header">
      {editable ? (
        <>
          <input
            type="file"
            name="picture"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <img
            src={celebrityDetails.picture}
            alt={celebrityDetails.first}
            className="celebrity-image"
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        </>
      ) : (
        <img
          src={imagePreview}
          alt={localFullName}
          className="celebrity-image"
        />
      )}

      <div className="celebrity-name-container">
        {editable ? (
          <div className="celebrity-name-summary">
            <input
              type="text"
              value={localFullName} // Use local state here
              onChange={handleNameChange}
              className="editable-input-name"
            />
          </div>
        ) : (
          <div className="celebrity-name-summary">
            <h1 className="celebrity-name">{localFullName}</h1>
          </div>
        )}
      </div>
      <div>
        <button onClick={handleArrow} className="collapse-button">
          {collapse ? (
            <KeyboardArrowUpIcon sx={{ fontSize: "40px" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ fontSize: "40px" }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default CelebrityContainer;
