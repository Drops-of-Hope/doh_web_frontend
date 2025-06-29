"use client";

import { useState } from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";

export default function Header() {
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <div className="bg-white p-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">
            Pages / <span className="text-blue-600">Home</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Home</h1>
        </div>

        <div className="flex items-center space-x-4">

          <div className="relative">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              onClick={() => setNotificationCount(0)}
            >
              <FaBell className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-800">Nadhiya Nashath</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}