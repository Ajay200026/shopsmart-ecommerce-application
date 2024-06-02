import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../login-Signup/AuthContext";
const ProductContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    details: "",
    imageURL: "",
    actualPrice: "",
    offerPrice: "",
    specifications: "",
    deliveryOption: "",
    sellerName: "",
    sellerAddress: "",
    productType: "", // New field for product type
    rating: "", // New field for rating
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products for seller:", user.userName); // Add this console log
      const response = await axios.get(
        `http://localhost:8000/api/products/seller/${user.userName}` // Update the endpoint
      );
      // Convert Blob image data to Data URL
      const productsWithImages = response.data.map((product) => ({
        ...product,
        imageURL: URL.createObjectURL(new Blob([product.imageURL])),
      }));
      setProducts(productsWithImages);

      setLoading(false);
    } catch (error) {
      setError("Error fetching products: " + error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductData((prevData) => ({
        ...prevData,
        imageURL: reader.result, // Set base64 encoded image string
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        // Update existing product
        await axios.put(
          `http://localhost:8000/api/products/${selectedProduct.id}`,
          productData
        );
        alert("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("http://localhost:8000/api/products", productData);
        alert("Product added successfully!");
      }
      fetchProducts();
      resetForm();
      setShowForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to perform operation. Please try again later.");
    }
  };

  const handleModifyProduct = (product) => {
    setSelectedProduct(product);
    setProductData(product); // Populate form fields with selected product's data
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete product. Please try again later.");
    }
  };

  const resetForm = () => {
    setProductData({
      productName: "",
      description: "",
      details: "",
      imageURL: "",
      actualPrice: "",
      offerPrice: "",
      specifications: "",
      deliveryOption: "",
      sellerName: "",
      sellerAddress: "",
      productType: "", // Reset product type field
      rating: "", // Reset rating field
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          <span className="flex items-center gap-3">
            {showForm ? "Hide Form" : " Add Product"} <FaPlus />
          </span>
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="w-[750px]  fixed mt-[10rem] ml-[28rem] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg z-50"
        >
          <div className="flex items-center  gap-10">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productName"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productData.productName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product description"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="details"
              >
                Details
              </label>
              <textarea
                id="details"
                name="details"
                value={productData.details}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product details"
                required
              />
            </div>
          </div>
          <div className="flex items-center  gap-10">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="actualPrice"
              >
                Actual Price
              </label>
              <input
                type="text"
                id="actualPrice"
                name="actualPrice"
                value={productData.actualPrice}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter actual price"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="offerPrice"
              >
                Offer Price
              </label>
              <input
                type="text"
                id="offerPrice"
                name="offerPrice"
                value={productData.offerPrice}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter offer price"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="specifications"
              >
                Specifications
              </label>
              <textarea
                id="specifications"
                name="specifications"
                value={productData.specifications}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product specifications"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="deliveryOption"
              >
                Delivery Option
              </label>
              <select
                id="deliveryOption"
                name="deliveryOption"
                value={productData.deliveryOption}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Delivery Option</option>
                <option value="free">Free Delivery</option>
                <option value="charges">Delivery Charges Apply</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sellerName"
              >
                Seller Name
              </label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                value={productData.sellerName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter seller name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sellerAddress"
              >
                Seller Address
              </label>
              <textarea
                id="sellerAddress"
                name="sellerAddress"
                value={productData.sellerAddress}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter seller address"
                required
              />
            </div>
          </div>
          <div className="flex">
            {/* Product Type */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productType"
              >
                Product Type
              </label>
              <input
                type="text"
                id="productType"
                name="productType"
                value={productData.productType}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product type"
                required
              />
            </div>
            {/* Rating */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="rating"
              >
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={productData.rating}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product rating"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imageUpload"
              >
                Product Image
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Product
            </button>
          </div>
        </form>
      )}
      {/* Product list */}
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div>
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className=" ">
          <h2 className="text-lg font-bold mb-2">Product List</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 bg-gradient-to-r from-teal-200 to-teal-500">
                  <th className="border border-gray-200 px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Actual Price
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Offer Price
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Specifications
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Delivery Option
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Seller Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Seller Address
                  </th>
                  <th className="border border-gray-200 px-4 py-2">Image</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="text-center">
                    <td className="border border-gray-200 px-4 py-2">
                      {product.productName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.description}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.actualPrice}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.offerPrice}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.specifications}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.deliveryOption}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.sellerName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.sellerAddress}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.imageURL && (
                        <img
                          src={`http://localhost:8000/api/products/image/${product.id}`}
                          alt={product.productName}
                          className="w-20 h-auto"
                        />
                      )}
                    </td>
                    <td className=" border-gray-800 px-4 py-2 flex">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => handleModifyProduct(product)}
                      >
                        Modify
                      </button>
                      <button
                        className="bg-gradient-to-r from-rose-400 to-red-500 hover:bg-red-200 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
