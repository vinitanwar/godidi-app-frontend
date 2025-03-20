'use client';

import { useState, useRef, useEffect } from 'react';
import {  X  } from 'lucide-react';
import axios from 'axios';
import { baseurl } from './urls';
import { questions } from './questionjson';

export default function Chatbot({setshowChatbot,setUserData}) {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi there! How can I help you today?', options: ['Services', 'Pricing', 'Contact'] },
  ]);
  const [query,setQuery]=useState("")

  const chatboxRef = useRef(null);

  useEffect(() => {
    chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
  }, [messages]);



const [userInfo,setuserInfo]=useState() 
const [loading,Setloading]=useState(false)
const [questionCount,setQuestionCount]=useState(0)

const [userResponse,setuserResponse]=useState([])

  useEffect(() => {
    const userfetch = JSON.parse(localStorage.getItem("godidi"));
const data= questions.filter((item)=>item.service==userfetch?.userData?.service)


    
    setuserInfo({info:userfetch?.userData,...data[0]})
  
  }, []);

const handelaner=()=>{
Setloading(true)
  setuserResponse([...userResponse,{question:userInfo?.qna[questionCount].question,answer:query}])
  setQuestionCount(questionCount+1)
setInterval(() => {
  Setloading(false)
}, 1000);
setQuery("")


}
  
const handelSendQuery=async()=>{
  Setloading(true)
  const data={...userInfo.info,userResponse}

const response = await axios.post(`${baseurl}/bot/addbotData`,{...data});


if(response.data.success){
  localStorage.clear("godidi")

  
    setUserData({name:"",email:"",contact:"",address:"",service:""})
  setshowChatbot(false)

}
Setloading(false)

}

 
  return (
    <div className="flex items-center justify-center md:min-h-screen bg-gray-100">
    

<div className='h-screen w-screen md:h-[40rem] md:w-[30rem] flex flex-col  shadow-amber-600 shadow '>

<div className="bg-gradient-to-r  from-pink-500 to-red-500 w-full text-white p-5 text-lg font-semibold flex justify-between items-center">
          <span>Chatbot Assistant</span>
          <button onClick={() => setshowChatbot(false)} className="text-white hover:scale-110 transition">
            <X size={24} />
          </button>
        </div>

<div className='h-full p-2 overflow-y-auto'>


{
  userResponse?.map((item,index)=>{
    return(
      <div className='my-3' key={index}>
        <p className='bg-gray-200  p-2 px-4 rounded-sm w-fit max-w-[80%]'>{item.question}</p>
       <div className='flex justify-end my-1'> <p className=' bg-blue-200  p-2 px-4 rounded-sm w-fit max-w-[80%]'>{item.answer}</p></div> 
        </div>
    )
  })
}
{loading && <p className='my-1'>Loading...</p>}
 { !loading  &&  userInfo?.qna?.length != userResponse.length && <p className='bg-gray-200 my-1 p-2 px-4 rounded-sm w-fit max-w-[80%]'>{userInfo?.qna[questionCount]?.question}</p>}

</div>
<div className='w-full  flex overflow-x-auto gap-3 p-3 justify-between text-white'>
  {userInfo?.qna[questionCount]?.option?.map((item,index)=>(<p key={index} onClick={()=>setQuery(item)} className='cursor-pointer text-nowrap hover:scale-105 duration-300 bg-gradient-to-r from-pink-500 to-red-500 p-2 pb-4 rounded-2xl'>
    {item}
  </p>))}
  {/* ()=>handelaner(item */}
  

</div>

<div className='w-full bg-gradient-to-r from-pink-500 to-red-500 flex overflow-auto gap-3 p-2 justify-between text-white'>
  { userInfo?.qna.length != userResponse.length && <>
<input placeholder='Input' value={query} className='border border-black   p-2 w-full text-black rounded-2xl ' onChange={(e)=>setQuery(e.target.value)} />
<button onClick={()=>handelaner()}>send</button> </> }


{userInfo?.qna.length === userResponse.length &&  <div className='flex justify-center w-full cursor-pointer' onClick={()=>handelSendQuery()}>{loading?"Loading...":"Send Query"}   </div>}
</div>


</div>


      
    </div>
  );
}
