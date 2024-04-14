const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// MySQL database configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4tfront@AJ",
  database: "login_page",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");

  // Create shipping_addresses table if it doesn't exist
  const createTableQuery = `CREATE TABLE IF NOT EXISTS shipping_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_email_phone UNIQUE (email, phone)
  )`;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating shipping_addresses table:", err);
      return;
    }
    console.log("shipping_addresses table created successfully");
  });
});

// Endpoint to handle the POST request from the frontend
app.post("/api/checkout", (req, res) => {
  const { email, phone, firstName, lastName, address, city, state, zip } =
    req.body.shippingAddress;

  // Check if the email or phone already exists in the database
  const checkDuplicateQuery =
    "SELECT * FROM shipping_addresses WHERE email = ? OR phone = ?";
  connection.query(checkDuplicateQuery, [email, phone], (err, results) => {
    if (err) {
      console.error("Error checking for duplicate entries:", err);
      res.status(500).json({ message: "Failed to save shipping address" });
      return;
    }

    if (results.length > 0) {
      // If email or phone already exists, return a 409 Conflict status
      res.status(409).json({ message: "Shipping address already exists" });
      return;
    }

    // Insert shipping address data into MySQL database
    const insertQuery =
      "INSERT INTO shipping_addresses (email, phone, first_name, last_name, address, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      insertQuery,
      [email, phone, firstName, lastName, address, city, state, zip],
      (err, result) => {
        if (err) {
          console.error(
            "Error saving shipping address to MySQL database:",
            err
          );
          res.status(500).json({ message: "Failed to save shipping address" });
          return;
        }
        console.log("Shipping address saved to MySQL database:", result);
        res
          .status(200)
          .json({ message: "Shipping address saved successfully" });
      }
    );
  });
});
app.get("/api/shipping-address", (req, res) => {
  const { firstName, lastName } = req.query;

  // Validate both firstName and lastName are provided
  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Both firstName and lastName are required" });
  }

  // Search by both first and last name (assuming unique combination)
  const sql = `SELECT * FROM shipping_addresses WHERE first_name = ? AND last_name = ?`;
  connection.query(sql, [firstName, lastName], (err, results) => {
    if (err) {
      console.error("Error fetching shipping address details:", err);
      return res
        .status(500)
        .json({ message: "Error fetching shipping address details" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Shipping address not found for the provided name",
      });
    }

    // Return the shipping address details (assuming single address per user)
    res.status(200).json(results[0]);
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
