const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());

// Define your product data
const products = [
  {
    productName: "Product 1",
    productImage: "/Samsung.jpg",
    regularPrice: "Rs. 1500",
    discountedPrice: 1300,
    ratings: 4.5,
    deliveryInfo: "Free Delivery",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    productName: "Product 2",
    productImage: "/Samsung.jpg",
    regularPrice: "Rs. 1200",
    discountedPrice: 1000,
    ratings: 4,
    deliveryInfo: "Free Delivery",
    description: "Ut enim ad minim veniam.",
  },
  {
    productName: "Product 3",
    productImage: "/Samsung.jpg",
    regularPrice: "Rs. 2000",
    discountedPrice: 1800,
    ratings: 3.5,
    deliveryInfo: "Standard Delivery Charges Apply",
    description: "Duis aute irure dolor .",
  },
  {
    productName: "Product 4",
    productImage: "/Samsung.jpg",
    regularPrice: "Rs. 800",
    discountedPrice: 700,
    ratings: 5,
    deliveryInfo: "Free Delivery",
    description: "Excepteur sint occaecat.",
  },
];

// Define an API endpoint to serve all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Define an API endpoint to serve individual product details
app.get("/api/products/:productName", (req, res) => {
  const productName = req.params.productName;
  const product = products.find((p) => p.productName === productName);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});
// New API endpoint for product search
app.get("/api/products/search", async (req, res) => {
  const { searchTerm } = req.query;

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json(filteredProducts);
});

// Handle requests to the root URL with a default response
app.get("/", (req, res) => {
  res.send("Welcome to the product API");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
