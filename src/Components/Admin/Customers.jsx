import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Customers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          headers: {
            Authorization: localStorage.getItem("token"), // Assuming you store the token in localStorage
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSuspend = async (userId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, suspend it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        // If deletion is successful, update the user list
        setUsers(users.filter((user) => user.id !== userId));
        Swal.fire("Suspended!", "The user has been suspended.", "success");
      } catch (error) {
        console.error("Error suspending user:", error);
        Swal.fire("Error", "Failed to suspend user.", "error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      {users.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">User Type</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border border-gray-300">{user.name}</td>
                <td className="p-2 border border-gray-300">{user.email}</td>
                <td className="p-2 border border-gray-300">{user.userType}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleSuspend(user.id)}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No customers found.</div>
      )}
    </div>
  );
}

export default Customers;
