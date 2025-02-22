import axios from "axios";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const SwipeableCards = ({user,index}) => {

  const dispatch = useDispatch();
  const x = useMotionValue(0);
  const {firstName,lastName,photoUrl,age,gender,about,_id} = user;

  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = async (event, info, userId) => { 
    const swipeThreshold = 100; // Define the swipe threshold
    const xOffset = info.offset.x; // Get how far user swiped
  
    if (Math.abs(xOffset) > swipeThreshold) {
        const status = xOffset > 0 ? "interested" : "ignored"; // Right swipe = interested, Left swipe = ignored
        
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
                withCredentials: true,
            });
            dispatch(removeFeed(userId)); // Remove the card from feed
            
        } catch (err) {
            console.log(err);
        }
    }
}

  return (
    <motion.div
      className="absolute w-72 h-96 flex justify-center items-center"
      style={{ x, rotate, zIndex: index }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => handleDragEnd(event, info,_id)}
    >
      <motion.img
        className="w-full h-full object-cover rounded-lg shadow-lg"
        src={photoUrl}
        alt="Placeholder"
       drag="x"
       dragConstraints={{ left: 0, right: 0 }}
      />
      <div className={(photoUrl==="https://image.pngaaa.com/853/3873853-middle.png"?"text-black ":"text-white ") + "absolute bottom-2 left-1 p-3 rounded-md w-[90%]"}>
        <h1 className="text-lg font-bold">{firstName+" "} {lastName+" "} {age ? ` ${age}` : ""}</h1>
        {gender && <p className="text-sm">{gender}</p>}
      </div>
    </motion.div>
  );
};

export default SwipeableCards;
