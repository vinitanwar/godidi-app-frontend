"use client";

import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { baseurl } from "../component/urls";
import { io } from "socket.io-client";
axios.defaults.withCredentials=true

const socket = io('http://localhost:8000')



const ChatBot = ({id}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State for image file
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for file input
const [allmessage,setAllmessage]=useState()
  // const API_BASE_URL = "http://godidi-app-back.onrender.com/api";

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Fetch initial questions and flatten suggestions
  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     try {
  //       const questionsResponse = await axios.get(`${API_BASE_URL}/questions`);
  //       const initialMessages = questionsResponse.data.map((q) => ({
  //         id: q._id,
  //         text: q.text,
  //         isBot: true,
  //       }));
  //       setMessages(initialMessages);

  //       const allSuggestions = questionsResponse.data.flatMap((q) => q.suggestions);
  //       setSuggestions(allSuggestions);
  //     } catch (error) {
  //       console.error("Error fetching initial data:", error);
  //       setMessages([{ id: Date.now(), text: "Error loading chat data.", isBot: true }]);
  //     }
  //   };

  //   fetchInitialData();
  //   scrollToBottom();
  // }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending message with optional image
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
const response= await  axios.post(`${baseurl}/api/message/sendmessage`,{message:inputMessage,messageid:id})
if(response.data.success){
  socket.emit("sendMessage",{ room:id , senderType:"user",message:inputMessage})
  setInputMessage("")
}

    // try {
    //   // Prepare FormData for text and image
    //   const formData = new FormData();
    //   formData.append("text", text);
    //   if (selectedImage) {
    //     formData.append("image", selectedImage);
    //   }

    //   // Post to backend
    //   const userMessageResponse = await axios.post(`${API_BASE_URL}/user-messages`, formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   const newUserMessage = {
    //     id: userMessageResponse.data._id,
    //     text: userMessageResponse.data.text,
    //     image: userMessageResponse.data.image ? `${API_BASE_URL}/${userMessageResponse.data.image}` : null, // Full URL for image
    //     isBot: false,
    //   };
    //   setMessages((prev) => [...prev, newUserMessage]);
    //   setInputMessage("");
    //   setSelectedImage(null); // Clear image after sending
    //   if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input

    //   // Simulate bot response
    //   setIsTyping(true);
    //   const questionsResponse = await axios.get(`${API_BASE_URL}/questions`);
    //   const randomQuestion = questionsResponse.data[Math.floor(Math.random() * questionsResponse.data.length)];
    //   const botResponse = {
    //     id: `${randomQuestion._id}-${Date.now()}`,
    //     text: randomQuestion.response,
    //     isBot: true,
    //   };

    //   setTimeout(() => {
    //     setMessages((prev) => [...prev, botResponse]);
    //     setIsTyping(false);
    //   }, 1000);
    // } catch (error) {
    //   console.error("Error sending message:", error);
    //   setMessages((prev) => [
    //     ...prev,
    //     { id: Date.now(), text: "Sorry, I couldn’t process that.", isBot: true },
    //   ]);
    //   setIsTyping(false);
    // }
  };



  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };




const fetchallMessage=async()=>{
  
  const response= await  axios.get(`${baseurl}/api/message/allmessage/${id}`)
  if(response.data.success){
  setAllmessage(response.data.allMesasge)
  }
}


useEffect(()=>{
  fetchallMessage()
  socket.emit("joinroom", id);
  socket.on("message", (msg) => {
    console.log(msg)
    if(msg.message){    setAllmessage((prevMessages) => [...prevMessages, msg]);
    }
  });
  return () => {
    socket.off("message");
  };
 
},[ ])



  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden h-[80vh] flex flex-col">
        <div className="bg-pink-500 p-4 text-white">
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>

        <div ref={chatContainerRef} className="flex-1 h-full overflow-y-auto p-4 space-y-4">
          {allmessage?.map((message,index) => (
            <div
              key={index}
              className={`flex ${message.senderType !=="user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message?.senderType !=="user"  ? "bg-gray-100 text-gray-800" : "bg-pink-500 text-white"
                }`}
              >
                <p className="text-sm">{message.message}</p>
               
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <BsThreeDots className="text-gray-500 animate-bounce" />
              </div>
            </div>
          )}
        </div>


       <div className="p-4 border-t">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 max-h-32"
              rows="1"
            />
          
            <button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;