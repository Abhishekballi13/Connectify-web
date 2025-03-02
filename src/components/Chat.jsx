import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ErrorPage from "./ErrorPage";


const Chat = () => {
    const {targetUserId} = useParams();
    const [newMessage,setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [onlineStatus,setOnlineStatus] = useState(false);
    const [targetUserNotFound,setTargetUserNotFound] = useState(false);
    const chatContainerRef = useRef(null);
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    
    useEffect(()=>{
        fetchChatMessages();
    },[]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    useEffect(()=>{
        if(!userId) return;

        const newSocket = createSocketConnection();
        setSocket(newSocket);

        newSocket.emit("joinChat",{userId,targetUserId});
        
        //this means the user are not connected to each other
        newSocket.on("error",({errorMessage})=>{
            console.log(errorMessage);
            setTargetUserNotFound(true);
        })
        
        //checking wether the target user is online or not.
        newSocket.emit("userOnline", { userId,targetUserId});

        newSocket.on("updateOnlineStatus", ({ status }) => {
            console.log(status);
          setOnlineStatus(status);
        });
       
        newSocket.on("messageReceived",({firstName,text}) => {
          setMessages((prevMessages) => [...prevMessages,{firstName,text}])
       })

       return () => {
        newSocket.emit("userOffline", { userId });
        newSocket.disconnect();
       }
    },[userId,targetUserId])

    useEffect(()=>{
      if(socket){
        socket.on("updateOnlineStatus", ({ status }) => {
            console.log(status);
          setOnlineStatus(status);
        });
      }
    },[socket])

    const fetchChatMessages = async() => {
        const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{ withCredentials :true });
        const chatMessages = chat?.data?.messages.map(msg => ({
            firstName: msg?.senderId?.firstName,
            lastName: msg?.senderId?.lastName,
            text : msg?.text
        }));
        setMessages(chatMessages);
    }

    const sendMessage = () => {
        if(!socket) return;
        socket.emit("sendMessage",{
            firstName : user.firstName,
            lastName : user.lastName,
            userId,
            targetUserId,
            text:newMessage,
        })
        setNewMessage("");
    }
    console.log(targetUserNotFound);
    if (targetUserNotFound) return <ErrorPage message="You are not connected with this user!" />;

  return (
    <div className="w-full sm:w-1/2 mx-auto border border-gray-400 m-5 h-[70vh] flex flex-col relative">
        <div className="flex justify-between items-center p-5 border-b border-gray-600 sm:p-3">
            <h1>Chat</h1>
            <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${onlineStatus ? "bg-green-500" : "bg-red-500"}`}></span>
                <span className="text-white">{onlineStatus ? "Online" : "Offline"}</span>
            </div>
        </div>

        <div ref={chatContainerRef} className="flex-1 overflow-scroll p-5 scrollbar">
            {messages.length>0 && messages.map((msg,index)=>(
                <div key={index}>
                    <div className={"chat "+ (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                        <div className="chat-header">
                            {msg.firstName +" "+ msg.lastName}
                            <time className="text-xs opacity-50">2 hours ago</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
            <input 
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                className="flex-1 border border-gray-500 text-white rounded p-2"
            />
            <button 
                onClick={sendMessage}
                className="btn btn-secondary"
            >
                Send
            </button>
        </div>
    </div>
  )
}

export default Chat;
