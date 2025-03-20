"use client";

import React,{useEffect, useState} from 'react'


import { FiBell } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import axios from 'axios';
import { baseurl } from '../component/urls';
import { useRouter } from 'next/navigation';

 function Dashboard() {
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
    

      <div className="flex-1">
 
        <header className="bg-white shadow-sm fixed w-full top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3 max-w-[calc(100%-256px)] ml-64">
            <div></div>
            <div className="flex items-center space-x-4">
              <FiBell className="text-gray-500 text-xl cursor-pointer hover:text-pink-500" />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-500"
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16  p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {Object.entries(mockStats).map(([key, value], index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-gray-500 text-sm font-medium">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-2xl font-bold text-gray-700 mt-2">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    <div>
                      <p className="text-sm text-gray-600">User action {index + 1}</p>
                      <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Performance Graph Placeholder</p>
              </div>
            </div>
          </div>
        </main>
      </div>
   
  );
}

export default Dashboard