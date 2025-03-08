import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const optionFields = {
  department: ["HR", "IT", "Finance", "Marketing"], // Example values
  type: ["Report", "Invoice", "Memo"],
  tags: ["Urgent", "Confidential", "Public"],
  accessControl: ["Admin", "User", "Guest"],
  status: ["approved", "pending", "refused"],
};

const EditModal = ({
  open,
  onClose,
  columns = [],
  editedData = {},
  onChange,
  onSave,
  color,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        p={3}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: color || "white",
          boxShadow: 24,
          p: 4,
          width: 400,
          maxHeight: "80vh",
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Data
        </Typography>

        {columns
          .filter((col) => col.field !== "actions") // Exclude "actions" column
          .map((col) =>
            optionFields[col.field] ? (
              <FormControl fullWidth margin="normal" key={col.field}>
                <InputLabel id={`${col.field}-label`}>
                  {col.headerName}
                </InputLabel>
                <Select
                  labelId={`${col.field}-label`}
                  id={col.field}
                  value={editedData[col.field] || ""} // Use previous value or empty if undefined
                  name={col.field}
                  onChange={onChange}
                  label={col.headerName}
                >
                  {optionFields[col.field].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                key={col.field}
                fullWidth
                label={col.headerName}
                name={col.field}
                value={editedData[col.field] || ""} // Use previous value or empty if undefined
                onChange={onChange}
                margin="normal"
              />
            )
          )}

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onSave}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;