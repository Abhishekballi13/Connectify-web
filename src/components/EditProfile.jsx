import {useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";



const EditProfile = ({user}) => {
  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName,setLastName] = useState(user.lastName)
  const [age,setAge] = useState(user.age);
  const [about,setAbout] = useState(user.about);
  const [gender,setGender] = useState(user.gender);
  const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();
  const [showToast,setShowToast] = useState(false);

  const [error,setError] = useState("");

  const saveProfile = async () => {
    try{
       const res = await axios.patch(BASE_URL+'/profile/edit',{
        firstName,lastName,age,gender,about,photoUrl,
       },{ withCredentials:true,})
       //dispatching action add user ,as we have to update the user,with new data
       dispatch(addUser(res?.data?.data));
       //toast that will pop up when user edits his profile successfully
       setShowToast(true);
       //toast will disappear after 3 sec
       setTimeout(()=>{
         setShowToast(false);
       },3000);
    }catch(err){
        setError(err.message);
    }
  }
 

  return (
    <>
    <div className="flex justify-center my-20"> 
        <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name :</span>
              </div>
              <input 
              type="text" 
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setFirstName(e.target.value)}
               />
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name :</span>
              </div>
              <input 
              type="text"
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setLastName(e.target.value)}
               />
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age :</span>
              </div>
              <input 
              type="text"
              value={age}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setAge(e.target.value)}
               />
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
                <span className="label-text">Gender :</span>
              </div>
              <div className="label">
                    <select className="select w-full max-w-xs" value={gender} onChange={(e)=>setGender(e.target.value)}>
                        <option disabled selected>Pick your Gender</option>
                        <option>male</option>
                        <option>female</option>
                        <option>others</option>
                    </select>
              </div>
              {/* <input 
              type="text"
              value={gender}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setGender(e.target.value)}
               /> */}
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About :</span>
              </div>
              <input 
              type="text"
              value={about}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setAbout(e.target.value)}
               />
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">phototUrl :</span>
              </div>
              <input 
              type="text"
              value={photoUrl}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setPhotoUrl(e.target.value)}
               />
          </label>
          <p className="text-red-500">{error}</p>
        <div className="card-actions justify-center m-2">
          <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
        </div>
      </div>
    </div>
        </div>
        <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
    </div>
    {/* Toast */}
        {showToast && (<div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Profile saved successfully.</span>
      </div>
       </div>)}
    </>
    
  )
}

export default EditProfile