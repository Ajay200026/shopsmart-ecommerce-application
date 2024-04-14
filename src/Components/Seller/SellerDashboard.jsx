import React, { useState } from "react";

// Sample data for products
const initialProducts = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 15 },
];

const SellerDashboard = () => {
  // State to manage products
  const [products, setProducts] = useState(initialProducts);

  // State to manage form inputs
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  // Function to add a new product
  const addProduct = () => {
    if (!productName || !productPrice) return;
    const newProduct = {
      id: products.length + 1,
      name: productName,
      price: parseFloat(productPrice),
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductPrice("");
  };

  // Function to delete a product
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Seller Dashboard</h1>

      {/* Add Product Form */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Product Name"
            className="mr-2 px-3 py-2 border border-gray-300 rounded-lg"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="mr-2 px-3 py-2 border border-gray-300 rounded-lg"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={addProduct}
          >
            Add
          </button>
        </div>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Products</h2>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {product.name} - ${product.price}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SellerDashboard;
