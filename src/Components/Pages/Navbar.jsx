import { useState, useEffect, useRef } from "react";
import img from "../../../assets/profile.png";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Data = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const token = sessionStorage.getItem("authToken");

  // Toggle functions
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSidebarOpen(false);
  };

  // Close sidebar if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout Function
  function handleLogout() {
    dispatch(logout());
    setIsSidebarOpen(false);
    setIsMobileMenuOpen(false);
    toast.success("Logout successful");
    navigate("/");
  }

  return (
    <>
      <div className="relative bg-gray-200">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white p-4 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg`}
        >
          <h2 className="text-2xl font-semibold mb-4">Profile Info</h2>
          <div className="sidebar-options flex flex-col items-start space-y-4">
            <a href="/profile" onClick={toggleSidebar}>
              Profile
            </a>
            <a href="/dashboard" onClick={toggleSidebar}>
              User Dashboard
            </a>
            <a href="/account" onClick={toggleSidebar}>
              Account Settings
            </a>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Navbar */}
        <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="text-white text-4xl p-2 border-2 rounded-full text-left font-bold uppercase tracking-wide shadow-lg">
              YN
            </h2>
            <h1 className="text-3xl font-bold text-white ml-4">YuvaNeeti</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className="text-white text-lg hover:text-blue-500">
              Home
            </NavLink>
            <NavLink to="/about" className="text-white text-lg hover:text-blue-500">
              About
            </NavLink>
            {!token ? (
              <>
                <NavLink to="/signup" className="text-white text-lg hover:text-blue-500">
                  Sign up
                </NavLink>
                <NavLink to="/login" className="text-white text-lg hover:text-blue-500">
                  Log in
                </NavLink>
              </>
            ) : (
              <img
                src={img}
                alt="Profile"
                onClick={toggleSidebar}
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition duration-300"
              />
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            {token ? (
              <img
                src={img}
                alt="Profile"
                onClick={toggleSidebar}
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition duration-300"
              />
            ) : (
              <AiOutlineMenu className="text-white text-3xl cursor-pointer" onClick={toggleMobileMenu} />
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-gray-900 text-white rounded-md p-4 shadow-lg w-48 md:hidden">
            <AiOutlineClose className="text-white text-2xl cursor-pointer absolute top-2 right-2" onClick={toggleMobileMenu} />
            <div className="flex flex-col space-y-4">
              <NavLink to="/" onClick={toggleMobileMenu}>
                Home
              </NavLink>
              <NavLink to="/about" onClick={toggleMobileMenu}>
                About
              </NavLink>
              {token ? (
                <>
                  <NavLink to="/profile" onClick={toggleMobileMenu}>
                    User Profile
                  </NavLink>
                  <NavLink to="/dashboard" onClick={toggleMobileMenu}>
                    User Dashboard
                  </NavLink>
                  <NavLink to="/account" onClick={toggleMobileMenu}>
                    Account Settings
                  </NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/signup" onClick={toggleMobileMenu}>
                    Sign up
                  </NavLink>
                  <NavLink to="/login" onClick={toggleMobileMenu}>
                    Log in
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Data;
