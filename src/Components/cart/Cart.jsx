import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../checkout/CheckoutContext";
import { CartContext } from "./CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);
  const { addOrderItem, updateTotalPrice } = useCheckout();
  const [loading, setLoading] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.offerPrice * item.quantity,
      0
    );
  };

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleIncreaseQuantity = (index) => {
    increaseQuantity(index);
  };

  const handleDecreaseQuantity = (index) => {
    decreaseQuantity(index);
  };

  const handleCheckout = () => {
    setLoading(true);
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setLoading(false);
      cartItems.forEach((item) => {
        addOrderItem(item);
      });
      updateTotalPrice();

      navigate("/checkoutpage");
    }, 2000);
  };

  return (
    <div className="container mx-auto mt-[5rem] ">
      <h1 className="text-2xl font-semibold mb-4 font-mono">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img src="/4610092.webp" alt="emptycart" />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="grid grid-cols-1 gap-[7rem] justify-center">
            {cartItems.map((item, index) => (
              <div className="  h-[100px]  ">
                <div
                  key={index}
                  className="w-[110%] shadow-md rounded-lg overflow-hidden flex items-center "
                >
                  <div className="flex">
                    <img
                      className="w-[100px] h-40 object-cover object-center"
                      src={item.imageURL}
                      alt={item.productName}
                    />
                    <div className="p-4 flex items-center gap-3">
                      <h2 className="text-lg font-semibold mb-2">
                        {item.productName}
                      </h2>
                      {item.description && (
                        <p className="text-lg font-semibold mb-2">
                          {item.description}
                        </p>
                      )}
                      <p className="text-gray-700">
                        <strong>Price:</strong> {item.offerPrice}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecreaseQuantity(index)}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(index)}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total border w-[400px] h-[210px] ml-[12rem] flex  flex-col items-center justify-center rounded-lg ">
            <p className="total-header py-3 font-extrabold capitalize">
              Order Price: ₹{getTotalPrice()}
            </p>
            {loading ? (
              <div className="loader">
                {" "}
                <img
                  className="w-[150px] h-[80px]"
                  src="/loader.svg"
                  alt="svg"
                />
              </div> // SVG loading animation
            ) : (
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
