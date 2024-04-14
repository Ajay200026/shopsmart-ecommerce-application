import React, { useEffect, useState } from "react";
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/sl1.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "#",
    },
    {
      image: "/sl2.jpg",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#",
    },
    {
      image: "/sl3.jpg",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      link: "#",
    },
    {
      image: "/sl4.jpg",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      link: "#",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute  left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-[1500px] h-auto"
          />
          {/*<div className="absolute mt-[-10rem] left-0 w-[95%] bg-black bg-opacity-50 px-10 p-4 ml-8">
            <p className="text-white">{slide.text}</p>
            <a
              href={slide.link}
              className="text-white underline mt-2 inline-block"
            >
              <button className="border px-2 py-2 rounded-md">
                <span className="flex justify-center items-center">
                  <HiShoppingBag />
                  Shop Now
                </span>
              </button>
            </a>
        </div>*/}
        </div>
      ))}
    </div>
  );
};

export default Slider;
