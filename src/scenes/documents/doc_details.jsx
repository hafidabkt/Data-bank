import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";

const DocumentDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const navigate = useNavigate();
  const document = location.state?.document;

  // Mock data for versions and comments
  const [versions, setVersions] = useState([
    { id: 1, version: "1.0", date: "2023-10-01" },
    { id: 2, version: "2.0", date: "2023-10-05" },
  ]);
  const [selectedVersion, setSelectedVersion] = useState(versions[0].id);
  const [comments, setComments] = useState([
    { id: 1, text: "This is a great document!", author: "Admin", date: "2023-10-02" },
    { id: 2, text: "Needs some revisions.", author: "User", date: "2023-10-03" },
  ]);
  const [newComment, setNewComment] = useState("");

  if (!document) {
    return <Typography variant="h6">No document selected.</Typography>;
  }

  // Get document type icon
  const getDocumentTypeIcon = (type) => {
    switch (type) {
      case "PDF":
        return <PictureAsPdfIcon />;
      case "DOCX":
        return <ArticleIcon />;
      default:
        return <DescriptionIcon />;
    }
  };

  // Handle version change
  const handleVersionChange = (event) => {
    const versionId = event.target.value;
    setSelectedVersion(versionId);
    navigate(`/document/version/${versionId}`);
  };

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        text: newComment,
        author: "Current User", // Replace with actual user
        date: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  // Handle document actions (approve, refuse, ask for revision)
  const handleAction = (action) => {
    console.log(`Document ${document.id} ${action}`);
    alert(`Document ${action}d successfully!`);
  };

  // Handle viewing the document
  const handleViewDocument = () => {
    window.open(document.fileUrl, "_blank"); // Replace `fileUrl` with the actual document URL
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Documents" subtitle="Details" />
        <Box>
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={handleViewDocument}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[500], // Hover color
              },
            }}
          >
            View Document
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          padding: "20px",
          borderRadius: "4px",
          marginTop: "20px",
        }}
      >
        {/* Document Type Icon */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          {getDocumentTypeIcon(document.type)}
          <Typography variant="h6" color={colors.greenAccent[500]}>
            {document.title}
          </Typography>
        </Box>
        {/* Document Details and Actions */}
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Document Details */}
          <Box sx={{ flex: 1, minWidth: "300px", backgroundColor: colors.grey[900], padding: "20px", borderRadius: "10px" }}>
            <Typography variant="body1" gutterBottom>
              <strong>Author:</strong> {document.author}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Created At:</strong> {document.createdAt}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Department:</strong> {document.department}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Type:</strong> {document.type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Size:</strong> {document.size}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Tags:</strong> {document.tags}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Version:</strong> {document.version}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Access Control:</strong> {document.accessControl}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Expiration Date:</strong> {document.expirationDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Status:</strong> {document.status}
            </Typography>

            {/* Versions Section */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Versions
              </Typography>
              <Select
                fullWidth
                value={selectedVersion}
                onChange={handleVersionChange}
              >
                {versions.map((version) => (
                  <MenuItem key={version.id} value={version.id}>
                    Version {version.version} - {version.date}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          {/* Action Buttons and Comments Section */}
          <Box sx={{ flex: 1, minWidth: "300px", padding: "20px", borderRadius: "10px" }}>
            {/* Action Buttons */}
            <Box display="flex" gap={2} mt={3} flexWrap="wrap">
              <Button
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: colors.greenAccent[500], // Hover color
                  },
                }}
                variant="contained"
                startIcon={<CheckCircleIcon />}
                onClick={() => handleAction("approve")}
              >
                Approve
              </Button>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[600],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[400], // Hover color
                  },
                }}
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => handleAction("ask for revision")}
              >
                Ask for Revision
              </Button>
              <Button
                sx={{
                  backgroundColor: colors.redAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: colors.redAccent[500], // Hover color
                  },
                }}
                variant="contained"
                startIcon={<NotInterestedIcon />}
                onClick={() => handleAction("refuse")}
              >
                Refuse
              </Button>
            </Box>

            {/* Comments Section */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              <List>
                {comments.map((comment) => (
                  <ListItem key={comment.id}>
                    <ListItemText
                      primary={comment.text}
                      secondary={`By ${comment.author} on ${comment.date}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Box mt={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    "&:hover": {
                      backgroundColor: colors.blueAccent[500], // Hover color
                    },
                  }}
                  onClick={handleAddComment}
                >
                  Add Comment
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentDetails;