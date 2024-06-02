import React, { useState } from "react";
import { useAuth } from "../../login-Signup/AuthContext";

const UserShippingAddress = () => {
  const { user, updateShippingAddress } = useAuth();
  const { shippingAddress } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState({ ...shippingAddress });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateShippingAddress(editedAddress);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress({ ...editedAddress, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 px-5 rounded-md shadow-md  py-5">
      <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
      {shippingAddress ? (
        // Render address details if shippingAddress exists
        isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="email"
              value={editedAddress.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="phone"
              value={editedAddress.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="firstName"
              value={editedAddress.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={editedAddress.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="address"
              value={editedAddress.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="city"
              value={editedAddress.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="state"
              value={editedAddress.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="zip"
              value={editedAddress.zip}
              onChange={handleChange}
              placeholder="Zip"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p>Email: {shippingAddress.email}</p>
            <p>Phone: {shippingAddress.phone}</p>
            <p>First Name: {shippingAddress.firstName}</p>
            <p>Last Name: {shippingAddress.lastName}</p>
            <p>Address: {shippingAddress.address}</p>
            <p>City: {shippingAddress.city}</p>
            <p>State: {shippingAddress.state}</p>
            <p>Zip: {shippingAddress.zip}</p>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        )
      ) : (
        // Display message if shippingAddress is not found
        <p>No shipping address found</p>
      )}
    </div>
  );
};

export default UserShippingAddress;
