import axios from "axios"; // Import axios for making HTTP requests
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailMatched, setEmailMatched] = useState(false);
  // For checking if email exists
  const checkEmailUrl = `http://localhost:5000/check-email/${email}`;

  // For submitting the password reset request
  const forgotPasswordUrl = "http://localhost:5000/forgot-password";
  const navigate = useNavigate();
  useEffect(() => {
    const checkEmail = async () => {
      setMessage("");
      if (email.trim() === "") {
        setEmailMatched(false);
        return;
      }
      try {
        // Make a GET request to check if the email matches an email stored in the database
        const response = await axios.get(checkEmailUrl);
        setEmailMatched(response.data.matched);
        if (response.data.matched) {
          Swal.fire({
            icon: "success",
            title: "Email Found!",
            text: "You can reset your password now.",
          });
        } else {
          setMessage("Email not found");
        }
      } catch (error) {
        console.error("Error:", error.response.data);
        setMessage("Error checking email");
      }
    };
    const emailToCheck = email; // Store the current email value
    checkEmail(emailToCheck); // Pass emailToCheck to checkEmail
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    try {
      // Make a POST request to your backend `/forgot-password` endpoint
      const response = await axios.post(forgotPasswordUrl, {
        email,
        password,
      });
      setMessage(response.data); // Display success message received from the server
      // Navigate to the login page after 2 seconds
      setTimeout(() => {
        navigate("/authpage");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.response.data);
      setMessage(error.response.data); // Display error message received from the server
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[8rem]">
      <h2 className="text-xl font-bold mb-4">
        Enter the Regestered Email to reset Password:
      </h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 border h-[30px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        {emailMatched && (
          <>
            <label className="block">
              <span className="text-gray-700">New Password:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block h-[30px] border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Confirm Password:</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 h-[30px] border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </>
        )}
        <button
          type="submit"
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold flex items-center h-[30px] py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
