import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import photopre from "../assets/photopre.avif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        user_email: email,
        user_password: password,
      });
      // Save token and redirect
      localStorage.setItem("token", response.data.data);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          {error && <div className="error-message">{error}</div>}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="remember-row">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
          </div>
          <button type="submit">Sign in</button>
          <div className="social-login-row">
            <button
              type="button"
              className="social-btn google"
              title="Sign in with Google"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    fill="#EA4335"
                    d="M12 10.8v3.6h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.7 4.5 14.6 3.5 12 3.5 6.8 3.5 2.7 7.6 2.7 12s4.1 8.5 9.3 8.5c5.4 0 8.9-3.8 8.9-9 0-.6-.1-1-.2-1.4H12z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21c2.4 0 4.4-.8 5.9-2.1l-2.8-2.3c-.8.6-1.9 1-3.1 1-2.4 0-4.4-1.6-5.1-3.7H3.1v2.3C4.6 19.6 8 21 12 21z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M21.1 12.2c0-.6-.1-1-.2-1.4H12v3.1h5.7c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.7 4.5 14.6 3.5 12 3.5 6.8 3.5 2.7 7.6 2.7 12s4.1 8.5 9.3 8.5c5.4 0 8.9-3.8 8.9-9z"
                  />
                </g>
              </svg>
            </button>
            <button
              type="button"
              className="social-btn github"
              title="Sign in with GitHub"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#222"
                  d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="social-btn facebook"
              title="Sign in with Facebook"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#1877F3"
                  d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="login-right">
        <div className="login-right-content">
          <img
            src={photopre}
            alt="Login Visual"
            style={{
              width: "100%",
              borderRadius: "24px",
              marginBottom: "2rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
