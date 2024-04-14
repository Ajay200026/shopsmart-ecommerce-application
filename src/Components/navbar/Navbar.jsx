import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../../Searchbar/SearchBar";
import { SearchResultsList } from "../../Searchbar/SearchResultsList";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../login-Signup/AuthContext";
import { useUser } from "./UserContext";

import { useRef } from "react";

const Navbar = () => {
  const { user, logout, login } = useAuth();
  const { cartItems } = useCart();
  const { setUser } = useUser();
  const [results, setResults] = useState([]);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    if (user && user.userName === "Admin") {
      // Redirect to login page only if user is an admin
      login({ userName: "" });
      navigate("/authpage");
    } else {
      logout();
    }
  };
  const handleCartClick = () => {
    if (!user || user.userName === "Admin") {
      Swal.fire({
        title: "Login Required",
        text: "Please login to view your cart.",
        icon: "info",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/authpage");
        }
      });
    } else {
      navigate("/cart");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    // Save the username to the UserContext when it's available
    if (user && user.userName) {
      setUser(user.userName);
    }
  }, [user, setUser]);
  return (
    <nav className="flex bg-gradient-to-r from-emerald-500 to-emerald-900 p-4 fixed w-full h-[10vh] top-0 left-0 z-50">
      <div className="container mx-auto flex justify-center gap-[4rem] items-center">
        {user && user.userName === "Admin" ? (
          <span className="text-white text-xl font-bold">
            <span className="flex items-center">
              <img className="w-[50px] h-[50px]" src="/logo3.png" alt="" />
              ShopSmart
            </span>
          </span>
        ) : (
          <Link to="/" className="text-white text-xl font-bold">
            <span className="flex items-center">
              <img className="w-[50px] h-[50px]" src="/logo3.png" alt="" />
              ShopSmart
            </span>
          </Link>
        )}

        {/* Search Bar */}
        <div className="flex">
          <div className="search-bar-container">
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && (
              <SearchResultsList results={results} />
            )}
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          {user && user.userName === "Admin" ? (
            <span
              className="text-white cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="flex items-center gap-0">
                Category
                <span className="text-xl ">
                  <RiArrowDropDownLine />
                </span>
              </span>
            </span>
          ) : (
            <div>
              <span
                className="text-white cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="flex items-center gap-0">
                  Category
                  <span className="text-xl ">
                    <RiArrowDropDownLine />
                  </span>
                </span>
              </span>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  ref={dropdownRef}
                  className="absolute bg-gray-700 mt-9 py-1 px-3 w-[200px] rounded-md shadow-lg"
                >
                  <ul className="flex flex-col gap-5">
                    <li>
                      <Link
                        to="/fashion"
                        className="text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Fashion
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/technologygadgets"
                        className="text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Technology Gadgets
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/homeproducts"
                        className="text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Home Appliances
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/automobiles"
                        className="text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Automobile Accessories
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* User Name or Login */}
        {user ? (
          <>
            {user.role !== "admin" && (
              <>
                <Link to="/component" className="">
                  <p className="text-white">{user.userName}</p>
                </Link>

                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </>
            )}
          </>
        ) : (
          <Link to="/authpage" className="text-white">
            Login
          </Link>
        )}

        {/* Cart Icon with Index Value */}
        <div className="relative ml-4">
          {user && user.userName === "Admin" ? (
            <span className="text-white cursor-pointer">
              <HiShoppingCart className="text-white text-2xl" />
              {/* Display Cart Count */}
              <span className="bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center absolute -top-1 -right-1">
                {totalQuantity}
              </span>
            </span>
          ) : (
            <button onClick={handleCartClick}>
              <HiShoppingCart className="text-white text-2xl" />
              {/* Display Cart Count */}
              <span className="bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center absolute -top-1 -right-1">
                {totalQuantity}
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
