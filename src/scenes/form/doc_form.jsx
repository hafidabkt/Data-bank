import { Box, Button, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Papa from "papaparse";

const DocForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [setMyFile] = useState(null);

  // Define the columns for the document form
  const columnsConfig = [
    { field: "title", label: "Title", type: "text", required: true },
    {
      field: "department",
      label: "Department",
      type: "select",
      options: ["IT", "HR", "Finance", "Marketing", "Support"],
      required: true,
    },
    {
      field: "type",
      label: "Type",
      type: "select",
      options: ["Report", "Invoice", "Memo", "Policy"],
      required: true,
    },
    {
      field: "tags",
      label: "Tags",
      type: "select",
      options: ["Urgent", "Confidential", "Public"],
      required: true,
    },
    { field: "version", label: "Version", type: "text", required: true },
    {
      field: "accessControl",
      label: "Access Control",
      type: "select",
      options: ["Admin", "User", "Guest"],
      required: true,
    },
    { field: "expirationDate", label: "Expiration Date", type: "date", required: false },
    {
      field: "status",
      label: "Status",
      type: "select",
      options: ["approved", "pending", "refused"],
      required: true,
    },
  ];

  // Generate initial values dynamically
  const initialValues = columnsConfig.reduce((acc, column) => {
    acc[column.field] = "";
    return acc;
  }, {});

  // Generate validation schema dynamically
  const checkoutSchema = yup.object().shape(
    columnsConfig.reduce((acc, column) => {
      if (column.required) {
        acc[column.field] = yup.string().required("required");
      }
      return acc;
    }, {})
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    setMyFile(file);

    Papa.parse(file, {
      complete: async (result) => {
        const documents = result.data.map((row) =>
          columnsConfig.reduce((acc, column, index) => {
            acc[column.field] = row[index];
            return acc;
          }, {})
        );

        try {
          await axios.post("http://localhost:5000/api/add-multiple-documents", { documents });
          alert("Documents added successfully!");
        } catch (error) {
          console.error("Error adding documents:", error);
          alert("Failed to add documents.");
        }
      },
      header: false,
    });
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CREATE DOCUMENT" subtitle="Create a New Document" />
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
              Upload File Here
              <input
                type="file"
                accept=".pdf,.docx,.doc,.csv,.txt" // Accept specific file types
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          </Box>
        </Box>
      </Box>

      <Formik
        onSubmit={async (values, { resetForm }) => {
          try {
            await axios.post("http://localhost:5000/api/add-document", values);
            alert("Document created successfully!");
            resetForm();
          } catch (error) {
            console.error("Error creating document:", error);
            alert("Failed to create document.");
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
              {columnsConfig.map((column) =>
                column.type === "select" ? (
                  <TextField
                    key={column.field}
                    fullWidth
                    variant="filled"
                    select
                    label={column.label}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[column.field]}
                    name={column.field}
                    error={!!touched[column.field] && !!errors[column.field]}
                    helperText={touched[column.field] && errors[column.field]}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {column.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    key={column.field}
                    fullWidth
                    variant="filled"
                    type={column.type}
                    label={column.label}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[column.field]}
                    name={column.field}
                    error={!!touched[column.field] && !!errors[column.field]}
                    helperText={touched[column.field] && errors[column.field]}
                    sx={{ gridColumn: "span 2" }}
                  />
                )
              )}
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
                Create New Document
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DocForm;