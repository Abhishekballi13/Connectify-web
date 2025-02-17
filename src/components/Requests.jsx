import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";


const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);

  const fetchRequests = async ()=>{
    try{
       const res = await axios.get(BASE_URL+"/user/requests/received",{
         withCredentials:true,
       })
       console.log(res);
       dispatch(addRequests(res?.data?.userRequests));
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    fetchRequests();
  },[])

  if(!requests) return;

  if(requests.length===0) return <h1>No requests found.</h1>

  return (
    <div className="my-20 text-center">
      <h1 className="font-bold text-white text-3xl">Requests</h1>
      {requests.map((request)=>{
        const{_id,firstName,lastName,photoUrl,age,gender,about} = request.fromUserId;
        return (
            <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto" key={_id}>
            <div>
                <img alt="photo" className="w-50 h-20 rounded-full" src={photoUrl}/>
            </div>
            <div className="text-left mx-4">
                <h1>{firstName+""+lastName}</h1>
                  {age && gender && <p>{age+", "+gender}</p>}
                <p>{about}</p>
            </div>
            <div className="flex flex-row">
                <button className="btn btn-primary mx-2">Reject</button>
                <button className="btn btn-secondary mx-2">Accept</button>
            </div>
            </div>
        )
      })}
    </div>
  )
}

export default Requests