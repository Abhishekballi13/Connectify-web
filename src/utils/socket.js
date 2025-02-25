import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    //basically you are telling here to connect here to backend system.

    if(location.hostname==="localhost"){
        return io(BASE_URL);
    }else{
        return io("/",{path:BASE_URL+"/socket.io"});
    }   
    // default value of path is /socket.io/
    // return io(BASE_URL);
}
