import { Box, Button, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState } from "react";
import Papa from "papaparse";

const UserForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [csvFile, setCsvFile] = useState(null);
  
  const handleFileUpload = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleUploadCSV = () => {
    if (!csvFile) {
      alert("Please select a CSV file first.");
      return;
    }

    Papa.parse(csvFile, {
      complete: async (result) => {
        const users = result.data.map((row) => ({
          firstName: row[0],
          lastName: row[1],
          email: row[2],
          password: row[3],
          contact: row[4],
          department: row[5],
          position: row[6],
        }));

        try {
          await axios.post("http://localhost:5000/api/add-multiple-users", { users });
          alert("Users added successfully!");
        } catch (error) {
          console.error("Error adding users:", error);
          alert("Failed to add users.");
        }
      },
      header: false,
    });
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
        <label 
          style={{
            display: "inline-block",
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center",
              transition: "background 0.3s",
            padding: "10px 20px",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = colors.greenAccent[500])}
          onMouseLeave={(e) => (e.target.style.backgroundColor = colors.greenAccent[700])}
        >
          Upload CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{
              display: "none", // Hide default input
            }}
          />
        </label>

          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleUploadCSV}
          >
            <GroupAddIcon sx={{ mr: "10px" }} />
            Add Many Users
            </Button>
            </Box>
        </Box>
      </Box>

      <Formik
        onSubmit={async (values, { resetForm }) => {
          try {
            await axios.post("http://localhost:5000/api/send-email", values);
            alert("User created! Email sent.");
            resetForm();
          } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email.");
          }
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              >
                {["IT", "HR", "Finance", "Marketing", "Support"].map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[500],
                  },
                }}
                variant="contained"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: colors.greenAccent[500],
                  },
                }}
                variant="contained"
              >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation Schema
const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("required"),
  contact: yup.string().required("required"),
  department: yup.string().required("required"),
  position: yup.string().required("required"),
});

// Initial Values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  contact: "",
  department: "",
  position: "",
};

export default UserForm;
