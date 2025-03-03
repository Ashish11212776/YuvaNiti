import React, { useState, useEffect } from 'react';
import img from '../../../assets/profile.png'


import { Link } from 'react-router-dom';


const Data = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
  
    <div className="relative  bg-gray-200">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-semibold mb-4">Profile Info</h2>

        <div className="sidebar-options flex flex-col items-start space-y-4">
          
          
           <Link to="/profile">PROFILE</Link> 
           <Link to="/profile">LOGOUT</Link> 
          
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
          {/* Logo and Title (Left-aligned) */}
          <div className="flex items-center justify-start w-full">
            <h2 className=" text-white text-4xl p-2 border-2 rounded-full text-left font-bold uppercase tracking-wide shadow-lg ">
              YN
            </h2>
            <h1 className="text-3xl font-bold text-white ml-4">YuvaNeeti</h1>
          </div>

          {/* Home and About (Centered) */}
          <div className="flex justify-center w-full space-x-8">
            <button className="text-white text-lg hover:text-blue-500"><Link to="/">Home</Link></button>
            <button className="text-white text-lg hover:text-blue-500"><Link to="/About">About</Link></button>
            <button className="text-white text-lg hover:text-blue-500"><Link to="/signup">Sign up</Link></button>
            <button className="text-white text-lg hover:text-blue-500"><Link to="/login">Log in</Link></button>
          </div>

          {/* Profile Logo (Right-aligned) */}
          <div className="flex justify-end w-full">
            <div onClick={toggleSidebar} className="cursor-pointer">
              <img
                src={img}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white hover:opacity-80 transition duration-300"
              />
            </div>
          </div>
        </div>


      </div>

    </div>
    </>
    
  );
};

export default Data;
