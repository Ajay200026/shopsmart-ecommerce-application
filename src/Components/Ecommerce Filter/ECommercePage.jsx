import React, { useState } from "react";
import LegalNotice from "../Seller/LegalNotice";
import ProductContainer from "../Seller/ProductContainer";
import TotalOfferPrice from "../Seller/TotalOfferPrice";

const Sidebar = ({ setActiveContent, handleLogout }) => {
  return (
    <div className="w-1/5 h-[100vh] bg-gradient-to-r from-slate-300 to-slate-500 p-4 font-extrabold rounded-md">
      <ul>
        <li
          onClick={() => setActiveContent("accountSettings")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Product Add Field
        </li>
        <li
          onClick={() => setActiveContent("changePassword")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Order Details
        </li>
        <li
          onClick={() => setActiveContent("legalNotice")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Profile
        </li>
        <li
          onClick={() => setActiveContent("orderHistory")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Shiped Details
        </li>
        <li
          onClick={() => setActiveContent("savedAddress")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Legal Notice
        </li>
      </ul>
    </div>
  );
};

const MainContent = ({ activeContent }) => {
  const getContent = () => {
    switch (activeContent) {
      case "accountSettings":
        return (
          <div className="">
            <div className=" ">
              <div className="  bg-gray-100 flex justify-center items-center rounded-md">
                <TotalOfferPrice />
              </div>
              <div className="flex overflow-x-auto overflow-y-auto h-[400px]">
                <ProductContainer />
              </div>
            </div>
          </div>
        );
      case "changePassword":
        return <div>Change Password Content</div>;
      case "legalNotice":
        return <div>hiii</div>;
      case "orderHistory":
        return <div>hello</div>;
      case "savedAddress":
        return (
          <div className="w-[1150px]">
            <LegalNotice />
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="w-3/3 bg-gray-100 p-4">{getContent()}</div>;
};

const EcommercePage = () => {
  const [activeContent, setActiveContent] = useState("accountSettings");

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

export default EcommercePage;
