import { Box, useTheme, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"; 
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import EditModal from "../global/modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
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

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    if (selectedUser) {
      setEditedUser(selectedUser);
      setOpenModal(true);
    }
    handleMenuClose();
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSave = () => {
    console.log("User updated:", editedUser);
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    console.log("Delete user", selectedUser?.id);
    handleMenuClose();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "position", headerName: "Position", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1.5,
      renderCell: (params) => {
        let color, icon, text;

        switch (params.value) {
          case "Active":
            color = colors.greenAccent[500];
            icon = <CheckCircleIcon sx={{ color }} />;
            text = "Active";
            break;
          case "Inactive":
            color = colors.blueAccent[500];
            icon = <HourglassEmptyIcon sx={{ color }} />;
            text = "Inactive";
            break;
          case "Banned":
            color = colors.redAccent[500];
            icon = <CancelIcon sx={{ color }} />;
            text = "Banned";
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
    { field: "createdAt", headerName: "Date", flex: 1 },
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
            open={Boolean(anchorEl) && selectedUser?.id === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Users" subtitle="Manage your Team" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/user_form")}
          >
            <PersonAddIcon sx={{ mr: "10px" }} />
            Add New User
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
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
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>

      {/* Edit Modal */} 
      <EditModal
        open={openModal}
        onClose={handleModalClose}
        columns={columns}
        editedData={editedUser}
        onChange={handleInputChange}
        onSave={handleSave}
        color={colors.primary[900]} // Blue color
      />
    </Box>
  );
};

export default Users;
