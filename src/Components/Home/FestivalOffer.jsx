import React from "react";
import { Link } from "react-router-dom";
const FestivalOffer = () => {
  return (
    <div className="container mx-auto mt-8 flex flex-col  ">
      <h1 className="text-2xl ml-[8rem] font-semibold mb-4">Festival Offer</h1>
      {/* Main container */}
      <div className="w-[85%] mx-auto flex  items-center ">
        {/* Banner with hover effect */}
        <div className="relative w-[300px] px-5">
          <img
            className="w-full h-[320px] object-cover rounded-lg cursor-pointer transition duration-300 transform hover:scale-105"
            src="/fes-1.jpg"
            alt="Festival Offer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/fashion">
              <button className="bg-gray-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-xl transition duration-300 transform hover:scale-105">
                Shop Now
              </button>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
            <h2 className="text-xl font-semibold">Special Festival Offer</h2>
            <p className="text-sm">Limited time offer</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8 mb-4">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-40 object-cover object-center cursor-pointer"
              src="/women-4.png"
              alt="Item 1"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Item 1</h2>
              <p className="text-gray-700 mb-2">Description for Item 1</p>
              {/* Ratings stars (if available) */}
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9734;</span>
              </div>
              <p className="text-gray-700">Price: ₹100</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-40 object-cover object-center cursor-pointer"
              src="/women-7.png"
              alt="Item 2"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Item 2</h2>
              <p className="text-gray-700 mb-2">Description for Item 2</p>
              {/* Ratings stars (if available) */}
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9734;</span>
                <span className="text-yellow-500">&#9734;</span>
              </div>
              <p className="text-gray-700">Price: ₹150</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-40 object-cover object-center cursor-pointer"
              src="/fest-3.png"
              alt="Item 3"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Item 3</h2>
              <p className="text-gray-700 mb-2">Description for Item 3</p>
              {/* Ratings stars (if available) */}
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9734;</span>
              </div>
              <p className="text-gray-700">Price:₹200</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-40 object-cover object-center cursor-pointer"
              src="/fest-5.png"
              alt="Item 3"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Item 3</h2>
              <p className="text-gray-700 mb-2">Description for Item 3</p>
              {/* Ratings stars (if available) */}
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9734;</span>
              </div>
              <p className="text-gray-700">Price: ₹200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalOffer;
