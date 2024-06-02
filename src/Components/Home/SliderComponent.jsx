// Slider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "./Card";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  // Sample data for each card
  const cardsData = [
    {
      id: 1,
      imageUrl: "/men-7.webp",
      name: "Checkered Hooded Neck Cotton Blend White T-Shirt",
      price: "349 86% off",
    },
    {
      id: 2,
      imageUrl: "/men-8.webp",
      name: " High Neck Cotton Blend Green, Black T-Shirt",
      price: "249 90% off",
    },
    {
      id: 3,
      imageUrl: "/men-9.webp",
      name: "Loose fit Hooded  Blend Red T-Shirt",
      price: "272 79% off",
    },
    {
      id: 4,
      imageUrl: "/men-10.webp",
      name: "Regular Fit Self Design Spread Collar Casual Shirt",
      price: "399 73% off",
    },
    {
      id: 5,
      imageUrl: "/men-11.webp",
      name: "Men Regular Fit Checkered Casual Shirt",
      price: "401 79% off",
    },
    {
      id: 6,
      imageUrl: "/men-12.webp",
      name: "Men Regular Fit Solid Spread Collar Casual Shirt",
      price: "419  30% off",
    },
  ];

  return (
    <Slider
      {...settings}
      className="w-[1200px] justify-center ml-[0rem] px-2   h-[500px] flex items-center mb-3"
    >
      {cardsData.map((item) => (
        <div
          className="overflow-hidden flex   justify-around px-13 ml-10 py-4 mb-8"
          key={item.id}
        >
          <Card
            className=" bg-green-500"
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
          />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
