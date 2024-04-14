// Card.js
import React from "react";

const Card = ({ imageUrl, name, price }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-[240px]">
      <img
        className="w-full h-[230px]  object-fill object-center"
        src={imageUrl}
        alt={name}
      />
      <div className="p-4 ">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="text-green-700"> ₹{price}</p>
        <button className="mt-2 flex bg-gray-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Card;
