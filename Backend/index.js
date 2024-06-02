const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4tfront@AJ",
  database: "login_page",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    user_type ENUM('admin', 'customer', 'supplier') NOT NULL DEFAULT 'customer'
  )`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    throw err;
  }
  console.log("Users table created or already exists");
});

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token.replace("Bearer ", ""), "4t75nyaas2", (err, user) => {
    if (err) {
      console.error("Error verifying token:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).send("Token has expired");
      }
      return res.status(403).send("Forbidden");
    }
    req.user = user;
    next();
  });
};

app.post("/signup", async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length > 0) {
          return res.status(400).send("User with this email already exists");
        } else {
          db.query(
            "INSERT INTO users SET ?",
            { email, password: hashedPassword, name, userType },
            (err, result) => {
              if (err) {
                throw err;
              }
              const token = jwt.sign(
                { email, name },
                "4t75nyaas2" // Removed expiresIn option
              );
              res.status(201).json({ token });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          throw err;
        }
        if (
          result.length === 0 ||
          !(await bcrypt.compare(password, result[0].password))
        ) {
          return res.status(401).send("Invalid login credentials");
        } else {
          const token = jwt.sign(
            { email: result[0].email, name: result[0].name },
            "4t75nyaas2" // Removed expiresIn option
          );
          res.json({ token, userType: result[0].userType });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users", authenticateToken, (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      // Convert the result to an array
      const users = Array.isArray(result) ? result : [];
      res.json(users);
    }
  });
});

// DELETE endpoint to suspend a user account
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error suspending user:", err);
      res.status(500).send("Failed to suspend user");
    } else {
      console.log("User suspended successfully");
      res.status(200).send("User suspended successfully");
    }
  });
});

// POST endpoint to change password
app.post("/change-password", authenticateToken, async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Retrieve user data from the database
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          throw err;
        }

        // If user not found or current password does not match, send error response
        if (
          result.length === 0 ||
          !(await bcrypt.compare(currentPassword, result[0].password))
        ) {
          return res.status(401).send("Invalid current password");
        } else {
          // Update user's password with the new one
          const hashedNewPassword = await bcrypt.hash(newPassword, 10);
          db.query(
            "UPDATE users SET password = ? WHERE email = ?",
            [hashedNewPassword, email],
            (err, result) => {
              if (err) {
                throw err;
              }
              // Password updated successfully
              res.status(200).send("Password updated successfully");
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to fetch user details by username
app.get("/user-details/:username", authenticateToken, (req, res) => {
  const { username } = req.params;
  db.query("SELECT * FROM users WHERE name = ?", [username], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        res.status(404).send("User not found");
      } else {
        // Remove sensitive data like password before sending response
        const user = {
          id: result[0].id,
          email: result[0].email,
          name: result[0].name,
          userType: result[0].userType,
        };
        res.json(user);
      }
    }
  });
});

//app.get("/dashboard", authenticateToken, (req, res) => {
// res.json({
// message: `Welcome, ${req.user.name}! This is a protected route.`,
// });
//});
// Add a new endpoint to check if the email exists
app.get("/check-email/:email", (req, res) => {
  const { email } = req.params;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ matched: result.length > 0 });
    }
  });
});

// Update the /forgot-password endpoint to handle password reset
app.post("/forgot-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length === 0) {
          return res.status(404).send("Email not found");
        } else {
          // Update the user's password
          const hashedPassword = await bcrypt.hash(password, 10);
          db.query(
            "UPDATE users SET password = ? WHERE email = ?",
            [hashedPassword, email],
            (err, result) => {
              if (err) {
                throw err;
              }
              res.status(200).send("Password updated successfully");
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
