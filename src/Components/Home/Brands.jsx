// Brands.js
import React, { useEffect, useState } from "react";

const Brands = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((scrollPosition) => scrollPosition - 1);
    }, 50); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Brands</h1>
      <div
        className="overflow-hidden relative"
        style={{ width: "100%", height: "150px" }}
      >
        <div
          className="absolute top-0 left-0 flex"
          style={{
            animation: "scroll infinite linear",
            animationDuration: "20s",
            transform: `translateX(${scrollPosition}%)`,
          }}
        >
          {[...Array(12)].map((_, index) => (
            <img
              key={index}
              className="w-24 h-24 object-contain mx-2"
              src={`https://via.placeholder.com/150?text=Brand${index + 1}`}
              alt={`Brand ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
