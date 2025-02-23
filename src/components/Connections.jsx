import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";


const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try{
       const res = await axios.get(BASE_URL+"/user/connections",{
        withCredentials:true,
       })

       
       dispatch(addConnections(res?.data?.data));
    }catch(err){
        console.log(err.message);
    }
  }

  useEffect(()=>{
    fetchConnections();
  },[])

  if(!connections) return;

  if(connections.length===0) return <h1>No Connections Found</h1>

  return (
    <div className="my-20 text-center">
      <h1 className="font-bold text-white text-3xl">Connections</h1>
      {connections.map((connection,i)=>{
        const{firstName,lastName,photoUrl,age,gender,about} = connection;
        return (
            <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" key={i}>
            <div>
                <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
            </div>
            <div className="text-left mx-4">
                <h1>{firstName+""+lastName}</h1>
                  {age && gender && <p>{age+", "+gender}</p>}
                <p>{about}</p>
            </div>
            </div>
        )
      })}
    </div>
  )
}

export default Connections