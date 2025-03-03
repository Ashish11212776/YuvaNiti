import React, { useState } from 'react';
import img from '../../../assets/profile.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';
import './Navbar.css'
import { toast, ToastContainer } from 'react-toastify';
const Data = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };
  const token = sessionStorage.getItem("authToken")


  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    setIsSidebarOpen(false);
    toast.s("Logout successfull")
    navigate('/');  // Redirect to homepage or login after logout
  }

  return (
    <>
      <div className="relative bg-gray-200">
        {/* Sidebar on the Right */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out`}
        >
          <h2 className="text-2xl font-semibold mb-4">Profile Info</h2>

          <div className="sidebar-options flex flex-col items-start space-y-4">
            <NavLink to="/profile">PROFILE</NavLink>
            <button onClick={handleLogout}>LOGOUT</button>
            <a href='/account' >Account Settings</a>
          </div>
        </div>
        {/* Main Content */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'mr-64' : 'mr-0'}`}>
          <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
            {/* Logo and Title (Left-aligned) */}
            <div className="flex items-center justify-start w-full">
              <h2 className="text-white text-4xl p-2 border-2 rounded-full text-left font-bold uppercase tracking-wide shadow-lg">
                YN
              </h2>
              <h1 className="text-3xl font-bold text-white ml-4">YuvaNeeti</h1>
            </div>

            {/* Home and About (Centered) */}
            <div className="flex justify-center w-full space-x-8">
              <button className="text-white text-lg hover:text-blue-500">
                <NavLink to="/" className={({isActive})=> isActive ? "Active":""}>Home</NavLink>
              </button>
              <button className="text-white text-lg hover:text-blue-500">
                <NavLink to="/about" className={({isActive})=>isActive?"Active":""}>About</NavLink>
              </button>
              {!token ? (
                <>
                  <button className="text-white text-lg hover:text-blue-500">
                    <NavLink to="/signup" className={({isActive})=>isActive?"Active":""}>Sign up</NavLink>
                  </button>
                  <button className="text-white text-lg hover:text-blue-500">
                    <NavLink to="/login" className={({isActive})=>isActive?"Active":""}>Log in</NavLink>
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>

            {/* Profile Logo (Right-aligned) */}
            {token ? (
              <div className="flex justify-end w-full">
                <div onClick={toggleSidebar} className="cursor-pointer">
                  <img
                    src={img}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-white hover:opacity-80 transition duration-300"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Data;
