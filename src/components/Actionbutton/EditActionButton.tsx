import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import React from "react";
interface EditActionButtonProps {
  handleOpen: () => void;
  handleEdit: () => void;
}

const EditActionButton: React.FC<EditActionButtonProps> = ({
  handleOpen,
  handleEdit,
}) => {
  return (
    <div>
      <button onClick={handleOpen} className="delete-button">
        <DeleteIcon sx={{ fontSize: 40 }} />
      </button>
      <button onClick={handleEdit} className="edit-button">
        <ModeEditOutlineIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
};

export default EditActionButton;
