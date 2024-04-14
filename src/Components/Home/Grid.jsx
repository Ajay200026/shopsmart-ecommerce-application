import React, { useState } from "react";

const Grid = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (itemName) => {
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="flex items-center justify-center gap-5 py-5 px-10 ">
      {/* First Laptop Image */}
      <div
        className="w-[280px] h-[470px] rounded-lg overflow-hidden relative"
        onMouseEnter={() => handleMouseEnter("Samsung Laptop")}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="h-full w-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter brightness-10"
          src="/woman.png"
          alt="laptop"
        />
        <div
          className={`absolute left-0 right-0 bottom-0 bg-black bg-opacity-50 p-3 text-white transition-transform duration-300 ${
            hoveredItem === "Samsung Laptop"
              ? "translate-y-0"
              : "translate-y-full"
          }`}
        >
          <h3 className="text-lg font-semibold">Fashion </h3>
          <p className="text-sm">
            Explore our ecommerce website for the latest in fashion.
          </p>
          <button className="mt-2 px-4 py-2 bg-gray-500 hover:bg-blue-600 rounded-lg">
            Shop Now
          </button>
        </div>
      </div>

      {/* PC Header and Women Image */}
      <div>
        <div className="w-[850px] h-[230px] flex gap-7 py-5 ">
          {/* PC Header Image */}
          <div
            className="w-[450px] h-[180px] rounded-lg overflow-hidden relative"
            onMouseEnter={() => handleMouseEnter("PC Header")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="h-full w-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter brightness-1"
              src="/auto-1.png"
              alt="pc"
            />
            <div
              className={`absolute left-0 right-0 bottom-0 bg-black bg-opacity-50 p-3 text-white transition-transform duration-300 ${
                hoveredItem === "PC Header"
                  ? "translate-y-0"
                  : "translate-y-full"
              }`}
            >
              <h3 className="text-lg font-semibold">Automobile Accessories</h3>
              <p className="text-sm">
                Enhance your ride with premium car gear.
              </p>
              <button className="mt-2 px-4 py-2 bg-gray-500 hover:bg-blue-600 rounded-lg">
                Shop Now
              </button>
            </div>
          </div>

          {/* Women Image */}
          <div
            className="w-[450px] h-[180px] rounded-lg overflow-hidden relative"
            onMouseEnter={() => handleMouseEnter("Fashion for Women")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="h-full w-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
              src="/slider2.jpg"
              alt="women"
            />
            <div
              className={`absolute left-0 right-0 bottom-0 bg-black bg-opacity-50 p-3 text-white transition-transform duration-300 ${
                hoveredItem === "Fashion for Women"
                  ? "translate-y-0"
                  : "translate-y-full"
              }`}
            >
              <h3 className="text-lg font-semibold">Home Appliances</h3>
              <p className="text-sm">
                Upgrade your home with modern appliances.
              </p>
              <button className="mt-2 px-4 py-2 bg-gray-500 hover:bg-blue-600 rounded-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Mobiles Image */}
        <div
          className="w-[850px] h-[200px] mt-5 rounded-lg overflow-hidden relative"
          onMouseEnter={() => handleMouseEnter("Mobile Phones")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className="h-full w-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
            src="/mobiles-1.png"
            alt="mobiles"
          />
          <div
            className={`absolute left-0 right-0 bottom-0 bg-black bg-opacity-50 p-3 text-white transition-transform duration-300 ${
              hoveredItem === "Mobile Phones"
                ? "translate-y-0"
                : "translate-y-full"
            }`}
          >
            <h3 className="text-lg font-semibold">Technology Gadgets</h3>
            <p className="text-sm">Explore the latest in tech innovations.</p>
            <button className="mt-2 px-4 py-2 bg-gray-500 hover:bg-blue-600 rounded-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
