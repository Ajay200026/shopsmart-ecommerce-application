import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import ProductFilters from "../Ecommerce Filter/ProductFilters"; // Assuming a correct path to ProductFilters

const EcommerceCard = ({ handleModifyProduct, handleDelete }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        const productsWithImages = response.data
          .filter((product) => product.productType === "fashion")
          .map((product) => ({
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

    fetchProducts();

    // Cleanup function to revoke ObjectURLs
    return () => {
      products.forEach((product) => {
        URL.revokeObjectURL(product.imageURL);
      });
    };
  }, []);

  const handleViewDetails = (productName) => {
    navigate(`/product-details/${productName}`);
  };

  const handleLikeToggle = (productName) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productName === productName
          ? { ...product, isLiked: !product.isLiked }
          : product
      )
    );
  };

  const renderStarRating = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalf className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={index} className="text-gray-300" />
        ))}
      </>
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.discountedPrice - b.discountedPrice;
    } else {
      return b.discountedPrice - a.discountedPrice;
    }
  });

  const priceFilteredProducts = sortedProducts.filter(
    (product) => product.discountedPrice >= minPrice
  );

  return (
    <div>
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {priceFilteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-md overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-2">
              <FaHeart
                className={`text-${
                  product.isLiked ? "red" : "gray"
                }-500 cursor-pointer`}
                onClick={() => handleLikeToggle(product.productName)}
              />
              <FaEye
                className="text-gray-500 cursor-pointer ml-2"
                onClick={() => handleViewDetails(product.productName)}
              />
            </div>
            {product.imageURL && (
              <img
                className="w-full h-40 object-cover object-center"
                src={product.imageURL}
                alt={product.productName}
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {product.productName}
              </h2>
              <p className="text-lg font-semibold mb-2">
                {product.description}
              </p>
              <p className="text-gray-700">
                <strong>Offer Price:</strong> {product.discountedPrice}
              </p>
              {product.regularPrice && (
                <p className="text-gray-500 line-through">
                  Regular Price: {product.regularPrice}
                </p>
              )}
              <p className="text-gray-700 flex items-center">
                <strong>Ratings:</strong> {renderStarRating(product.ratings)}
              </p>
              <p className="text-gray-700">
                <strong>Delivery Info:</strong> {product.deliveryInfo}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleModifyProduct(product)}
                >
                  Modify
                </button>
                <button
                  className="bg-gradient-to-r from-rose-400 to-red-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcommerceCard;
