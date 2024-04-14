// Offer.js
import React from "react";

const Offer = () => {
  // Define array of objects directly within the component
  const data = [
    {
      id: 1,
      imageUrl: "/women-1.png",
      name: "Product 1",
      price: 100,
      description: "Description for Product 1",
    },
    {
      id: 2,
      imageUrl: "/women-2.png",
      name: "Product 2",
      price: 150,
      description: "Description for Product 2",
    },
    {
      id: 3,
      imageUrl: "/women-3.jpg",
      name: "Product 3",
      price: 200,
      description: "Description for Product 3",
    },
    {
      id: 4,
      imageUrl: "/women-6.png",
      name: "Product 4",
      price: 120,
      description: "Description for Product 4",
    },
    {
      id: 5,
      imageUrl: "/women-5.png",
      name: "Product 5",
      price: 180,
      description: "Description for Product 5",
    },
  ];

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl ml-[-70rem] font-semibold mb-4 py-4">
        Special Offers
      </h1>
      <div className="grid ml-[0rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-[3rem]">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-[200px] object-cover object-center"
              src={product.imageUrl}
              alt={product.name}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-600">{product.description}</p>
              <button className="mt-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-xl">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
