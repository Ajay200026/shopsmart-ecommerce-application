import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../login-Signup/AuthContext";
import UserShippingAddress from "./savedadress/UserShippingAddress";

function Component() {
  const { user } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // New state to toggle form visibility
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if there's a saved avatar image in local storage
    const savedAvatarSrc = localStorage.getItem("avatarSrc");
    if (savedAvatarSrc) {
      setAvatarSrc(savedAvatarSrc);
    }
    if (user) {
      // Assuming user.username exists
      axios
        .get(`http://localhost:5000/user-details/${user.userName}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })

        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);

        // Save the uploaded photo to local storage
        localStorage.setItem("avatarSrc", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click();
  };

  const handleChangePasswordClick = () => {
    // Show the change password form when the button is clicked
    setShowChangePasswordForm(true);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New password and confirm password do not match!",
      });
      return;
    }

    axios
      .post(
        "http://localhost:5000/change-password",
        {
          email: userData.email,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"), // Assuming you store the token in localStorage
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password updated successfully!",
        });
        // Hide the form after submitting the password change
        setShowChangePasswordForm(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update password. Please try again later.",
        });
      });
  };

  if (!userData) return null;

  return (
    <div className="mt-[6rem]  flex  h-[80vh] items-center px-8 border shadow-md ">
      <div className=" mx-auto  rounded-xl  overflow-hidden w-[300px] bg-gray-100 ">
        <div className="md:flex">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">My Account</h2>
            <p className="text-sm text-gray-600 mb-4">
              Manage your profile information
            </p>
            <div className="flex items-center mb-4">
              <img
                src={avatarSrc}
                alt="Avatar"
                className="w-24 h-24 rounded-full cursor-pointer mr-4"
                onClick={handleAvatarClick}
              />
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div>
                <p className="text-lg font-bold">{userData.name}</p>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleChangePasswordClick} // Changed event handler
            >
              Change password
            </button>

            {/* Change password form */}
            {showChangePasswordForm && (
              <div className="mt-4">
                <div className="mt-4">
                  <label className="block mb-1">
                    Current Password
                    <input
                      type="password"
                      className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block mb-1">
                    New Password
                    <input
                      type="password"
                      className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block mb-1">
                    Confirm Password
                    <input
                      type="password"
                      className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleChangePassword}
                >
                  Submit
                </button>
              </div>
            )}

            {/* Rest of the account info... */}
          </div>
        </div>
      </div>
      <UserShippingAddress />
      <div></div>
      {/* Order history and saved items sections... */}
    </div>
  );
}

export default Component;
