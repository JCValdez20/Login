import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";

function LoginRegister({ setMessage }) {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}
                 Full query: ${error.response?.data?.query || ""}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        `Error: ${error.response?.data?.error || error.message}
         Full query: ${error.response?.data?.query || ""}`
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Vulnerable Login/Register</h3>
      <p style={{ color: "red" }}>Use SQL Injection to bypass login.</p>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Register</button>
      </div>

      {view === "login" ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

function App() {
  const [message, setMessage] = useState(""); // ✅ fixed

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginRegister setMessage={setMessage} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <div style={{ padding: "20px", color: "blue" }}>
        <strong>Message:</strong> {message}
      </div>
    </Router>
  );
}

export default App;
