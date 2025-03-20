"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseurl } from '../../component/urls';
axios.defaults.withCredentials=true;
const UsersPage = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchAlluser=async()=>{
    setLoading(true)
const response = await axios.get(`${baseurl}/api/admin/allusers`)
if(response.data.success){
setUserMessages(response.data.user)
}
setLoading(false)

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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full">
      <h2 className="text-2xl font-semibold mb-6">User Messages</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
               

               <th>
                ID
               </th>
            
              <th className="p-3 text-gray-600">name</th>
              <th className="p-3 text-gray-600">number</th>
              <th className="p-3 text-gray-600">email</th>
              <th className="p-3 text-gray-600">gender</th>
              <th className="p-3 text-gray-600">location</th>
              <th className="p-3 text-gray-600">address</th>
              <th className="p-3 text-gray-600">service</th>
              <th className="p-3 text-gray-600">Timestamp</th>
             
            </tr>
          </thead>
          <tbody>
            {userMessages.map((message,id) => (
              <tr key={message.id} className="border-b hover:bg-gray-50">
         <td className="p-3">
           {id  + 1}
         </td>
                <td className="p-3">{message.name}</td>
                <td className="p-3">{message.number}</td>
                <td className="p-3">{message.email}</td>
                <td className="p-3">{message.gender}</td>
                <td className="p-3">{message.location}</td>
                <td className="p-3">{message.address}</td>
                <td className="p-3">{message.service}</td>
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
      </div>
    </div>
  );
};

export default UsersPage;