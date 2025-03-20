"use client"
import { baseurl } from '@/app/component/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";


const page = () => {
  const [service,setService]=useState("")
const [services,setServices]=useState()



  const fetchAllservice=async()=>{
    const res= await axios.get(`${baseurl}/api/admin/services`)
    if(res.data.success){
      setServices(res.data.service)
    }
  }

  useEffect(()=>{
    fetchAllservice()
  },[])


const handelDeleteServies=async(id)=>{
 await axios.delete(`${baseurl}/api/admin//services/${id}`)
   await  fetchAllservice()
}

 const submitService=async()=>{
if(!service){
return 
}

const  response = await axios.post(`${baseurl}/api/admin//services`,{service})
if(response.data.success){
  setService("")
  await  fetchAllservice()
}
}



  return (
    <div className='h-screen w-full  bg-gray-300 px-36'>
 <div className='h-full w-full bg-white flex flex-col p-3'>
 <div className='h-full flex flex-wrap gap-4'>
{services?.map((service,index)=>{
  return(
    <div key={index} className='p-3 px-5 bg-[#ffc0cb4f] rounded-xl h-fit relative '>

<p className=''>{service.service}</p>
<MdCancel className='text-red-700 text-xl cursor-pointer absolute right-0 top-0' onClick={()=>handelDeleteServies(service._id)} />
      </div>
  )
})}
 </div>

<div className='flex gap-2'><input type='text' value={service} onChange={(e)=>setService(e.target.value)} placeholder='Enter Service...' className=' border rounded-2xl p-2 text-lg w-full' />  <button className='bg-blue-600 text-white font-bold p-2 rounded-2xl px-7 cursor-pointer' onClick={submitService}>Add</button>  </div>

 </div>
    </div>
  )
}

export default page