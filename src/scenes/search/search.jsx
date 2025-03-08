import React, { useState } from "react";
import { Button, Box, TextField,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Searchbar = () => {
  const [searchMode, setSearchMode] = useState("metadata"); // "metadata" or "text"
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSearch = () => {
    // Simulated search results - Replace with API call
    const results = [
      { id: 1, title: "Document A", author: "John Doe", createdAt: "2024-02-27" },
      { id: 2, title: "Document B", author: "Jane Smith", createdAt: "2024-02-26" },
    ];
    setSearchResults(results);
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
  ];

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
      <Header title="Search" subtitle="Advanced Search" />

      {/* Search Mode Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button
          variant={searchMode === "metadata" ? "contained" : "outlined"}
          onClick={() => setSearchMode("metadata")}
          sx={{ backgroundColor: searchMode === "metadata" ? colors.blueAccent[500] : "transparent", color: colors.grey[100] }}
        >
          Search by Metadata
        </Button>
        <Button
          variant={searchMode === "text" ? "contained" : "outlined"}
          onClick={() => setSearchMode("text")}
          sx={{ backgroundColor: searchMode === "text" ? colors.blueAccent[500] : "transparent", color: colors.grey[100] }}
        >
          Search in Document Text
        </Button>
      </Box>

      {/* Search Input */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Enter ${searchMode} search query...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Search Results */}
      <Box sx={{ height: "60vh", backgroundColor: colors.primary[400], borderRadius: "8px" }}>
        <DataGrid
          rows={searchResults}
          columns={columns}
          pageSize={5}
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
            "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
          }}
        />
      </Box>
    </Box>
  );
};

export default Searchbar;