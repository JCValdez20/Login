const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vulnerable_db", // you can rename this to secure_db
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to Secured database");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log("Secured users table created or already exists");
  });
});

// ✅ Safe registration (no bcrypt)
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  db.query(query, [username, password, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json({ message: "User registered securely!" });
  });
});

// ✅ Safe login (no bcrypt)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (results.length > 0) {
      const user = results[0];
      res.json({
        message: `Welcome ${user.username}!`,
        user,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials!" });
    }
  });
});

app.listen(3001, () => {
  console.log("Secured backend running on port 3001");
});
