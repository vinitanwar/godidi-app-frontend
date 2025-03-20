"use client"
import { baseurl } from '@/app/component/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

axios.defaults.withCredentials=true;


const page = () => {
const [formData,setFormData]=useState({
    service:"",
    question:"",
    sequence:0,
    options:[

    ]   
})

const [SearchService,setSearchService]=useState("")

const [option,setOption]=useState({ label: "",
    value:""})
const [services,setServices]=useState()
const [allqna,setAllqna]=useState();
const [modify,setModify  ] =useState(false)


const fetchServices=async()=>{
    try {
      const response = await axios.get(`${baseurl}/api/admin/services`)
      setServices(response.data.service)
    } catch (error) {
      console.log(error)
    }
  }



const handeladdOption =()=>{
    setFormData({...formData,options:[...formData.options,{...option}]})
    setOption({ label: "",
        value:""})
}





useEffect(()=>{
    fetchServices()
},[ ])

const fetchtServicedata= async (service)=>{
    setAllqna("")
const response = await axios.get(`${baseurl}/api/admin/qna/${service}`)
if(response.data.success && response.data.qna.length ){
setAllqna(response.data.qna)
}
}



useEffect(()=>{
if(SearchService){
    fetchtServicedata(SearchService)
}

},[SearchService])

const handelsubmitqna=async()=>{
    const response = await axios.post(`${baseurl}/api/admin/qna/add`,formData)
    
   if(response.data.success){
    toast.success("added")
    fetchtServicedata(formData.service)
         setFormData({service:"",
            question:"",
            sequence:0,
            options:[
        
            ]  })
    }
    else{
        toast.error(response.data.message)

    }
}


const handelDeleteqna=async(id)=>{
    const response = await axios.delete(`${baseurl}/api/admin/qna/${id}`)
    if(response.data.success){
        fetchtServicedata(SearchService) 
        toast.success(response.data.message)
    }
}

const handeleditqna=async()=>{
    const response = await axios.put(`${baseurl}/api/admin/qna/${formData._id}`,formData)
    if(response.data.success){
        toast.success(response.data.success)
        fetchtServicedata(formData.service)
        setFormData({
            service:"",
            question:"",
            sequence:0,
            options:[
        
            ]   
        })
        setModify(false)
    }
}

const handelremoveoption=(index)=>{

    const newOpt = [...formData.options]; 
    newOpt.splice(index, 1); 
    setFormData({...formData,options:[...newOpt]})


}




  return (
   <div className='h-screen flex flex-col w-full p-2 '>
<div className='h-full flex'>
<div className='flex flex-col gap-3 border-r  p-3'>

    <p className='text-xl font-semibold'>Services List</p>
    {services?.map((service,index)=>{
        return (
            <p key={index} className='cursor-pointer bg-[#b8b6b64f] p-2 rounded-md' onClick={()=>setSearchService(service.service)}>{service.service}</p>
        )
    })}
</div>

<div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Question</th>
            <th className="border px-4 py-2">Sequence</th>
            <th className="border px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {allqna &&  allqna.map((item, index) => {

            return(

            <tr key={index} className="text-center border-b hover:bg-gray-50">
               <td className="border px-4 py-2">{index + 1}</td>
               <td className="border px-4 py-2">{item?.service}</td>
                <td className="border px-4 py-2">{item?.question}</td>
               <td className="border px-4 py-2">{item?.sequence}</td>
               <td className="border px-4 py-2">
               {item?.options?.map((opt, i) => (
                   <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md mx-1">
                     {opt.value}
                   </span>
                 ))}
             </td>
             <td className="border px-4 py-2"><AiFillDelete className='cursor-pointer text-red-700' onClick={()=>handelDeleteqna(item._id)}    /></td>
             <td className="border px-4 py-2"><MdOutlineModeEditOutline className='cursor-pointer text-xl text-green-700' onClick={()=>{setFormData({...item}),setModify(true)}}    /></td>

            </tr>
          )
          
          })}
        </tbody>
      </table>
    </div>








</div>


<div className='flex gap-10 w-full items-center justify-between border-t'>

<div className="relative">
        <label className="block font-semibold mb-2 text-gray-700 text-nowrap"> Select  Service</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="service" value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        >
          <option>
            Select
          </option>
          
          {services?.map((service,index) => (
            <option key={index}   value={service.service}>
              {service.service}
            </option>
          ))}
        </select>
      </div>
 
      <div className="relative min-w-24">
        <label className="block font-semibold mb-2 text-gray-700">Sequence</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="sequence" value={formData.sequence}
          onChange={(e) => setFormData({ ...formData, sequence: e.target.value })}
        >
          <option value={0}>
            Select
          </option>
          <option value={1}>
            1
          </option>
           <option value={2}>
            2
          </option>
           <option value={3}>
            3
          </option>
           <option value={4}>
            4
          </option>
           <option value={5}>
            5
          </option>
        
        </select>
      </div>
<div className='w-full'>
    <label htmlFor="question">Question</label>
    <input type='text' placeholder='Enter question' className='w-full border p-2 rounded-md'value={formData.question} onChange={(e)=>setFormData({...formData,question:e.target.value})} />
</div>

<div className='relative w-full'>
    <div className='flex gap-5'><label htmlFor="">Options: </label> <div className='flex gap-3'>{formData?.options?.map((opt,index)=>
        
        (<p key={index} className='relative px-3'>{opt?.value}  <ImCancelCircle onClick={()=>handelremoveoption(index)} className='absolute top-0 -right-3 cursor-pointer' /> </p>))}</div> </div>
    <input type='text' placeholder='Enter question' className='w-full border p-2 rounded-md' value={option.value} onChange={(e)=>setOption({ label:e.target.value,
    value:e.target.value})}  />
    <IoIosAddCircleOutline  className='absolute bottom-1/6 text-2xl right-2 cursor-pointer'  onClick={()=>handeladdOption()}/>
</div>
   
<div>
  {!modify && <button className='p-2 bg-blue-600 text-white font-bold h-fit px-5 rounded-md' onClick={handelsubmitqna} >Add</button> }
  {modify && <button className='p-2 bg-green-600 text-white font-bold h-fit px-5 rounded-md' onClick={handeleditqna} >Edit</button> }

</div>
</div>

   </div>
  )
}

export default page