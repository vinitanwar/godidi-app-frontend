// components/Sidebar.js
"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="w-64 bg-white shadow-sm  h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                href="/admin"
                onClick={() => setActivePage('dashboard')}
                className={`flex items-center p-2 text-gray-600 hover:bg-pink-50 rounded-lg ${
                  activePage === 'dashboard' ? 'bg-pink-50' : ''
                }`}
              >
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
            <Link
                href="/admin/addservices"
                className={`flex items-center p-2 text-gray-600 hover:bg-pink-50 rounded-l`}
              >
                <span>Add services</span>
              </Link>
            </li>
            <li>
            <Link
                href="/admin/UsersPage"
                className={`flex items-center p-2 text-gray-600 hover:bg-pink-50 rounded-l`}
              >
                <span>Messages</span>
              </Link>
            </li>

            <li>
            <Link
                href="/admin/loginuser"
                className={`flex items-center p-2 text-gray-600 hover:bg-pink-50 rounded-l`}
              >
                <span>Log IN User</span>
              </Link>
              <Link
                href="/admin/services"
                className={`flex items-center p-2 text-gray-600 hover:bg-pink-50 rounded-l`}
              >
                <span>Qna</span>
                
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}