"use client";

import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { baseurl } from "../component/urls";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
axios.defaults.withCredentials=true

const socket = io('http://localhost:8000')



const ChatBot = ({id}) => {
const router=useRouter()


  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State for image file
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for file input
const [allmessage,setAllmessage]=useState()
 const [user,setUser]=useState()


const [activeChatbot,setActivechatbot]=useState(false)

 const [questionans,setQuestionans]=useState()
const [questionCount,setQuestionCount]=useState(0)
const [allquestinans,setAllquestionans]=useState()


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };



  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 

const allfetchqna=async()=>{
const response = await axios.get(`${baseurl}/api/message/sendQna/${id}`)
if(response.data.success){
  
  
  setQuestionCount(response.data.allqna.length)
 

  setAllquestionans(response.data.allqna)

  
  

}
}




  const handleSendMessage = async (text) => {
    if (!text.trim()) return;


  if(activeChatbot)  {
const response= await  axios.post(`${baseurl}/api/message/sendmessage`,{message:inputMessage,messageid:id})
if(response.data.success){
  socket.emit("sendMessage",{ room:id , senderType:"user",message:inputMessage})
  console.log("sockent")
  setInputMessage("")
}}







else{
const response = await axios.post(`${baseurl}/api/message/sendQna`,{question:questionans[questionCount]?.question,answer:inputMessage,messagid:id})

if(response.data.success){

setQuestionCount(questionCount+1)
allfetchqna()
setInputMessage("")
if(questionCount+1 ==questionans.length){
  setActivechatbot(true)
  
  // router.reload();
}


}


}




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

const fetchqna=async(service)=>{

  const response = await axios.get(`${baseurl}/api/admin/qna/${service}`)
if(response.data.success){
  setQuestionans(response.data.qna)
  const response2 = await axios.get(`${baseurl}/api/message/sendQna/${id}`)
  if(response2.data.success){
    
    
    setQuestionCount(response2.data.allqna.length)
   
  
    setAllquestionans(response2.data.allqna)
  
    
    if(response2.data.allqna.length === response.data.qna?.length){
      setActivechatbot(true)
    }
  
  }

  
 
  
}
}


const fetchallMessage=async()=>{
  
  const response= await  axios.get(`${baseurl}/api/message/allmessage/${id}`)
  if(response.data.success){
    
  setAllmessage(response.data.allMesasge)
  setUser(response.data.user.userId)
  fetchqna(response.data?.user?.userId?.service)

  
  

  }
}


useEffect(()=>{
  fetchallMessage()
 
  


  

     socket.emit("joinroom", id);
  // if(activeChatbot) {
   socket.on("message", (msg) => {
   
    if(msg.message){    setAllmessage((prevMessages) => [...prevMessages, msg]);
    }
  });
  // }  



  return () => {
    socket.off("message");
  };
 
},[ ])

const handelLogout=async()=>{
  const response = await axios.get(`${baseurl}/api/logout`)
  if(response.data.success){
    router.push("/")
  }
}
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden h-[80vh] flex flex-col">
        <div className="bg-pink-500 p-4 text-white flex justify-between">
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        <div className="flex gap-3">  <span className="text-xl font-semibold">{user?.service}  </span>  <span onClick={handelLogout} className="cursor-pointer">Logout</span> </div> 

        </div>

        <div ref={chatContainerRef} className="flex-1 h-full overflow-y-auto p-4 space-y-4">

{allquestinans?.map((item,index)=>{
  return (
  <div key={index}  >
              
                <p className="text-sm w-fit max-w-[80%] rounded-lg p-3  bg-gray-100 text-gray-800">{item?.question}</p>
       <div className=" flex justify-end"><p className="w-fit max-w-[80%] rounded-lg  p-3  bg-pink-500 text-white">{item?.answer}</p></div>   
              
            </div>
  )
}) }

          {!activeChatbot &&  questionans && <div>
            <p></p>

            <div
             
              className={`flex  justify-start`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3  text-gray-800 bg-pink-500 `}
              >
                <p className="text-sm">{questionans[questionCount]?.question}</p>
               
              </div>
            </div>

            </div>

          }
{activeChatbot &&<p className=" text-center">Now you can do live chat with team</p>}
          {activeChatbot && allmessage?.map((message,index) => (
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
            {!activeChatbot && questionans &&  questionans[questionCount]?.options.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion.value)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-700 transition-colors"
              >
                {suggestion.value}
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
              disabled={!activeChatbot}
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