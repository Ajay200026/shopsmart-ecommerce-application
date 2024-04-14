import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

const OrderGraphs = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Process order data to generate datasets for the charts
  const processOrderData = () => {
    const orderDates = [];
    const orderCounts = [];
    const totalPrices = [];

    let totalOrders = 0;
    let totalPrice = 0;

    orderData.forEach((order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      totalOrders++;
      totalPrice += parseFloat(order.amount);

      orderDates.push(orderDate);
      orderCounts.push(totalOrders);
      totalPrices.push(totalPrice);
    });

    return { orderDates, orderCounts, totalPrices };
  };

  const { orderDates, orderCounts, totalPrices } = processOrderData();

  const orderCountChartData = {
    labels: orderDates,
    datasets: [
      {
        label: "Number of Orders",
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointRadius: 4,
        pointHoverRadius: 6,
        data: orderCounts,
      },
    ],
  };

  const totalPriceChartData = {
    labels: orderDates,
    datasets: [
      {
        label: "Total Price",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: totalPrices,
      },
    ],
  };

  return (
    <div className="flex">
      <div className="w-[500px]">
        <h2>Number of Orders Over Time</h2>
        <Line className="w-[100px]" data={orderCountChartData} />
      </div>
      <div className="w-[500px]">
        <h2>Total Price of Orders Over Time</h2>
        <Bar className="w-[100px]" data={totalPriceChartData} />
      </div>
    </div>
  );
};

export default OrderGraphs;
