import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaStarHalf } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart/CartContext";

const ProductDetails = () => {
  const { productName } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${productName}`
        );
        const productWithImage = {
          ...response.data,
          imageURL: `http://localhost:8000/api/products/image/${response.data.id}`,
        };
        setProductDetails(productWithImage);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details: " + error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
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

  return (
    <div className="mt-[8rem]">
      {/* Breadcrumb */}
      <nav className="text-gray-600 px-[5rem]">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-blue-500">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link to="/product-list" className="text-blue-500">
              Product List
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">{productDetails.productName}</li>
        </ol>
      </nav>

      {/* Product Details */}

      <div className=" flex px-[5rem]">
        <div>
          {productDetails.imageURL && (
            <img
              className="w-[400px] "
              src={productDetails.imageURL}
              alt={productDetails.productName}
            />
          )}
        </div>
        <div className="flex items-center flex-col  w-[500px] py-5">
          <h1 className=" text-2xl">{productDetails.productName}</h1>
          <p className=" text-xl">{productDetails.description}</p>
          <div className="flex flex-col mt-6">
            <p className=" text-xl">
              Offer Price: ₹{productDetails.offerPrice}
            </p>
            {productDetails.actualPrice && (
              <p className=" text-xl line-through">
                Regular Price: ₹{productDetails.actualPrice}
              </p>
            )}
          </div>
          <p className="text-gray-700 flex items-center">
            <strong></strong> {renderStarRating(productDetails.rating)}
          </p>
          <span className="flex items-center gap-2 justify-center  w-[200px]">
            <p className="text-green-500  capitalize">
              {productDetails.deliveryOption}-Delivery
            </p>
            <TbTruckDelivery />
          </span>

          <div className="flex justify-between mt-4 gap-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-[150px] h-[40px] text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => handleAddToCart(productDetails)}
            >
              <span className="flex items-center">
                {" "}
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </span>
            </button>
            <button className="bg-green-500 hover:bg-green-700 h-[40px] text-white font-bold py-2 px-4 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className=" w-[100%] h-auto px-[5rem] mt-[1rem] flex gap-3">
        <div className="bg-gray-200 w-[90%] px-3 py-3 rounded-lg shadow-md">
          <h3>Product Details:</h3>
          <p> {productDetails.details}</p>
        </div>
        <div className="bg-gray-200 px-3 py-3 rounded-lg shadow-md">
          <h3>Product Specifications:</h3>
          <p> {productDetails.specifications}</p>
        </div>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetails;
