import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useTheme,
  Paper,
  Container,
} from "@mui/material";
import UserMetadataManagement from "./user_metadata";
import { tokens } from "../../theme";
import DocumentMetadataManagement from "./doc_metadata";

const ManagementScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const managementOptions = [
    { name: "Manage Users", component: <UserMetadataManagement /> },
    { name: "Manage Documents", component: <DocumentMetadataManagement /> },
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
        {selectedOption === null ? (
          <>
            <Typography variant="h4" mb={3} align="center">
              System Management
            </Typography>
            <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {managementOptions.map((option, index) => (
                <ListItem key={index} sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => setSelectedOption(option.component)}
                    sx={{
                      width: "100%",
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "12px 20px",
                    }}
                  >
                    {option.name}
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                mb: 3,
              }}
              onClick={() => setSelectedOption(null)}
            >
              Back to Management Options
            </Button>
            <Box mt={3}>{selectedOption}</Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ManagementScreen;
