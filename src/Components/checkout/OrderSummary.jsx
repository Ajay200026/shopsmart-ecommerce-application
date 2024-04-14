import React, { useContext } from "react";
import { CartContext } from "../cart/CartContext";

const OrderSummary = ({ setOrderTotal }) => {
  const { cartItems } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.offerPrice * item.quantity,
      0
    );
  };
  setOrderTotal(getTotalPrice());
  return (
    <div className="bg-white rounded-lg  p-6">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <img
                className="w-12 h-12 object-cover object-center rounded-md mr-2"
                src={item.imageURL}
                alt={item.productName}
              />
              <div>
                <p className="text-sm font-medium">{item.productName}</p>
                {item.description && (
                  <p className="text-xs text-gray-500">{item.description}</p>
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
      {/*<div className="mt-4">
        <Link
          to="/paymentform"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Checkout
        </Link>
                </div>*/}
    </div>
  );
};

export default OrderSummary;
