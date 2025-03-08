const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hafida.bouked", // Replace with your Gmail
    pass: "hafida.h1", // Replace with your App Password
  },
});

// ✅ Test Connectivity Before Sending Emails
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Email server connection failed:", error);
  } else {
    console.log("✅ Email server is ready to send messages!");
  }
});

// Email sending route
app.post("/api/send-email", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).send("All fields are required.");
  }

  const mailOptions = {
    from: "boukedjarhafida@gmail.com",
    to: "boukedjarhafida@gmail.com",
    subject: "Your Account Details",
    text: `Hello ${firstName} ${lastName},\n\nYour account has been created.\n\nUsername: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nBest regards,\nYour Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

// Start the server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
