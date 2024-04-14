const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "4tfront@AJ",
  database: "login_page",
});

// Create shipping_addresses table if not exists
async function createShippingTable() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS shipping_addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        addressLine1 VARCHAR(255) NOT NULL,
        addressLine2 VARCHAR(255),
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        postalCode VARCHAR(20) NOT NULL,
        country VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL
      )
    `);
    connection.release();
  } catch (error) {
    console.error("Error creating shipping_addresses table:", error);
  }
}

// Call function to create table when server starts
createShippingTable();

// API endpoint to create a new shipping address
app.post("/api/shipping-addresses", async (req, res) => {
  const formData = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query("INSERT INTO shipping_addresses SET ?", formData);
    connection.release();

    res.status(200).json({ message: "Shipping address created successfully" });
  } catch (error) {
    console.error("Error creating shipping address:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// API endpoint to update a shipping address
app.put("/api/shipping-addresses/:id", async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query("UPDATE shipping_addresses SET ? WHERE id = ?", [
      formData,
      id,
    ]);
    connection.release();

    res.status(200).json({ message: "Shipping address updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// API endpoint to delete a shipping address
app.delete("/api/shipping-addresses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM shipping_addresses WHERE id = ?", id);
    connection.release();

    res.status(200).json({ message: "Shipping address deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
