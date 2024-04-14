import axios from "axios";
import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../login-Signup/AuthContext";

const TotalOfferPrice = () => {
  const [totalOfferPrice, setTotalOfferPrice] = useState(0);
  const { user } = useAuth();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchTotalOfferPrice();
  }, [user]);

  useEffect(() => {
    if (totalOfferPrice > 0 && chartRef.current) {
      updateChart(totalOfferPrice);
    }
  }, [totalOfferPrice]);

  const fetchTotalOfferPrice = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/seller/${user.userName}`
      );
      const products = response.data;
      let totalPrice = 0;

      // Calculate total offer price for products where user name and supplier name are equal
      products.forEach((product) => {
        totalPrice += parseFloat(product.offerPrice);
      });

      setTotalOfferPrice(totalPrice);
    } catch (error) {
      console.error("Error fetching total offer price:", error);
    }
  };

  const updateChart = (totalPrice) => {
    const ctx = chartRef.current.getContext("2d");

    // Check if a chart instance already exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Earnings"],
        datasets: [
          {
            label: "Total Earnings",
            data: [totalPrice.toFixed(2)],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="flex items-center justify-start gap-10 ml-[-16rem]">
      <div className="w-[400px] font-extrabold font-mono bg-gradient-to-r from-teal-400 to-indigo-600 border rounded-md py-2 px-4 h-[200px] flex flex-col justify-center items-center">
        <h2 className=" text-white text-[2rem]">Total Earnings</h2>
        <p className=" text-[1.5rem]">Rupees: {totalOfferPrice.toFixed(2)}</p>
      </div>
      <div>
        <canvas
          className=" bg-gradient-to-r from-amber-200 to-yellow-500 border rounded-md w-[400px] py-2 px-4 "
          ref={chartRef}
        />
      </div>
    </div>
  );
};

export default TotalOfferPrice;
