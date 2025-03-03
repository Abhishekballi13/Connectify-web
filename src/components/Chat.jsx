import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ErrorPage from "./ErrorPage";

const Chat = () => {
    const { targetUserId } = useParams();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [targetUserNotFound, setTargetUserNotFound] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);
    const [page,setPage] = useState(1);
    const [hasMore,setHasMore] = useState(true);
    const chatContainerRef = useRef(null);
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    useEffect(() => {
        const fetchLastSeen = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/last-seen/${targetUserId}`);
                setLastSeen(response.data.lastSeen);
            } catch (err) {
                console.log("Error fetching last Seen", err);
            }
        };

        fetchLastSeen();
    }, [targetUserId, onlineStatus]);

    useEffect(() => {
        fetchChatMessages();
    }, []);

    // Auto-scroll chat container when a new message is added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [newMessage]); 
    
    //this one is handling scroll when new message arrives
    //we are showing 15 messages at a time. 
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = 1220;
        }
    }, [messages.length]);// Use messages.length instead of newMessage to avoid unnecessary updates

    useEffect(() => {
        if (!userId) return;

        const newSocket = createSocketConnection();
        setSocket(newSocket);

        newSocket.emit("joinChat", { userId, targetUserId });

        newSocket.on("error", ({ errorMessage }) => {
            console.log(errorMessage);
            setTargetUserNotFound(true);
        });

        newSocket.emit("userOnline", { userId, targetUserId });

        newSocket.on("updateOnlineStatus", ({ status }) => {
            setOnlineStatus(status);
        });

        newSocket.on("messageReceived", ({ senderId, firstName, lastName, text, status }) => {
            setMessages((prevMessages) => [...prevMessages, { senderId, firstName, lastName, text, status }]);
        });

        return () => {
            newSocket.emit("userOffline", { userId });
            newSocket.disconnect();
        };
    }, [userId, targetUserId]);

    useEffect(() => {
        if (!socket) return;

        const handleOnlineStatusUpdate = ({ status }) => {
            setOnlineStatus(status);
        };

        const handleMessageStatusUpdate = ({ messageId, status }) => {
            setMessages((prevMessages) =>
                prevMessages.map((msg) => (msg._id === messageId ? { ...msg, status } : msg))
            );
        };

        socket.on("updateOnlineStatus", handleOnlineStatusUpdate);
        socket.on("updateMessageStatus", handleMessageStatusUpdate);

        return () => {
            socket.off("updateOnlineStatus", handleOnlineStatusUpdate);
            socket.off("updateMessageStatus", handleMessageStatusUpdate);
        };
    }, [socket]);

    // Mark messages as "seen" when chat opens
    useEffect(() => {
        if (!socket || !targetUserId) return;
        socket.emit("messageSeen", { userId, targetUserId });
    }, [socket, targetUserId, userId, messages.length]);

    const fetchChatMessages = async (page=1) => {
        if(!hasMore) return;
        try {
            const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}?page=${page}&limit=15`, { withCredentials: true });
            // console.log(chat.data.messages);
            const chatMessages = chat?.data?.messages.map((msg) => ({
                senderId: msg?.senderId?._id,
                firstName: msg?.senderId?.firstName,
                lastName: msg?.senderId?.lastName,
                text: msg?.text,
                status: msg?.status,
            }));
            const msg = [...chatMessages,...messages];
            setMessages(msg);
            setHasMore(chat.data.hasMore);
        } catch (err) {
            console.error("Error fetching chat messages", err);
        }
    };

    const sendMessage = () => {
        if (!socket) return;
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    const formatLastSeen = (timestamp) => {
        if (!timestamp) return "Unavailable";

        const lastSeenDate = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - lastSeenDate) / 1000 / 60);

        if (diff < 1) return "Just Now";
        if (diff < 60) return `${diff} min ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
        return lastSeenDate.toLocaleString();
    };


    const handleScroll = () => {
        const chatContainer = chatContainerRef.current;
        if(chatContainer.scrollTop===0 && hasMore){
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                fetchChatMessages(nextPage);
                return nextPage;
            });
        }
    }

    if (targetUserNotFound) return <ErrorPage message="You are not connected with this user!" />;

    return (
        <div className="w-full sm:w-1/2 mx-auto border border-gray-400 m-5 h-[70vh] flex flex-col relative">
            <div className="flex justify-between items-center p-5 border-b border-gray-600 sm:p-3">
                <h1>Chat</h1>
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${onlineStatus ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className="text-white">
                        {onlineStatus ? "Online" : `Last seen: ${formatLastSeen(lastSeen)}`}
                    </span>
                </div>
            </div>

            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-scroll p-5 scrollbar">
                {messages.length > 0 &&
                    messages.map((msg, index) => (
                        <div key={index}>
                            <div className={"chat " + (user?.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                                <div className="chat-header">{msg.firstName + " " + msg.lastName}</div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">
                                    {msg.senderId === userId && (
                                        <>
                                            {msg.status === "sent" && "✔"}
                                            {msg.status === "seen" && <span className="text-blue-500">✔✔</span>}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-500 text-white rounded p-2"
                />
                <button onClick={sendMessage} className="btn btn-secondary">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
