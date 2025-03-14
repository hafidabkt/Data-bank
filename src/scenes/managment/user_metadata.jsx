import React, { useState } from "react";
import { tokens } from "../../theme";
import {
Box,
Button,
TextField,
Select,
MenuItem,
FormControl,
InputLabel,
Typography,
IconButton,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
useTheme
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columnTypes = ["text", "date", "menu"];
const UserMetadataManagement = () => {
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", type: "text" },
    { field: "fullName", headerName: "Full Name", type: "text" },
    { field: "username", headerName: "Username", type: "text" },
    { field: "email", headerName: "Email", type: "text" },
    { field: "phone", headerName: "Phone", type: "text" },
    { field: "role", headerName: "Role", type: "menu", options: ["Admin", "User"] },
    { field: "createdAt", headerName: "Date", type: "date" },
  ]);

  const [newColumn, setNewColumn] = useState({ field: "", headerName: "", type: "text", options: [] });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrEditColumn = () => {
    if (editingIndex !== null) {
      const updatedColumns = [...columns];
      updatedColumns[editingIndex] = newColumn;
      setColumns(updatedColumns);
      setEditingIndex(null);
    } else {
      setColumns([...columns, newColumn]);
    }
    setNewColumn({ field: "", headerName: "", type: "text", options: [] });
  };

  const handleDeleteColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleEditColumn = (index) => {
    setNewColumn(columns[index]);
    setEditingIndex(index);
    };
const theme = useTheme();
const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
      <Typography variant="h4" mb={2}>Manage User Metadata</Typography>
      
      {/* Form for Adding or Editing Columns */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Field Name"
          value={newColumn.field}
          onChange={(e) => setNewColumn({ ...newColumn, field: e.target.value })}
        />
        <TextField
          label="Header Name"
          value={newColumn.headerName}
          onChange={(e) => setNewColumn({ ...newColumn, headerName: e.target.value })}
        />
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            value={newColumn.type}
            onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value, options: [] })}
          >
            {columnTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {newColumn.type === "menu" && (
          <TextField
            label="Options (comma-separated)"
            value={newColumn.options.join(", ")}
            onChange={(e) =>
              setNewColumn({ ...newColumn, options: e.target.value.split(", ") })
            }
          />
        )}
        <Button  sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              }}
                  onClick={handleAddOrEditColumn}>{editingIndex !== null ? "Update" : "Add"} Column</Button>
      </Box>

      {/* Table Displaying Current Columns */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Header Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.map((col, index) => (
              <TableRow key={col.field}>
                <TableCell>{col.field}</TableCell>
                <TableCell>{col.headerName}</TableCell>
                <TableCell>{col.type}</TableCell>
                <TableCell>{col.options?.join(", ") || "N/A"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditColumn(index)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteColumn(index)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserMetadataManagement;
