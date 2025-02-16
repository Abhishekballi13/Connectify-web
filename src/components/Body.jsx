import {Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      //means user is not logged in ,so move to login page.
      if(error.status===401){
        navigate("/login");
      }
       console.log(error);
    }
  }
  
  //adding user to our store as soon as our component is loaded.
  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
  },[])

  return (
    <div>
    {/* providing outlet in body,as we created child elements of body in app.jsx */}
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body