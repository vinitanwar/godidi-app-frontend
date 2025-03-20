"use client"
import { baseurl } from '@/app/component/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";
const socket = io('https://godidi-app-back.onrender.com')
axios.defaults.withCredentials=true;
const Messagbox = ({messageId,setLoading,loading}) => {
    const [inputMessage,setInputMessage]=useState("")
    const [allmessage,setAllmessage]=useState()

    const fetchallMessage=async(id)=>{
        const response= await  axios.get(`${baseurl}/api/message/allmessageadmin/${id}`)
       
        if(response.data.success){
        setAllmessage(response.data.allMesasge)
    setLoading(false)
        }
      }

      const handleSendMessage = async (text) => {
        if (!text.trim()) return;
        
      const response= await  axios.post(`${baseurl}/api/message/sendmessageadmin`,{message:inputMessage,messageid:messageId})
      if(response.data.success){
        socket.emit("sendMessage",{ room:messageId , senderType:"admin",message:inputMessage})
      setInputMessage("")
      }}

useEffect(()=>{
if(messageId) fetchallMessage(messageId)
    socket.emit("joinroom", messageId);
socket.on("message", (msg) => {
 
  if(msg.message){    setAllmessage((prevMessages) => [...prevMessages, msg]);
  }
});
return () => {
  socket.off("message");
};

},[])



  return (
   <>
 {!messageId && <div className='h-full w-full flex justify-center items-center text-4xl font-semibold opacity-45'>
        No messag found!
        </div>

      }
      <div className='h-[44rem] overflow-y-auto'>
      { allmessage &&  <>
     {   !loading   && allmessage.map((message,index)=>{
      return(
        <div
        key={index}
        className={`flex ${message.senderType !=="admin" ? "justify-start" : "justify-end"}`}
      >
        <div
          className={`max-w-[80%] rounded-lg my-2 p-3 ${
            message?.senderType !=="admin"  ? "bg-gray-100 text-gray-800" : "bg-pink-500 text-white"
          }`}
        >
          <p className="text-sm">{message.message}</p>
         
        </div>
      </div>
      )
     })} 
     </>
    }


</div>


<div className="flex items-center gap-2 ">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            //   onKeyPress={handleKeyPress}
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
   
   </>
  )
}

export default Messagbox