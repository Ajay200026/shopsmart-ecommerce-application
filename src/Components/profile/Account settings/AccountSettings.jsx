import React, { useEffect, useState } from "react";

const AccountSettings = () => {
  // State for user data
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
    email: "example@example.com",
    photo: null,
  });

  // State for edit mode
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Load user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    console.log("Stored User Data:", storedUserData); // Log stored user data
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const photoURL = URL.createObjectURL(file); // Get URL from uploaded file
    console.log("Photo URL:", photoURL); // Log photo URL
    setUserData({
      ...userData,
      photo: photoURL, // Store image URL in local storage
    });
  };

  // Function to handle Save button click
  const handleSave = () => {
    // Save user data to local storage
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Saved User Data:", userData); // Log saved user data
    // Exit edit mode
    setEditMode(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      <div className="flex items-center justify-center mb-4">
        <label htmlFor="photo" className="relative cursor-pointer">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
            {userData.photo ? (
              <img
                src={userData.photo} // Load image URL directly from state
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                <span>+</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="block mb-2">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          className="py-2 px-4 bg-gray-200 rounded-lg w-full"
          disabled={!editMode}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block mb-2">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          className="py-2 px-4 bg-gray-200 rounded-lg w-full"
          disabled={!editMode}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block mb-2">
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          className="py-2 px-4 bg-gray-200 rounded-lg w-full"
          disabled={!editMode}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email ID:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="py-2 px-4 bg-gray-200 rounded-lg w-full"
          disabled={!editMode}
        />
      </div>
      <div>
        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
