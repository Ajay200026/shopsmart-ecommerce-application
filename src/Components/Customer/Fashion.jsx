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
import Swal from "sweetalert2";
import { useCart } from "../cart/CartContext"; // Assuming correct path to CartContext
import ProductFilters from "../Ecommerce Filter/ProductFilters";

const Fashion = ({}) => {
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

  const handleAddToCart = async (product) => {
    try {
      // Fetch the image data and convert it to base64
      const response = await fetch(
        `http://localhost:8000/api/products/image/${product.id}`
      );
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        // Add base64 image URL to the product object
        const productWithBase64Image = {
          ...product,
          imageURL: reader.result,
        };
        // Add the product with base64 image URL to the cart
        addToCart(productWithBase64Image);
        // Show SweetAlert message
        Swal.fire({
          icon: "success",
          title: "Item Added to Cart!",
          showConfirmButton: false,
          timer: 1500,
        });
      };
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.offerPrice - b.offerPrice;
    } else {
      return b.offerPrice - a.offerPrice;
    }
  });

  const priceFilteredProducts = sortedProducts.filter(
    (product) => product.offerPrice >= minPrice
  );
  // Skeleton loading UI
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="w-20 h-20 bg-gray-300 mb-4"></div>
              <div className="h-4 bg-gray-300 w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/3 mb-2"></div>
              <div className="flex justify-between mt-4">
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                  Add to Cart
                </div>
                <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                  Buy Now
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-[6rem] px-18 ">
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {priceFilteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden relative mt-[4rem]"
          >
            <div className="absolute top-0 right-0 p-2 flex flex-col items-center mt-[1rem] mr-[1rem] justify-center gap-1">
              <FaHeart
                className={`text-${
                  product.isLiked ? "red" : "gray"
                }-500 cursor-pointer`}
                onClick={() => handleLikeToggle(product.productName)}
              />
              <FaEye
                className="text-gray-500 cursor-pointer "
                onClick={() => handleViewDetails(product.productName)}
              />
            </div>
            {product.imageURL && (
              <img
                src={`http://localhost:8000/api/products/image/${product.id}`}
                alt={product.productName}
                className="w-[328px] h-[310px] flex items-center px-4   mt-2"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {product.productName}
              </h2>
              <p className="text-md font-semibold mb-2">
                {product.description}
              </p>
              <div className="flex gap-2">
                <p className="text-gray-700">
                  <strong></strong> ₹{product.offerPrice}
                </p>
                {product.actualPrice && (
                  <p className="text-gray-500 line-through">
                    Regular Price: {product.actualPrice}
                  </p>
                )}
              </div>

              <p className="text-gray-700 flex items-center">
                <strong></strong> {renderStarRating(product.rating)}
              </p>
              <p className="text-green-700">
                <strong></strong> {product.deliveryOption}-Delivery
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-600 hover:bg-blue-300 w-[150px] h-[40px] text-white font-bold py-2 px-4 rounded-xl"
                  onClick={() => handleAddToCart(product)}
                >
                  <span className="flex items-center">
                    {" "}
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </span>
                </button>
                <button className="bg-pink-700 hover:bg-gray-400 h-[40px] text-white font-bold py-2 px-4 rounded-xl">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fashion;
