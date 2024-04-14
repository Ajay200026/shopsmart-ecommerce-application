import React, { useState } from "react";
import AccountSettings from "./Account settings/AccountSettings";
import OrderHistory from "./orderhistory/OrderHistory";

const Sidebar = ({ setActiveContent, handleLogout }) => {
  return (
    <div className="w-1/5 h-[90vh] bg-gray-200 p-4">
      <ul>
        <li
          onClick={() => setActiveContent("accountSettings")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Account Settings
        </li>
        <li
          onClick={() => setActiveContent("changePassword")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Change Password
        </li>
        <li
          onClick={() => setActiveContent("legalNotice")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Legal Notice
        </li>
        <li
          onClick={() => setActiveContent("orderHistory")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Order History
        </li>
        <li
          onClick={() => setActiveContent("savedAddress")}
          className="cursor-pointer hover:bg-gray-300 py-2 px-4"
        >
          Saved Address
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

const MainContent = ({ activeContent }) => {
  const getContent = () => {
    switch (activeContent) {
      case "accountSettings":
        return (
          <div>
            <AccountSettings />
          </div>
        );
      case "changePassword":
        return <div>Change Password Content</div>;
      case "legalNotice":
        return <div>Legal Notice Content</div>;
      case "orderHistory":
        return (
          <div>
            <OrderHistory />
          </div>
        );
      case "savedAddress":
        return <div>Saved Address Content</div>;
      default:
        return null;
    }
  };

  return <div className="w-3/4 bg-gray-100 p-4">{getContent()}</div>;
};

const ProfilePage = () => {
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

export default ProfilePage;
