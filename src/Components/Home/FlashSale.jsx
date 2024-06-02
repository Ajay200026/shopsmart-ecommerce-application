// FlashSale.js
import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const FlashSale = () => {
  // Define array of objects directly within the component
  const data = [
    {
      id: 1,
      imageUrl: "/mob-1.jpg",
      name: "Realme Narzo",
    },
    {
      id: 2,
      imageUrl: "/mob-2.jpg",
      name: "Redmi 12",
    },
    {
      id: 3,
      imageUrl: "/mob-3.jpg",
      name: "Realme Narzo 60",
    },
    {
      id: 4,
      imageUrl: "/mob-4.jpg",
      name: "Honor X9B",
    },
    {
      id: 5,
      imageUrl: "/mob-5.jpg",
      name: "Iqoo Neo 7 pro",
    },
  ];

  return (
    <div className="container  px-20 mx-auto mt-8 flex flex-col ">
      <h1 className="text-2xl font-semibold mb-4 ml-10">Flash Sale</h1>
      <div className="flex  mb-4  justify-end px-12">
        <Link to="/technologygadgets">
          {" "}
          <button className="text-sm text-blue-500 hover:text-blue-700 ">
            <span className="flex items-center">
              View More
              <MdKeyboardDoubleArrowRight />
            </span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {data.map((product) => (
          <div key={product.id} className="text-center">
            <div className="rounded-full h-[150px] w-[240px] mx-auto overflow-hidden">
              <Link to="/technologygadgets">
                <img
                  className=" object-contain object-center h-full w-full cursor-pointer "
                  src={product.imageUrl}
                  alt={product.name}
                />
              </Link>
            </div>
            <p className="mt-2 font-mono text-center ml-6 ">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
