import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../login-Signup/AuthContext";
import OrderSummary from "./OrderSummary";
import ShippingAddress from "./ShippingAddress";

// CheckoutPage component
const CheckoutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useHistory hook
  const [orderTotal, setOrderTotal] = useState(0); // Assuming orderTotal is maintained in the component state

  const handleCheckout = () => {
    if (orderTotal === 0) {
      // Show SweetAlert message indicating no orders to checkout
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There are no orders to checkout.",
      });
    } else if (user && user.shippingAddress) {
      // Proceed to payment form
      navigate("/paymentform"); // Navigate to the payment form route
    } else {
      // Show SweetAlert message indicating address not entered
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter shipping address before proceeding to checkout.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-[5rem]">
      <main className="container mx-auto flex-grow py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 px-8 mt-[-1rem]">
            <ShippingAddress />
          </div>
          <div className="md:w-1/3">
            <OrderSummary setOrderTotal={setOrderTotal} />
            {/* Change onClick handler to handleCheckout */}
            <button
              onClick={handleCheckout}
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Checkout
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2024 Shop Smart. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
