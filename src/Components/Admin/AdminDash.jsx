import React, { useState } from "react";
import Component from "../profile/Component";
import Customers from "./Customers";
import OrderGraphs from "./OrderGraphs";
import Orders from "./Orders";
import ProductDetails from "./ProductDetails";

const Sidebar = ({ setActiveContent, handleLogout }) => {
  return (
    <div className="w-1/5 h-[100vh] bg-gradient-to-r from-slate-300 to-slate-500 p-4 font-extrabold rounded-md fixed">
      <ul>
        <li
          onClick={() => setActiveContent("Dashboard")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Dashboard
        </li>
        <li
          onClick={() => setActiveContent("Orders")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Orders
        </li>
        <li
          onClick={() => setActiveContent("Products")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Products
        </li>
        <li
          onClick={() => setActiveContent(" Customers")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Customers
        </li>
        <li
          onClick={() => setActiveContent("Analytics")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          {/*Analytics*/}
        </li>
        <li
          onClick={() => setActiveContent("Settings")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          {/*Settings*/}
        </li>
      </ul>
    </div>
  );
};

const MainContent = ({ activeContent }) => {
  const getContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <div className=" w-[1140px] ml-[22rem]">
            <OrderGraphs />
            <div>
              <Orders />
            </div>
          </div>
        );
      case "Orders":
        return (
          <div className="mt-[-1rem] h-[95vh]  overflow-scroll  w-[1140px] ml-[21.5rem]">
            <Orders />
          </div>
        );
      case "Products":
        return (
          <div className="w-[1140px] ml-[22rem]">
            <div className=" ">
              <div className="  bg-gray-100 flex justify-center items-center rounded-md"></div>
              <div className="flex overflow-x-auto overflow-y-auto h-[90vh]">
                <ProductDetails />
              </div>
            </div>
          </div>
        );
      case " Customers":
        return (
          <div className="w-[1140px] ml-[23rem]">
            <Customers />
          </div>
        );
      case "Analytics":
        return <div>Saved Address Content</div>;
      case " Settings":
        return (
          <div className="w-[1140px] ml-[23rem]">
            <Component />
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="w-3/3 bg-gray-100 p-4">{getContent()}</div>;
};

const AdminDash = () => {
  const [activeContent, setActiveContent] = useState("Dashboard");

  const handleLogout = () => {
    // Implement logout functionality here
    // For example, clear user session, redirect to login page, etc.
    console.log("Logged out!");
  };

  return (
    <div className="flex">
      <Sidebar
        setActiveContent={setActiveContent}
        handleLogout={handleLogout}
      />
      <MainContent activeContent={activeContent} />
    </div>
  );
};

export default AdminDash;
