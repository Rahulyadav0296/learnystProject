import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import React from "react";

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
}
interface EditActionButtonProps {
  handleOpen: () => void;
  handleEdit: () => void;
  celebrity: Celebrity;
}

const EditActionButton: React.FC<EditActionButtonProps> = ({
  handleOpen,
  handleEdit,
  celebrity,
}) => {
  const age = getAge(celebrity.dob);
  const isUnderAge = age < 18;

  return (
    <div>
      <button onClick={handleOpen} className="delete-button">
        <DeleteIcon sx={{ fontSize: 40 }} />
      </button>
      <button
        onClick={handleEdit}
        className={`${isUnderAge ? "edit-disable-button" : "edit-button"}`}
        disabled={isUnderAge}
      >
        <ModeEditOutlineIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
};

export default EditActionButton;
