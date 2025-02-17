import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./userCard";


const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    //if feed already present dont get the feed
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL+"/feed",{
        withCredentials:true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])

  return (
    feed && feed.map((f)=>(
       <div className="flex justify-center my-10">
        <UserCard user={f}/>
        </div>
    ))
  )
}

export default Feed