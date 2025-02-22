import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { addFeed, removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SwipeableCards from "./SwipeableCards";



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
      console.log(res);
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error.message);
    }
  }
  
  //for interested or rejected
  const handleButtonClick = async (status) => {
    if (feed.length === 0) return; // If no cards left, do nothing
  
    const userId = feed[feed.length-1]._id; // Get the top card's userId
   console.log(userId);
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(removeFeed(userId)); // Remove the top card from the feed
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    getFeed();
  },[])

  if(!feed) return;

  //if no users are present on feed.
  if(feed.length<=0) return <h1 className="flex justify-center">No New Users found!.</h1>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#ff416c] to-[#1e3a8a]">
  <div className="relative w-72 h-96 mb-6">
    {feed && feed.map((f, index) => (
      <SwipeableCards key={f._id} user={f} index={index} />
    ))}
  </div>
  <div className="flex gap-12 mt-6">
    <button
      className="btn btn-circle btn-error text-white text-2xl shadow-lg"
      onClick={() => handleButtonClick("ignored")}
    >
      ❌
    </button>
    <button
      className="btn btn-circle btn-success text-white text-2xl shadow-lg"
      onClick={() => handleButtonClick("interested")}
    >
      ❤️
    </button>
  </div>
</div>
  )
}

export default Feed