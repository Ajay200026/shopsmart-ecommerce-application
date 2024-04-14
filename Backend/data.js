const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 8000; // Change the port as needed

// Middleware
// Increase payload size limit (e.g., 50MB)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4tfront@AJ",
  database: "login_page",
});

// API endpoint for adding a product
app.post("/api/products", (req, res) => {
  const productData = req.body;

  // Decode base64 encoded image string
  const imageData = Buffer.from(productData.imageURL.split(",")[1], "base64");

  // Prepare product data for insertion
  const productInsertData = {
    productName: productData.productName,
    description: productData.description,
    details: productData.details,
    imageURL: imageData, // Store image data
    actualPrice: productData.actualPrice,
    offerPrice: productData.offerPrice,
    specifications: productData.specifications,
    deliveryOption: productData.deliveryOption,
    sellerName: productData.sellerName,
    sellerAddress: productData.sellerAddress,
    productType: productData.productType, // Add product type
    rating: productData.rating, // Add rating
  };

  connection.query(
    "INSERT INTO products SET ?",
    productInsertData,
    (error, results) => {
      if (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Failed to add product" });
      } else {
        res.status(201).json({ message: "Product added successfully" });
      }
    }
  );
});

// API endpoint for updating a product
app.put("/api/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const updatedProductData = req.body;

  // Decode base64 encoded image string if imageURL is provided
  if (updatedProductData.imageURL) {
    const imageData = Buffer.from(
      updatedProductData.imageURL.split(",")[1],
      "base64"
    );
    updatedProductData.imageURL = imageData;
  }

  connection.query(
    "UPDATE products SET ? WHERE id = ?",
    [updatedProductData, productId],
    (error, results) => {
      if (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
      } else {
        res.status(200).json({ message: "Product updated successfully" });
      }
    }
  );
});

// API endpoint for fetching products
app.get("/api/products", (req, res) => {
  connection.query("SELECT * FROM products", (error, results) => {
    if (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    } else {
      res.status(200).json(results);
    }
  });
});

// API endpoint for deleting a product
app.delete("/api/products/:productId", (req, res) => {
  const productId = req.params.productId;

  connection.query(
    "DELETE FROM products WHERE id = ?",
    productId,
    (error, results) => {
      if (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
      } else {
        res.status(200).json({ message: "Product deleted successfully" });
      }
    }
  );
});

// API endpoint for fetching an image
app.get("/api/products/image/:productId", (req, res) => {
  const productId = req.params.productId;

  connection.query(
    "SELECT imageURL FROM products WHERE id = ?",
    productId,
    (error, results) => {
      if (error) {
        console.error("Error fetching image:", error);
        res.status(500).json({ error: "Failed to fetch image" });
      } else {
        if (results.length === 0 || !results[0].imageURL) {
          res.status(404).json({ error: "Image not found" });
        } else {
          // Send the image data as the response
          res.setHeader("Content-Type", "image/jpeg"); // Set the appropriate content type
          res.send(results[0].imageURL); // Assuming imageURL is the column containing image data
        }
      }
    }
  );
});

// API endpoint for fetching product details
app.get("/api/products/:productName", (req, res) => {
  const productName = req.params.productName;

  connection.query(
    "SELECT * FROM products WHERE productName = ?",
    productName,
    (error, results) => {
      if (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ error: "Failed to fetch product details" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: "Product not found" });
        } else {
          res.status(200).json(results[0]);
        }
      }
    }
  );
});
// API endpoint for fetching products based on the seller's name
app.get("/api/products/seller/:sellerName", (req, res) => {
  const sellerName = req.params.sellerName;

  connection.query(
    "SELECT * FROM products WHERE sellerName = ?",
    sellerName,
    (error, results) => {
      if (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
