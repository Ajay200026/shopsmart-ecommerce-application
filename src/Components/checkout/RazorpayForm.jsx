import React, { useContext, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../cart/CartContext";
import { loadRazorpay } from "./loadRazorpay";

const RazorpayForm = () => {
  const { cartItems } = useContext(CartContext);
  const [showAlert, setShowAlert] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.offerPrice * item.quantity,
      0
    );
  };

  const getItemNames = () => {
    return cartItems.map((item) => item.productName).join(", ");
  };

  const handlePayment = async () => {
    const razorpayInstance = await loadRazorpay();

    // Generate a random order ID
    const orderId = Math.random().toString(36).substr(2, 9);
    const options = {
      key: "rzp_test_dt8ARo16LbgcBt",
      // Include the total price in the amount
      amount: (getTotalPrice() * 100).toFixed(2),
      // Convert to smallest currency unit (e.g., paisa)
      currency: "INR",
      name: "Shop Smart",
      description: `Payment for ${getItemNames()}`, // Include item names in the description
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.phone,
      },
      handler: (response) => {
        console.log("Payment successful:", response);

        // Send payment details to server
        fetch("http://localhost:3000/paymentcallback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId, // Use the generated order ID
            paymentId: response.razorpay_payment_id,
            amount: getTotalPrice().toFixed(2), // Include the total price in the amount
            status: "success",
            name: customerInfo.name, // Use entered name
            email: customerInfo.email, // Use entered email
            phone: customerInfo.phone, // Use entered phone number
            product_name: getItemNames(), // Include product names
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Payment details saved:", data);
            setShowAlert(true);
            handlePaymentSuccess(response); // Trigger email sending
            setTimeout(() => {
              navigate("/ordersuccesspage", {
                state: { totalPrice: getTotalPrice() },
              });
            }, 4000);
          })
          .catch((error) => {
            console.error("Error saving payment details:", error);
            // Handle error
          });
      },
    };

    razorpayInstance.open(options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const handlePaymentSuccess = (response) => {
    try {
      // Send payment details to server
      fetch("http://localhost:4000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: customerInfo.name,
          email: customerInfo.email,
          paymentId: response.razorpay_payment_id,
          product_name: getItemNames(),
          amount: getTotalPrice(),
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Email sent successfully");
            // Optionally, show a success message or perform any other action
          } else {
            console.error("Failed to send email");
            // Optionally, show an error message or perform any other action
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          // Handle error
        });
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Pay with Razorpay</h2>
      <p className="text-gray-600 mb-4">Total Amount: ₹{getTotalPrice()}</p>
      <input
        type="text"
        name="name"
        value={customerInfo.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="mb-2"
      />
      <input
        type="email"
        name="email"
        value={customerInfo.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="mb-2"
      />
      <input
        type="tel"
        name="phone"
        value={customerInfo.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className="mb-2"
      />
      <button
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
        onClick={handlePayment}
      >
        Pay Now
      </button>
      {showAlert && (
        <SweetAlert
          success
          title="Payment Successful!"
          onConfirm={() => setShowAlert(false)}
        >
          You will be redirected to the order success page shortly.
        </SweetAlert>
      )}
    </div>
  );
};

export default RazorpayForm;
