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
  database: "vulnerable_db",
});

// Connect to database and create table if not exists
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");

  // Create users table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Users table created or already exists");
  });
});

// Vulnerable registration endpoint
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  // SQL injection vulnerability
  const query = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;

  db.query(query, (err, result) => {
    if (err) {
      // Information disclosure
      res.status(500).json({ error: err.sqlMessage, query: query });
    } else {
      res.json({ message: "User registered successfully!" });
    }
  });
});

// Vulnerable login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // SQL injection vulnerability (still present for demonstration)
  const query = `SELECT * FROM users WHERE email LIKE '${email}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.sqlMessage });
    } else if (results.length > 0) {
      // No proper session management
      res.json({
        message: `Welcome ${results[0].username}!`,
        user: results[0],
      });
    } else {
      res.status(401).json({ error: "Invalid credentials!" });
    }
  });
});

app.listen(3001, () => {
  console.log("Vulnerable backend running on port 3001");
});
