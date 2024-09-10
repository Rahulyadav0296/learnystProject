import ClearIcon from "@mui/icons-material/Clear";
import { Box, Modal } from "@mui/material";
import React from "react";
import "./Modal.css";

interface ModalBoxProps {
  open: boolean;
  handleDelete: () => void;
  handleClose: () => void;
  onClose: () => void;
}

const ModalBox: React.FC<ModalBoxProps> = ({
  open,
  handleDelete,
  handleClose,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-container">
        <Box className="modal-header">
          <p>Are you sure you want to delete?</p>
          <button onClick={handleClose} className="close-button">
            <ClearIcon />
          </button>
        </Box>
        <Box className="modal-actions">
          <button onClick={handleClose} className="cancel-button-modal">
            Cancel
          </button>
          <button className="delete-button-modal" onClick={handleDelete}>
            Delete
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalBox;
