import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const SignInSignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginOption, setLoginOption] = useState(""); // State to store selected login option
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5173/";

  const handleSignIn = () => {
    axios
      .post(`${BASE_URL}/signin`, { email, password }) // Send request to backend signin endpoint
      .then((response) => {
        console.log(response.data); // Log the response data
        // Redirect user based on the selected login option
        switch (loginOption) {
          case "admin":
            navigate("/admin"); // Redirect to admin page
            break;
          case "customer":
            navigate("/home"); // Redirect to home page
            break;
          case "supplier":
            navigate("/supplier"); // Redirect to supplier page
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.error(error.response.data); // Log the error message
        setError(error.response.data.error); // Set error message in state
      });
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    // Simulated authentication
    if (email && password && password === confirmPassword) {
      console.log("Signing up with:", email, password);
      // Perform actual sign-up here
    } else if (!email || !password) {
      setError("Please enter both email and password.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleSignUp = () => {
    axios
      .post(`${BASE_URL}/signup`, { email, password }) // Send request to backend signup endpoint
      .then((response) => {
        console.log(response.data); // Log the response data
        // Redirect user to appropriate page after successful sign-up
        navigate("/home"); // For example, redirect to home page
      })
      .catch((error) => {
        console.error(error.response.data); // Log the error message
        setError(error.response.data.error); // Set error message in state
      });
    // Simulated authentication
    if (email && password) {
      console.log("Signing in with:", email, password);
      // Perform actual authentication here
    } else {
      setError("Please enter both email and password.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-white">
      <div className=" flex border gap-4">
        <div>
          <img className=" w-[650px]" src="/3d-image.jpg" alt="illust" />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-4">
            <p className="text-lg text-center font-mono mb-2">
              Select Login Option:
            </p>
            <div className="flex justify-between">
              <button
                className={`px-4 py-2 rounded-2xl ${
                  loginOption === "admin" ? "bg-gray-0 text-black" : "bg-gray-0"
                }`}
                onClick={() => setLoginOption("admin")}
              >
                <span className=" flex flex-col items-center justify-center">
                  <img
                    className=" w-[30px]"
                    src="/unauthorized-person.png"
                    alt="admin"
                  />
                  Admin
                </span>
              </button>
              <button
                className={`px-4 py-2 rounded-2xl ${
                  loginOption === "customer"
                    ? "bg-gray-0 text-black"
                    : "bg-gray-0"
                }`}
                onClick={() => setLoginOption("customer")}
              >
                <span className=" flex flex-col items-center justify-center">
                  <img
                    className=" w-[30px]"
                    src="/customer.png"
                    alt="customer"
                  />
                  Customer
                </span>
              </button>
              <button
                className={`px-4 py-2 rounded-2xl ${
                  loginOption === "supplier"
                    ? "bg-gray-0 text-black"
                    : "bg-gray-0"
                }`}
                onClick={() => setLoginOption("supplier")}
              >
                <span className=" flex flex-col items-center justify-center">
                  <img
                    className=" w-[30px]"
                    src="/hotel-supplier.png"
                    alt="supplier"
                  />
                  Supplier
                </span>
              </button>
            </div>
          </div>

          {loginOption && (
            <div className="bg-white p-8 rounded ">
              <h2 className="text-xl mb-4 font-mono">
                Sign {showSignUp ? "Up" : "In"} as {loginOption}
              </h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 right-0 m-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {!showSignUp &&
                loginOption !== "admin" && ( // Only show confirm password input for sign-up and non-admin logins
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                  />
                )}
              <button
                onClick={showSignUp ? handleSignUp : handleSignIn} // Change handler based on sign-in or sign-up mode
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                {showSignUp ? "Sign Up" : "Sign In"}
              </button>
              <p className="mt-4">
                {showSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <span
                  onClick={() => setShowSignUp(!showSignUp)}
                  className="text-blue-500 cursor-pointer"
                >
                  {showSignUp ? "Sign In" : "Sign Up"}
                </span>
              </p>
              <div className="mt-8 text-center">
                <p>Or sign in with:</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <FaFacebook className="text-2xl text-blue-700 cursor-pointer" />
                  <FcGoogle className="text-2xl text-red-600 cursor-pointer" />
                  <FaTwitter className="text-2xl text-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-200 text-red-700  px-4 py-2 mt-[-8rem] rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpPage;
