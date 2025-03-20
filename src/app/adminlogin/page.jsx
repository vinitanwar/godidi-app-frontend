"use client"

import React, { useState, useEffect } from "react";
import { FiHome, FiPieChart, FiUsers, FiSettings, FiLogOut, FiBell } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { baseurl } from "../config/baseUrl";
import axios from 'axios'
axios.defaults.withCredentials=true;

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigation=useRouter()
  const [formData, setFormData] = useState({
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};
    const { adminNumber, password } = formData;

    if (!/^[a-zA-Z0-9]{6,}$/.test(adminNumber)) {
      newErrors.adminNumber = "Admin number must be at least 6 alphanumeric characters";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoggedIn(true);
      toast.success("Login successful!");
    } else {
      toast.error("Please check your credentials!");
    }
  };

 
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res= await axios.post(`${baseurl}/api/adminlogin`,{...formData})

    if(res.data.success){
        toast.success("Login successful!");
navigation.push("/admin")
    }
  };
  const  verifyAdmin=async()=>{
    const res= await axios.get(`${baseurl}/api/admin/verifyadmin`)
    if(res.data.success){
        navigation.push("/admin")
    }
    else{
        navigation.push("/adminlogin")
  
    }
}
useEffect(()=>{
    verifyAdmin()
},[])

  

  const LoginForm = () => (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">Admin Login</h2>
      <form onSubmit={handleSubmit}  >
        <div>
          <label className="block text-gray-700 mb-2">Admin Number</label>
          <input
            type="text"
            required
              name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter admin number"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            required
               name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );


  return (
    <>
     <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">Admin Login</h2>
      <form onSubmit={handleSubmit}  >
        <div>
          <label className="block text-gray-700 mb-2">Admin Number</label>
          <input
            type="text"
            required
              name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter admin number"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            required
               name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  </div>
    </>
  );
};

export default AdminDashboard;
