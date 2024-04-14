import { Switch } from "@headlessui/react";
import { default as React, useContext, useState } from "react";
import { CartContext } from "../cart/CartContext";
import OrderSuccessPage from "./OrderSuccessPage";
import RazorpayForm from "./RazorpayForm";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [paymentStep, setPaymentStep] = useState("payment");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const { cartItems } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.offerPrice * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {paymentStep === "payment" && (
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>

          {/* Order Summary */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <ul>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-12 h-12 object-cover object-center rounded-md mr-2"
                        src={item.imageURL}
                        alt={item.productName}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {item.productName}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm mr-2">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">
                        ₹{item.offerPrice * item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium">Subtotal</p>
                  <p className="text-sm font-medium">₹{getTotalPrice()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Shipping</p>
                  <p className="text-sm font-medium">Free</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">Total: ₹{getTotalPrice()}</p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>

            <div className="mb-4">
              <Switch
                checked={paymentMethod === "cashOnDelivery"}
                onChange={() => handlePaymentMethodChange("cashOnDelivery")}
                className={`${
                  paymentMethod === "cashOnDelivery"
                    ? "bg-indigo-600"
                    : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              >
                <span
                  className={`${
                    paymentMethod === "cashOnDelivery"
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
              <span className="ml-3 text-gray-700">Cash on Delivery</span>
            </div>

            <div className="mb-4">
              <Switch
                checked={paymentMethod === "razorpay"}
                onChange={() => handlePaymentMethodChange("razorpay")}
                className={`${
                  paymentMethod === "razorpay" ? "bg-indigo-600" : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              >
                <span
                  className={`${
                    paymentMethod === "razorpay"
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
              <span className="ml-3 text-gray-700">Pay with Razorpay</span>
            </div>
          </div>

          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => {
              if (paymentMethod === "cashOnDelivery") {
                setPaymentStep("orderSuccess");
              } else if (paymentMethod === "razorpay") {
                setPaymentStep("razorpay");
              }
            }}
          >
            Proceed to Payment
          </button>
        </div>
      )}
      {paymentStep === "orderSuccess" && (
        <OrderSuccessPage getTotalPrice={getTotalPrice} />
      )}
      {paymentStep === "razorpay" && <RazorpayForm />}
    </div>
  );
};

export default PaymentForm;
