// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Ecommerce Admin</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="dashboard" className="hover:text-gray-300">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Analytics
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
