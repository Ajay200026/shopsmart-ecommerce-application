const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4tfront@AJ",
  database: "login_page",
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle payment callback from Razorpay
app.post("/paymentcallback", (req, res) => {
  const {
    orderId,
    paymentId,
    amount,
    status,
    name,
    email,
    phone,
    product_name,
  } = req.body;

  // SQL query to insert payment details into MySQL database
  const query = `INSERT INTO payments (orderId, paymentId, amount, status, name, email, phone, product_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    orderId,
    paymentId,
    amount,
    status,
    name,
    email,
    phone,
    product_name,
  ];

  // Execute SQL query
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error saving payment details to MySQL:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    console.log("Payment details saved to MySQL:", result);
    // Send response
    res.status(200).json({ message: "Payment details saved successfully" });
  });
});

// Endpoint to retrieve order history
app.get("/api/orders", (req, res) => {
  // SQL query to fetch order history from the database
  const query = "SELECT * FROM payments";

  // Execute SQL query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching order history:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    // Send order history as response
    res.status(200).json(results);
  });
});

// Endpoint to clear all data from the database
app.delete("/api/orders", (req, res) => {
  // SQL query to delete all rows from the payments table
  const query = "TRUNCATE TABLE payments";

  // Execute SQL query
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error clearing order history:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    console.log("Order history cleared successfully");
    res.status(200).json({ message: "Order history cleared successfully" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
