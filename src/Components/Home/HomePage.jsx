import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Our E-commerce Store
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            Discover the latest products and trends.
          </p>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700">
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Featured Products
        </h2>
        <div className="flex flex-wrap -mx-4">
          {/* Product Card */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/500x375"
                alt="Product Image"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Product Name
                </h3>
                <p className="text-gray-600 mb-4">$29.99</p>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          {/* Add more product cards here */}
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
          <div className="flex overflow-x-auto">
            {/* Testimonial Card */}
            <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <p className="text-gray-600 mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor, magna a faucibus finibus, enim magna bibendum nulla, a
                  facilisis mauris mauris at sapien."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Customer Avatar"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      John Doe
                    </h4>
                    <p className="text-gray-600">Customer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more testimonial cards here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
