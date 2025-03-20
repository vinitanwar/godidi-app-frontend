"use client";

import React,{useEffect, useState} from 'react'


import { FiBell } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import axios from 'axios';
import { baseurl } from '../component/urls';
import { useRouter } from 'next/navigation';

 function layout({children}) {
const navigation= useRouter()
  const [activePage, setActivePage] = useState('dashboard');
  const mockStats = {
    totalUsers: 1234,
    activeUsers: 892,
    revenue: '$45,678',
    growth: '+23%',
  };

  const handleLogout = () => {
    toast.info('Logged out successfully');
  };

const fetchVerifyAdmin=async()=>{
  const res= await axios.get(`${baseurl}/api/admin/verifyadmin`)
  if(!res.data.success){
    navigation.push("/adminlogin")
  }

}
useEffect(()=>{
  fetchVerifyAdmin()
},[])

  return (
    <div className="min-h-screen bg-gray-50 flex ">

<Sidebar activePage={activePage} setActivePage={setActivePage} />

     {children}
    </div>
  );
}

export default layout