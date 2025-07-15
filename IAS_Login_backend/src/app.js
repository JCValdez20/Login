const express = require("express");
const app = express();
const parser = require("body-parser");
const database = require("./models/database");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "Origin, X-Requested-With, Content-Type, Accept , Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Origin",
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE"
    );
    return res.status(200).json;
  }
  next();
});

const userRoutes = require("./routes/UserRoutes");

app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.json({
    error: error.message,
  });
});

app.use((req, res, next) => {
  return res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
