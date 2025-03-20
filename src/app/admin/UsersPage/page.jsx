"use client";
 // Required for client-side functionality in Next.js

import { baseurl } from '@/app/component/urls';
import axios from 'axios';
import { useEffect, useState } from 'react';
axios.defaults.withCredentials=true;


import Messagbox from './Messagbox';



const UsersPage = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const [messageId,setMessageid]=useState("")



  const fetchAlluser=async()=>{
    // setLoading(true)
const response = await axios.get(`${baseurl}/api/admin/allusers`)
if(response.data.success){
setUserMessages(response.data.user)
}
// setLoading(false)

  }
  
  useEffect(() => {
  fetchAlluser()

  }, []); 

  if (loading) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  


const handelgetMessage=async(id)=>{
  setLoading(true)

 
const response= await axios.get(`${baseurl}/api/message/allmessageadminside/${id}`)

   if(response.data.success){setMessageid(response.data.messageId)
   
    setLoading(false)
  
   }

}

const handleKeyPress = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage(inputMessage);
  }
};






  return (
<div className='w-full flex'>

    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">User Messages</h2>
      {/* <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
               

               <th>
                ID
               </th>
            
              <th className="p-3 text-gray-600">Message</th>
              <th className="p-3 text-gray-600">Timestamp</th>
             
            </tr>
          </thead>
          <tbody>
            {userMessages.map((message,id) => (
              <tr key={message.id} className="border-b hover:bg-gray-50">
         <td className="p-3">
           {id  + 1}
         </td>
                <td className="p-3">{message.text}</td>
                <td className="p-3">{message.createdAt}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      message.status === "unread"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {message.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {userMessages?.map((item,index)=>{
        return(
<div key={index} className='p-2  my-2 bg-gray-200 rounded-md cursor-pointer' onClick={()=>handelgetMessage(item._id)}>
  <div className='flex gap-3'>
  <p>{index +1 }</p>
  <p>{item.name}</p>
  </div>
  <p className='text-center bg-[#ffc0cb8c] text-sm rounded-2xl'>{item.service}</p>

</div>

        )
      })}
    </div>

    <div className='w-full h-screen flex flex-col p-3 '>
{!loading &&
messageId &&
      <Messagbox messageId={messageId} setLoading={setLoading}  loading={loading}  />
}

    </div>
    </div>
  );
};

export default UsersPage;