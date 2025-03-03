import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllUsers?page=${currentPage}&limit=${usersPerPage}`, {
        withCredentials: true,
      });
      setUsers(res?.data.users);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/admin/users/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 hidden md:block">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <ul className="mt-4 space-y-2">
          <li className="p-2 rounded bg-gray-700">View Users</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <h1 className="text-2xl font-semibold mb-4">All Users</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-2">{user.emailId}</td>
                  <td className="px-4 py-2">
                    <button className="bg-red-500 text-white px-3 py-1 rounded mr-2" 
                      onClick={() => deleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button 
            className="px-4 py-2 mx-2 bg-black text-white rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-black">Page {currentPage}</span>
          {/* disable previous when currentPage is equal to 1 and disable next one that is last page*/}
          <button 
            className="px-4 py-2 mx-2 bg-black text-white rounded"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={users.length<10}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
