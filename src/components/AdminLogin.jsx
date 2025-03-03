import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const AdminLogin = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/admin/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data)); // Store admin data in Redux if needed
      navigate("/admin/dashboard"); // Redirect to Admin Dashboard
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!!");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Admin Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={handleAdminLogin}>
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
