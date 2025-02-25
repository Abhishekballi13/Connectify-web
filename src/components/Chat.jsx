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
    const user = useSelector((store) => store.user);
    const userId = user?._id;
   
    const fetchChatMessages = async() => {
        const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{
            withCredentials :true,
        });
       
        console.log(chat.data.messages);
        const chatMessages = chat?.data?.messages.map(msg => {
            return {
                firstName: msg?.senderId?.firstName,
                lastName: msg?.senderId?.lastName,
                text : msg?.text}
        })
        setMessages(chatMessages);
    }

    useEffect(()=>{
        fetchChatMessages();
    },[]);
    
    useEffect(()=>{
        //no user id dont create connection
        if(!userId) return;

       const socket = createSocketConnection();
       //as soon as the page loads ,the socket connection is made and join chat event is emitted.
       //you are sending event join,with member whom i want to chat
       socket.emit("joinChat",{userId,targetUserId});
       
       socket.on("messageReceived",({firstName,text}) => {
          console.log(firstName + " " + text);
          //just joining the messages array with the text we got, so no need to update messages state here
          setMessages((messages) => [...messages,{firstName,text}])
       })

       //cleanup,called when component is unmounted
       return () => {
        socket.disconnect();
       }
    },[userId,targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection();
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
    <div className="w-1/2 mx-auto border border-gray-400 m-5 h-[70vh] flex flex-col md:w-3/4 sm:w-full sm:m-2">
        <h1 className="p-5 border-b border-gray-600 sm:p-3">Chat</h1>
        <div className="flex-1 overflow-scroll p-5 scrollbar sm:p-3 scrollbar-hide">
            {/* display messages */}
            {messages.map((msg,index)=>{
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