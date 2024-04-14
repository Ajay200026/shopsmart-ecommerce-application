// CheckoutContext.js
import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addOrderItem = (item) => {
    setOrderItems((prevItems) => [...prevItems, item]);
  };

  const removeOrderItem = (index) => {
    setOrderItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const updateTotalPrice = () => {
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.offerPrice * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  };

  const clearCheckoutData = () => {
    setOrderItems([]);
    setTotalPrice(0);
  };

  return (
    <CheckoutContext.Provider
      value={{
        orderItems,
        addOrderItem,
        removeOrderItem,
        totalPrice,
        updateTotalPrice,
        clearCheckoutData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
