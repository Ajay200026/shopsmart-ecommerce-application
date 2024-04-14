import { Switch } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../login-Signup/AuthContext";

const ShippingAddress = ({ onAddressSaved }) => {
  const { user, updateShippingAddress } = useAuth();
  const [isShippingAddressSameAsBilling, setIsShippingAddressSameAsBilling] =
    useState(false);
  const [submittedFormData, setSubmittedFormData] = useState(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (user && user.shippingAddress) {
      setSubmittedFormData(user.shippingAddress);
      setShowForm(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If shipping address is already available, show confirmation message
    if (submittedFormData) {
      setShowForm(false);
      return;
    }

    const formData = new FormData(e.target);
    const shippingAddress = {
      email: formData.get("email"),
      phone: formData.get("phone"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
    };

    try {
      const response = await axios.post("http://localhost:3001/api/checkout", {
        shippingAddress,
      });
      console.log("Shipping address saved:", response.data);
      // Store submitted form data
      setSubmittedFormData(shippingAddress);
      updateShippingAddress(shippingAddress);
      // Show success message using SweetAlert
      onAddressSaved(shippingAddress);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Shipping address saved successfully!",
      });
      // Hide the form
      setShowForm(false);
      // Handle success
    } catch (error) {
      console.error("Error saving shipping address:", error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save shipping address. Please try again later.",
      });
      // Handle error
      onAddressSaved(false);
    }
  };

  const handleAddNewAddress = () => {
    setShowForm(true);
    setSubmittedFormData(null); // Clear previous submitted form data
  };

  const ConfirmationLetter = () => {
    if (!submittedFormData) return null;

    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Confirmation Letter</h2>
        <p>
          Dear {submittedFormData.firstName} {submittedFormData.lastName},
        </p>
        <p>
          Thank you for providing your shipping address. Here are the details we
          received:
        </p>
        <ul className="mt-2">
          {Object.entries(submittedFormData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddNewAddress}
          className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Address
        </button>
        <p>We appreciate your business.</p>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-xl font-bold mb-6">Shipping Address</h1>

      <div className="bg-white rounded-lg  border-r-2 p-6 mt-[-1rem]">
        {showForm ? (
          <div>
            <div className="mb-4">
              <Switch
                checked={isShippingAddressSameAsBilling}
                onChange={setIsShippingAddressSameAsBilling}
                className={`${
                  isShippingAddressSameAsBilling ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              >
                <span
                  className={`${
                    isShippingAddressSameAsBilling
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
              <span className="ml-3 font-medium text-gray-700">
                Shipping address is the same as billing address
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  h-[30px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        ) : (
          <ConfirmationLetter />
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
