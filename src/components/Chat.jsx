import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
    //getting path parameters
    const {targetUserId} = useParams();
    const [newMessage,setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const user = useSelector((store) => store.user);
    const userId = user?._id;
   
    useEffect(()=>{
        fetchChatMessages();
    },[]);

    useEffect(() => {
        const chatContainer = document.querySelector(".scrollbar");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);
    
    
    useEffect(()=>{
        //no user id dont create connection
        if(!userId) return;

       const newSocket = createSocketConnection();
       setSocket(newSocket);
       //as soon as the page loads ,the socket connection is made and join chat event is emitted.
       //you are sending event join,with member whom i want to chat
       newSocket.emit("joinChat",{userId,targetUserId});
       
       newSocket.on("messageReceived",({firstName,text}) => {
          console.log(firstName + " " + text);
          //just joining the messages array with the text we got, so no need to update messages state here
          setMessages((prevMessages) => [...prevMessages,{firstName,text}])
       })

       //cleanup,called when component is unmounted
       return () => {
        newSocket.disconnect();
       }
    },[userId,targetUserId])

    const fetchChatMessages = async() => {
        const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{
            withCredentials :true,
        });
        console.log("these are the messages");
        console.log(chat.data.messages);
        const chatMessages = chat?.data?.messages.map(msg => {
            return {
                firstName: msg?.senderId?.firstName,
                lastName: msg?.senderId?.lastName,
                text : msg?.text}
        })
        setMessages(chatMessages);
    }

    const sendMessage = () => {
        // const socket = createSocketConnection();
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

  return (
    <div className="w-full sm:w-1/2 mx-auto border border-gray-400 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600 sm:p-3">Chat</h1>
        <div className="flex-1 overflow-scroll p-5 scrollbar">
            {/* display messages */}
            {messages.length>0 && messages.map((msg,index)=>{
                return <div key={index}> <div className={"chat "+ (user.firstName === msg.firstName?"chat-end":"chat-start")}>
                    <div className="chat-header">
                        {msg.firstName +" "+ msg.lastName}
                        <time className="text-xs opacity-50">2 hours ago</time>
                    </div>
                    <div className="chat-bubble">{msg.text}</div>
                    <div className="chat-footer opacity-50">Seen</div>
                    </div>
                    </div>
            })}
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
            <input 
            value={newMessage}
            onChange={(e)=>setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 text-white rounded p-2"></input>
            <button 
            onClick={sendMessage}
            className="btn btn-secondary">Send</button>
        </div>
    </div>
  )
}

export default Chat