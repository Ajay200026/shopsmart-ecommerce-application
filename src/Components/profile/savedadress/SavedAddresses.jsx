import React from "react";

const SavedAddresses = () => {
  // Fetch saved addresses data from API or use mock data
  const addresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Main St, City, Country",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Business Ave, City, Country",
      isDefault: false,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            <span>{address.name}</span>
            <span>{address.address}</span>
            {address.isDefault && (
              <span className="text-green-500">Default</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedAddresses;
