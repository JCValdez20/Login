const express = require("express");
const app = express();
const morgan = require("morgan");

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Routes
const userRoutes = require("./routes/UserRoutes");
app.use("/user", userRoutes);

// 404 Handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.status(404).json({
    error: error.message,
  });
});

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message || "Internal Server Error",
  });
});

module.exports = app;
