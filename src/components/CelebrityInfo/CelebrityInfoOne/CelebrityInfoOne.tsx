import React, { useState } from "react";
import "./CelebrityInfoOne.css";
import CustomDropdown from "./CustomDropDown";

const getAge = (dateString: string): number => {
  const today = new Date();
  const birthDay = new Date(dateString);
  let age = today.getFullYear() - birthDay.getFullYear();
  const month = today.getMonth() - birthDay.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDay.getDate())) {
    age--;
  }
  return age;
};

interface Celebrity {
  dob: string;
  gender: string;
  country: string;
}

interface CelebrityInfoOneProps {
  editable: boolean;
  celebrityDetails: Celebrity;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleGenderChange: (gender: string) => void;
}

const CelebrityInfoOne: React.FC<CelebrityInfoOneProps> = ({
  editable,
  celebrityDetails,
  handleInputChange,
  handleGenderChange,
}) => {
  const [age, setAge] = useState(getAge(celebrityDetails.dob));
  const [country, setCountry] = useState(celebrityDetails.country);
  const [gender, setGender] = useState(celebrityDetails.gender);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(e.target.value, 10) || 0; // Default to 0 if NaN
    setAge(newAge);

    const today = new Date();
    const birthYear = today.getFullYear() - newAge;
    const newDob = new Date(
      today.setFullYear(birthYear, today.getMonth(), today.getDate())
    )
      .toISOString()
      .split("T")[0];

    handleInputChange({
      target: {
        name: "dob",
        value: newDob,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="celebrity-info-container">
      <div className="celebrity-info-labels">
        <label className="celebrity-info-label">Age</label>
        <label className="celebrity-info-label">Gender</label>
        <label className="celebrity-info-label">Country</label>
      </div>
      {editable ? (
        <div className="celebrity-info-inputs">
          <input
            type="number"
            value={age || ""}
            onChange={handleAgeChange}
            name="age"
            className="editable-input-date"
          />
          <CustomDropdown
            selectedOption={gender}
            onSelect={(selectedGender) => {
              setGender(selectedGender);
              handleGenderChange(selectedGender);
            }}
            options={[
              "male",
              "female",
              "transgender",
              "Rather not say",
              "other",
            ]}
          />
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
            }}
            name="country"
            className="editable-input-country"
          />
        </div>
      ) : (
        <div className="celebrity-info-values">
          <span className="celebrity-info-value">{age}</span>
          <span className="celebrity-info-value">{gender}</span>
          <span className="celebrity-info-value">{country}</span>
        </div>
      )}
    </div>
  );
};

export default CelebrityInfoOne;
