import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";

interface ActionButtonProps {
  handleCancel: () => void;
  handleSave: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  handleCancel,
  handleSave,
}) => {
  return (
    <div>
      <button onClick={handleCancel} className="cancel-button">
        <CancelIcon sx={{ fontSize: 40 }} />
      </button>
      <button onClick={handleSave} className="save-button">
        <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
};

export default ActionButton;
