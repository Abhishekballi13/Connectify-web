import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 mb-4 min-h-screen pb-20">
        <div className="w-full max-w-md md:mr-10">
          <div className="card bg-base-300 shadow-xl w-full rounded-lg">
            <div className="card-body">
              <h2 className="card-title text-center">Edit Profile</h2>

              <label className="form-control w-full">
                <span className="label-text">First Name:</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Last Name:</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Age:</span>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Gender:</span>
                <select
                  className="select w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled selected>
                    Pick your Gender
                  </option>
                  <option>male</option>
                  <option>female</option>
                  <option>others</option>
                </select>
              </label>

              <label className="form-control w-full">
                <span className="label-text">About:</span>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Photo URL:</span>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Text Above UserCard */}
        <div className="w-full max-w-xs md:max-w-md mt-2">
          <motion.h2
            className="text-xl md:text-2xl font-semibold text-center text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Your Profile Preview
          </motion.h2>

          <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
