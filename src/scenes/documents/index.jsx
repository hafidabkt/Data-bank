import { Box, useTheme ,Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import EditModal from "../global/modal";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/documents")
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((item, index) => ({
          ...item,
          id: item.id || item._id || index, 
        }));
        setRows(formattedData);
      })
      .catch(error => console.error("Error:", error));
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedDoc, setEditedUser] = useState({});
  const navigate = useNavigate();
  const handleMenuOpen = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    if (selectedDoc) {
      setEditedUser(selectedDoc);
      setOpenModal(true);
    }
    handleMenuClose();
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSave = () => {
    console.log("User updated:", editedDoc);
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedDoc, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    console.log("Delete user", selectedDoc?.id);
    handleMenuClose();
  };

  const handleView = () => {
  if (selectedDoc) {
    navigate(`/document_details/${selectedDoc.id}`, { state: { document: selectedDoc } });
  }
  handleMenuClose();
};

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "type", headerName: "Type", flex: 0.5 },
    { field: "size", headerName: "Size", flex: 1 },
    { field: "tags", headerName: "Tags", flex: 0.5 },
    { field: "version", headerName: "Version", flex: 0.5 },
    { field: "accessControl", headerName: "Access", flex: 1 },
    { field: "expirationDate", headerName: "Expiration", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1.5,
      renderCell: (params) => {
        let color, icon, text;

        switch (params.value) {
          case "approved":
            color = colors.greenAccent[500];
            icon = <CheckCircleIcon sx={{ color }} />;
            text = "Approved";
            break;
          case "pending":
            color = colors.blueAccent[500];
            icon = <HourglassEmptyIcon sx={{ color }} />;
            text = "Pending";
            break;
          case "refused":
            color = colors.redAccent[500];
            icon = <CancelIcon sx={{ color }} />;
            text = "Refused";
            break;
          default:
            color = "gray";
            text = "Unknown";
        }

        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            p="5px 10px"
            borderRadius="4px"
            sx={{ backgroundColor: `${color}.100` }}
          >
            {icon}
            <Typography color={color} fontWeight="bold">
              {text}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedDoc?.id === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleView}>See</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box  sx={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Documents" subtitle="Manage your Documents" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/doc_form")}
          >
            <NoteAddIcon sx={{ mr: "10px" }} />
            Add New Document
          </Button>
        </Box>
        </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
      <EditModal
        open={openModal}
        onClose={handleModalClose}
        columns={columns}
        editedData={editedDoc}
        onChange={handleInputChange}
        onSave={handleSave}
        color= {colors.primary[900]}
      />
    </Box>
  );
};

export default Documents;
