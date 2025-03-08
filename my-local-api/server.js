const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Allows JSON data in requests

// Sample Local Data
let documents = [
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
    department: "HR",
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
    title: "Market Research",
    author: "Emma Davis",
    authorId: 103,
    tags: ["market", "research"],
    createdAt: "2024-03-01",
    fileLink: "https://example.com/documents/market-research.pdf",
    version: "2.0",
    description: "Comprehensive market research document",
    department: "Marketing",
    type: "PDF",
    accessControl: "Restricted",
    status: "approved",
    size: "2.1MB",
    expirationDate: "2025-04-10"
  }
];
let users = [
  {
    id: 1,
    fullName: "Amine Bensalem",
    username: "amine_ben",
    email: "amine.ben@example.com",
    phone: "+213 555 123 456",
    role: "Admin",
    department: "IT",
    position: "System Administrator",
    status: "Active",
    createdAt: "2024-02-15",
  },
  {
    id: 2,
    fullName: "Sofia Meriem",
    username: "sofia_mer",
    email: "sofia.meriem@example.com",
    phone: "+213 666 987 654",
    role: "User",
    department: "HR",
    position: "HR Specialist",
    status: "Inactive",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    fullName: "Omar Khelifa",
    username: "omar_kh",
    email: "omar.khelifa@example.com",
    phone: "+213 777 456 321",
    role: "Moderator",
    department: "Support",
    position: "Customer Support Lead",
    status: "Active",
    createdAt: "2023-12-05",
  },
  {
    id: 4,
    fullName: "Nour Hadj",
    username: "nour_hj",
    email: "nour.hadj@example.com",
    phone: "+213 554 321 789",
    role: "User",
    department: "Marketing",
    position: "Content Creator",
    status: "Pending",
    createdAt: "2024-03-01",
  },
  {
    id: 5,
    fullName: "Yassine Belkacem",
    username: "yassine_bk",
    email: "yassine.bk@example.com",
    phone: "+213 668 852 963",
    role: "Admin",
    department: "Finance",
    position: "Financial Analyst",
    status: "Banned",
    createdAt: "2022-11-20",
  },
];
// 📌 Get All Documents
app.get("/documents", (req, res) => {
  res.json(documents);
});

// 📌 Get Single Document by ID
app.get("/documents/:id", (req, res) => {
  const document = documents.find(d => d.id === parseInt(req.params.id));
  document ? res.json(document) : res.status(404).send("Document not found");
});

// 📌 Add New Document
app.post("/documents", (req, res) => {
  const newDocument = { id: documents.length + 1, ...req.body };
  documents.push(newDocument);
  res.status(201).json(newDocument);
});

// 📌 Update a Document
app.put("/documents/:id", (req, res) => {
  const docIndex = documents.findIndex(d => d.id === parseInt(req.params.id));
  if (docIndex !== -1) {
    documents[docIndex] = { ...documents[docIndex], ...req.body };
    res.json(documents[docIndex]);
  } else {
    res.status(404).send("Document not found");
  }
});

// 📌 Delete a Document
app.delete("/documents/:id", (req, res) => {
  documents = documents.filter(d => d.id !== parseInt(req.params.id));
  res.status(204).send();
});
// 📌 Get All Users
app.get("/users", (req, res) => {
  res.json(users);
});

// 📌 Get Single User by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

// 📌 Add New User
app.post("/users", (req, res) => {
  const { fullName, username, email, phone, role, department, position, status } = req.body;
  if (!fullName || !username || !email || !role || !department || !position) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newUser = {
    id: users.length + 1,
    fullName,
    username,
    email,
    phone: phone || "",
    role,
    department,
    position,
    status: status || "Pending",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// 📌 Update a User
app.put("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// 📌 Delete a User
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API running at http://localhost:${PORT}`));