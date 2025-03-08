import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from "@mui/icons-material/Cancel";
import { tokens } from "../theme";

export const mockDataDocumentsPending = [
  {
    id: 1,
    title: "Company Policies",
    author: "John Doe",
    createdAt: "2024-02-10",
    status: "Pending",
  },
  {
    id: 2,
    title: "Marketing Strategy",
    author: "Jane Smith",
    createdAt: "2024-02-12",
    status: "Pending",
  },
  {
    id: 3,
    title: "Financial Audit Report",
    author: "Robert Johnson",
    createdAt: "2024-02-15",
    status: "Pending",
  },
  {
    id: 4,
    title: "Software Development Plan",
    author: "Emily Davis",
    createdAt: "2024-02-18",
    status: "Pending",
  },
  {
    id: 5,
    title: "HR Guidelines",
    author: "Michael Brown",
    createdAt: "2024-02-20",
    status: "Pending",
  },
];

export const mockDataDocuments = [
  {
    id: 1,
    title: "Project Plan",
    author: "Alice Johnson",
    authorId: 101,
    tags: ["planning", "strategy"],
    createdAt: "2024-02-10",
    fileLink: "https://example.com/documents/project-plan.pdf",
    version: "1.0",
    description: "Initial project plan for Q1",
    department: "Project Management",
    type: "PDF",
    accessControl: "Restricted",
    status: "approved",
    size: "1.2MB",
    expirationDate: "2025-02-10"
  },
  {
    id: 2,
    title: "Technical Report",
    author: "Bob Smith",
    authorId: 102,
    tags: ["technical", "report"],
    createdAt: "2024-02-15",
    fileLink: "https://example.com/documents/tech-report.pdf",
    version: "1.2",
    description: "Detailed technical analysis",
    department: "Engineering",
    type: "DOCX",
    accessControl: "Public",
    status: "pending",
    size: "850KB",
    expirationDate: "2025-03-01"
    },
    {
    id: 3,
    title: "Technical Report",
    author: "Bob Smith",
    authorId: 102,
    tags: ["technical", "report"],
    createdAt: "2024-02-15",
    fileLink: "https://example.com/documents/tech-report.pdf",
    version: "1.2",
    description: "Detailed technical analysis",
    department: "Engineering",
    type: "DOCX",
    accessControl: "Public",
    status: "pending",
    size: "850KB",
    expirationDate: "2025-03-01"
  }
];

// Move useTheme inside a functional component
const RenderStatusCell = (params) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let color, icon, text;

  switch (params.value) {
    case "approved":
      color = colors.greenAccent[500];
      icon = <CheckCircleIcon sx={{ color }} />;
      text = "Approved";
      break;
    case "pending":
      color = colors.blueAccent[500];
      icon = <HourglassEmptyIcon  sx={{ color }}/>;
      text = "Pending";
      break;
    case "refused":
          color = colors.redAccent[500];
      icon = <CancelIcon  sx={{ color }} />;
      text = "Refused";
      break;
    default:
      color = "gray";
      text = "Unknown";
  }

  return (
    <Box display="flex" alignItems="center" gap={1} p="5px 10px" borderRadius="4px" sx={{ backgroundColor: `${color}.100` }}>
      {icon}
      <Typography color={color} fontWeight="bold">
        {text}
      </Typography>
    </Box>
  );
};

export const columns_dashboard = [
  { field: "title", headerName: "Title", flex: 1 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "createdAt", headerName: "Created At", flex: 1 },
  { field: "department", headerName: "Department", flex: 1 },
  { field: "type", headerName: "Type", flex: 0.5 },
  { field: "size", headerName: "Size", flex: 1 },
  { 
    field: "status",
    headerName: "Status",
    flex: 1.5,
    renderCell: (params) => <RenderStatusCell {...params} />,
  },
];

export const columns_pending = [
  { field: "title", headerName: "Title", flex: 1 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "createdAt", headerName: "Created At", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

export const columns_docs = [
  { field: "title", headerName: "Title", flex: 1 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "createdAt", headerName: "Created At", flex: 1 },
  { field: "department", headerName: "Department", flex: 1 },
  { field: "type", headerName: "Type", flex: 0.5 },
  { field: "size", headerName: "Size", flex: 1 },
  { field: "tags", headerName: "Tags", flex: 0.5 },
  { field: "version", headerName: "Version", flex: 0.5 },
  { field: "accessControl", headerName: "Access", flex: 1 },
  {field: "expirationDate", headerName:"Experation", flex:1},
  { 
    field: "status",
    headerName: "Status",
    flex: 1.5,
    renderCell: (params) => <RenderStatusCell {...params} />,
  },
];
  