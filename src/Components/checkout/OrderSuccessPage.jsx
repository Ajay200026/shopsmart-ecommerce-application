import React, { useEffect, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = ({ getTotalPrice }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true); // State for showing loader
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const handleOrderPlaced = () => {
    setShowAlert(true);
  };

  // Generate a random order ID
  const generateOrderId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    setOrderId(generateOrderId());

    // Simulate loading with a delay before redirecting to the home screen
    const redirectTimer = setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
      const redirectTimer2 = setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect after 2 seconds
      return () => clearTimeout(redirectTimer2);
    }, 3000); // Delay for 3 seconds

    // Clear the timer on component unmount
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          {/* SVG Illustration */}
          <svg
            className="w-24 h-24 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully</h2>
          <p className="text-gray-600 text-center mb-6">
            Thank you for your order! Your items will be delivered soon.
          </p>
          {/* Order Details */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <p className="text-gray-600">Order Number: #{orderId}</p>
            <p className="text-gray-600">Total: ₹{totalPrice}</p>
            <p className="text-gray-600">
              Total: ₹
              {typeof getTotalPrice === "function" ? getTotalPrice() : 0}
            </p>
          </div>
        </div>
      </div>
      {/* Loader */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 opacity-75 flex justify-center items-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24">
            <svg
              className="w-24 h-24 text-green-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <style>
                {`
      .spinner_jCIR {
        animation: spinner_B8Vq .9s linear infinite;
        animation-delay: -.9s;
      }
      .spinner_upm8 { animation-delay: -.8s; }
      .spinner_2eL5 { animation-delay: -.7s; }
      .spinner_Rp9l { animation-delay: -.6s; }
      .spinner_dy3W { animation-delay: -.5s; }
      @keyframes spinner_B8Vq {
        0%, 66.66% { animation-timing-function: cubic-bezier(0.36,.61,.3,.98); y: 6px; height: 12px; }
        33.33% { animation-timing-function: cubic-bezier(0.36,.61,.3,.98); y: 1px; height: 22px; }
      }
    `}
              </style>
              <rect
                className="spinner_jCIR"
                x="1"
                y="6"
                width="2.8"
                height="12"
              />
              <rect
                className="spinner_jCIR spinner_upm8"
                x="5.8"
                y="6"
                width="2.8"
                height="12"
              />
              <rect
                className="spinner_jCIR spinner_2eL5"
                x="10.6"
                y="6"
                width="2.8"
                height="12"
              />
              <rect
                className="spinner_jCIR spinner_Rp9l"
                x="15.4"
                y="6"
                width="2.8"
                height="12"
              />
              <rect
                className="spinner_jCIR spinner_dy3W"
                x="20.2"
                y="6"
                width="2.8"
                height="12"
              />
            </svg>
          </div>
        </div>
      )}
      {/* SweetAlert for Order Placed Message */}
      {showAlert && (
        <SweetAlert
          success
          title="Order Placed!"
          onConfirm={() => setShowAlert(false)}
        >
          Your order has been placed successfully. You will be redirected to the
          home screen shortly.
        </SweetAlert>
      )}
    </div>
  );
};

export default OrderSuccessPage;
