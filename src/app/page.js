'use client';

import { useEffect, useState } from 'react';
import Chatbot from './component/Chatbot';
import axios from 'axios';
import { baseurl } from './component/urls';


import Swal from 'sweetalert2'

import { useRouter } from "next/navigation";
// const services = [

//   "Cooking",
//   "Baby Sitting",
//   "House cleaning",
//   "Day care",
//   "Care Taker"


// ];
axios.defaults.withCredentials = true

// axios.defaults.withCredentials=false;


export default function Page() {
    const navigation=useRouter()
    const [loading,setloading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    gender: "",
    address: "",
    location: "",
    service: ""
  });

   const [services,setServices]=useState()
  const [selectedServices, setSelectedServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showchatBot, setshowChatbot] = useState(false)
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];
  const handleServiceClick = (service) => {

    setUserData({ ...userData, service: service })


    setIsDropdownOpen(false);
  };

  const handeluserSubmit = async (e) => {

    e.preventDefault();
    if (!formData.name || !formData.number || !formData.email || !formData.address || !formData.service) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'All fields are Required!',
      });

      return;
    }

    if (!/^\d{10}$/.test(formData.number)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
      });
      return;
    }



    try {
      setloading(true)
      const response = await axios.post(`${baseurl}/api/userSignup`, formData);
      if (response.data.success) {
        setFormData({
          name: "",
          number: "",
          email: "",
          address: "",
          location: "",
          service: ""
        });
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User registered successfully!',
        });
        setloading(false)
        setshowChatbot(true)
console.log(response.data)
        navigation.push(`/${response.data.messageid}`)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again!',
      });
    }
  };

  const fetchServices=async()=>{
    try {
      const response = await axios.get(`${baseurl}/api/admin/services`)
      setServices(response.data.service)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchtuser=async()=>{
    const response= await axios.get(`${baseurl}/api/getuser`)
    if(response.data.success){
      navigation.push(`/${response.data.mssage._id}`)
    }
  }

  useEffect(()=>{
    fetchtuser()
    fetchServices()
  },[])



  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 md:p-4">
        {!showchatBot && <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-300">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Select Your Services</h2>
          <form className="space-y-4" onSubmit={handeluserSubmit}>
      <p className="text-gray-800 font-bold">All Fields are Required *</p>
      <input
        type="text"
        
        placeholder="Name*"
        className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <input
        type="number"
        
        placeholder="Contact No.*"
        className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
        name="number"
        value={formData.number}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <input
        type="email"
        
        placeholder="Email*"
        className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
     
      <input
        type="text"
        
        placeholder="Address*"
        className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
        name="address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <div>
        <p>Gender :*</p>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              id="male"
              checked={formData.gender === "male"}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              checked={formData.gender === "female"}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </div>


      <div className="relative">
      <label className="block font-semibold mb-2 text-gray-700">Location</label>

      <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="service" value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        >
          <option>
            Select
          </option>
          
          <option>Chandigarh</option>
          <option>Panchkula</option>
          <option>Mohali</option>
          <option>zirakpur</option>
       
        </select>
      </div>
      <div className="relative">
        <label className="block font-semibold mb-2 text-gray-700">Services Only for Women</label>
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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition font-semibold text-lg"
      >
       

        {
          loading ? 'Loading...' : ' Open Chatbot'
        }
      </button>
      
    </form>




        </div>}
        
      </div>

    </>
  );
}
