import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    //basically you are telling here to connect here to backend system.

    // if(location.hostname==="localhost"){
    //     return io(BASE_URL);
    // }else{
    //     return io(BASE_URL,{path:"/socket.io"});
    // }   
    return io(BASE_URL);
}
