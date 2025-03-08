import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authen.js"; // Import AuthContext
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(AuthContext); // Get setUsername from context
  const [inputUsername, setInputUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(inputUsername); // Store username globally
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <div className="logo">
          <img src="logo.png" alt="Company Logo" />
          <h1>DocBank</h1>
        </div>
      </div>
      <div className="right-side">
        <h2>Welcome to the Document Management System</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)} // Update state
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
