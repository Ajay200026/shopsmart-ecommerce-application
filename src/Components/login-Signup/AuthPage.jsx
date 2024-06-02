import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext";

const AuthPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for login success
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("customer");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSignupMode = () => {
    setSignupMode(!signupMode);
  };

  const handleUserTypeChange = (event) => {
    const selectedUserType = event.target.value;
    setUserType(selectedUserType);
  };

  const handleFormSubmit = async () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (signupMode && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (signupMode && !name) {
      errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      if (signupMode) {
        // Signup logic
        await axios.post("http://localhost:5000/signup", {
          email,
          password,
          name,
          userType,
        });
        // For demonstration purposes, just toggle to login mode
        setSignupMode(false);
      } else {
        // Login logic
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });

        // Check if response object and 'data' property are defined
        if (response && response.data) {
          document.cookie = `token=${response.data.token}; Secure; HttpOnly`;

          setLoginSuccess(true); // Set login success state to true
          localStorage.setItem("token", response.data.token);
          // Decode JWT token to extract user's information
          const tokenParts = response.data.token.split(".");
          const encodedPayload = tokenParts[1];
          const decodedPayload = atob(encodedPayload);
          const { name } = JSON.parse(decodedPayload);

          login({ userName: name }); // Pass user's name to login function
          console.log("JWT Token:", response.data.token);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });

          // Navigate based on user type
          switch (response.data.userType) {
            case "admin":
              navigate("/admin");
              break;
            case "supplier":
              navigate("/supplier");
              break;
            case "customer":
            default:
              navigate("/");
              break;
          }
        } else {
          // Display error message for invalid login credentials
          Swal.fire({
            title: "Invalid login credentials",
            text: "Please check your email and password and try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }

      // Reset form and errors
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setUserType("customer");
      setErrors({});
    } catch (error) {
      Swal.fire({
        title: "Invalid login credentials",
        text: "Please check your email and password and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      if (error.response?.status === 404) {
        // Unauthorized error
        Swal.fire({
          title: "Invalid login credentials",
          text: "Please check your email and password and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (error.response?.status === 404) {
        // Server error 404
        Swal.fire({
          title: "Resource Not Found",
          text: "The requested resource is not found on the server.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (error.response?.status === 404) {
        // Server error 404
        Swal.fire({
          title: "Resource Not Found",
          text: "The requested resource is not found on the server.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        // Other errors
        setErrors({ general: "Authentication failed" });
      }
    }
  };

  return (
    <div className="flex h-screen bg-white border">
      {/* Left Container with Image */}
      <div className="flex items-center justify-center">
        <img
          className="w-[600px] h-[500px] max-sm:hidden"
          src="/3d-image.jpg"
          alt="login"
        />
        {/* You can adjust the background image and styles accordingly */}
      </div>

      {/* Right Container with Form */}
      <div className="w-full flex flex-col justify-center items-center md:w-1/2 p-8">
        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-[250px] p-2 border-b ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-blue-500`}
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[250px] p-2 border-b ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Your Password"
            />
            <span className="absolute  top-0 mt-2 mr-2">
              {showPassword ? (
                <FaEyeSlash
                  className="h-4 w-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="h-4 w-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* User Type Selection (only visible in signup mode) */}
        {signupMode && (
          <div className="mb-4">
            <label
              htmlFor="userType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="w-[250px] p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
        )}

        {/* Conditional Rendering for Additional Signup Fields */}
        {signupMode && (
          <div className="">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-[250px] p-2 border-b ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border-blue-500`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-[250px] p-2 border-b ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="Confirm Password"
                />
                <span className="absolute  top-0 mt-2 mr-2">
                  {showPassword ? (
                    <FaEyeSlash
                      className="h-4 w-5 text-gray-500 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="h-4 w-5 text-gray-500 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Signup/Login Button */}
        <button
          className="bg-blue-500 text-white p-2 rounded-full w-[200px]"
          onClick={handleFormSubmit}
        >
          {signupMode ? "Sign Up" : "Log In"}
        </button>

        {/* Conditional Rendering for Forget Password/Signup Link */}
        {!signupMode ? (
          <div className="mt-4 text-center">
            <Link to="/forgotpassword">
              <a className="text-blue-500">Forgot your password?</a>
            </Link>
          </div>
        ) : (
          <div className="mt-4 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={toggleSignupMode}
            >
              Login
            </span>
          </div>
        )}

        {/* Conditional Rendering for "OR" text and Social Logins */}
        {!signupMode && (
          <div className="flex items-center mt-4">
            <div className="border-b w-full border-gray-300"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="border-b w-full border-gray-300"></div>
          </div>
        )}

        {/* Social Logins (only visible in login mode) */}
        {!signupMode && (
          <div className="flex justify-center mt-4 space-x-4">
            <button className="text-blue-500">
              <FcGoogle />
            </button>
            <button className="text-blue-500">
              <FaFacebook />
            </button>
            <button className="text-blue-500">
              <FaXTwitter />
            </button>
          </div>
        )}

        {/* Signup Link (only visible in login mode) */}
        {!signupMode && (
          <div className="mt-4 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={toggleSignupMode}
            >
              Sign Up
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default AuthPage;
