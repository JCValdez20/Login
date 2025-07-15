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
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vulnerable React App</h1>
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
              type="email"
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
              type="email"
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
  const [setMessage] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoginRegister setMessage={setMessage} />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
