// ProductCard.js

import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
const ProductCard = ({
  image,
  name,
  description,
  reviews,
  rating,
  offers,
  price,
  freeDelivery,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img src={image} alt={name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="flex items-center mt-4">
          <div className="text-sm text-gray-600 mr-2">{reviews} Reviews</div>
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0l2.683 6.23L18.945 7.5l-5.094 4.425L15.761 20 10 15.75 4.238 20l1.91-8.075L1.055 7.5l5.262-.27z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="mt-4 text-gray-800">
          <span className="font-bold">Offers:</span> {offers}
        </div>
        <div className="mt-1 text-gray-800">
          <span className="font-bold">Price:</span> {price}
        </div>
        <div className="mt-1 text-gray-800">
          <span className="font-bold">Free Delivery:</span>{" "}
          {freeDelivery ? "Yes" : "No"}
        </div>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Add to Cart
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Buy Now
        </button>
        <div className="flex justify-end mt-2">
          <FaEye className="h-6 w-6 text-gray-600 mr-2" />
          <IoIosHeart
            className={`h-6 w-6 ${
              isLiked ? "text-red-500" : "text-gray-500"
            } cursor-pointer`}
            onClick={handleLike}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
