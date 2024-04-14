import React from "react";
import { useCheckout } from "./CheckoutContext";

const OrderDetails = () => {
  const { orderItems } = useCheckout();

  return (
    <div className="flex flex-col justify-center py-4 bg-gray-200 rounded-lg mt-[10rem] shadow-md items-center h-[200px]">
      <h2 className="font-bold text-xl">Order Details</h2>
      <ul className="flex">
        {orderItems.map((item) => (
          <li className="flex flex-col mb-3" key={item.id}>
            <span className="mb-3 mt-3 text-blue-600 font-semibold">
              {item.productName}
            </span>
            <span className="flex items-center gap-4">
              <span className="text-xl text-orange-500 font-semibold">
                Order Price:
              </span>
              ₹{item.offerPrice}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
