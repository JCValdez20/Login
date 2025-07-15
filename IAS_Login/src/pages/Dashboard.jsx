import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={{ marginTop: 24, padding: "0.75rem 2rem", fontSize: "1rem", borderRadius: 8, border: "none", background: "#222", color: "#fff", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
