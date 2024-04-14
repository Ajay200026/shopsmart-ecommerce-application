import React from "react";

const OrderHistory = () => {
  // Fetch order history data from API or use mock data
  const orders = [
    { id: 1, date: "2024-03-01", total: 50.0 },
    { id: 2, date: "2024-02-15", total: 75.0 },
    { id: 3, date: "2024-01-10", total: 100.0 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <span>Order ID: {order.id}</span>
            <span>Date: {order.date}</span>
            <span>Total: ${order.total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
