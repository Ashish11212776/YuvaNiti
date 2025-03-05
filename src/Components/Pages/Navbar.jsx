import { useState } from "react";
import img from "../../../assets/profile.png";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import './Navbar.css'
import Hero from "./Hero";

const Data = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  const handleClick = () => {
    dispatch(logout())
    navigate("/") ;
    toast.success("Logout successfully");
  };

  const token = sessionStorage.getItem("authToken");

  function handleLogout() {
    dispatch(logout());
    setIsSidebarOpen(false);
    toast.success("Logout successful");
    navigate('/');  // Redirect to homepage or login after logout
  }

  // Using useLocation to check the current route
  const location = useLocation();

  return (
    <>
      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 ">
        
        {/* Sidebar on the Right */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-700 p-6 rounded-l-3xl transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out shadow-2xl`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Info</h2>

          <div className="sidebar-options flex flex-col items-start space-y-4 ">
            <NavLink to="/profile" onClick={() => setIsSidebarOpen(false)} className="text-gray-700 hover:text-blue-600 text-lg">PROFILE</NavLink>
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-500 text-lg">LOGOUT</button>
            <a href="/account" className="text-gray-700 hover:text-blue-600 text-lg">Account Settings</a>
          </div>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'mr-64' : 'mr-0'} `}>
          <div className="flex justify-between items-center  p-6 shadow-md bg-gradient-to-b from-[#DFF6FF] to- white ">
        

            {/* Logo and Title (Left-aligned) */}
            <div className="flex items-center justify-start w-full space-x-4 ">
              <h2 className="text-4xl p-4 bg-blue-200 rounded-full text-left font-bold uppercase tracking-wide text-blue-600">
                YN
              </h2>
              <h1 className="text-3xl font-semibold text-gray-800 ml-2">YuvaNeeti</h1>
            </div>

            {/* Home and About (Centered) */}
            <div className="flex justify-center w-full space-x-8 ">
              <button className="text-gray-800 text-xl hover:text-blue-600">
                <NavLink to="/" className={({ isActive }) => isActive ? "Active" : ""}>Home</NavLink>
              </button>
              <button className="text-gray-800 text-xl hover:text-blue-600">
                <NavLink to="/about" className={({ isActive }) => isActive ? "Active" : ""}>About</NavLink>
              </button>
              {!token ? (
                <>
                  <button className="text-gray-800 text-xl hover:text-blue-600">
                    <NavLink to="/signup" className={({ isActive }) => isActive ? "Active" : ""}>Sign up</NavLink>
                  </button>
                  <button className="text-gray-800 text-xl hover:text-blue-600">
                    <NavLink to="/login" className={({ isActive }) => isActive ? "Active" : ""}>Log in</NavLink>
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
                    className="w-14 h-14 rounded-full border-2 border-gray-300 hover:opacity-80 transition duration-300 shadow-lg"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* Conditionally render the Hero component only when on the home route */}
          {location.pathname === "/" && <Hero />}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};    

export default Data;
