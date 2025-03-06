import { Outlet } from 'react-router-dom';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const navigate = useNavigate();
  const fullName = useSelector((state) => state.auth?.userData?.fullName);

  return (
    <div className='bg-gradient-to-b from-white to-gray-50 min-h-screen font-roboto text-gray-800'>
      <div className='bg-white text-gray-700 h-16 flex items-center justify-between px-6 shadow-sm'>
        <nav className='flex w-full justify-between items-center'>
          <div className="flex items-center gap-3 hover:cursor-pointer" onClick={() => navigate("/profile")}>
            <FaRegUserCircle className="text-3xl" />
            <span className='font-semibold text-lg'>{fullName === "null null" ? "User Name" : fullName}</span>
          </div>
          <a href="/account-settings" className="hover:text-gray-900 transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-gray-100">
            Account Settings
          </a>
        </nav>
      </div>
      <div className='container mx-auto max-w-2xl py-12'>
        <h2 className='text-3xl font-bold text-center mb-8 text-gray-800 flex justify-center items-center gap-3'>
          Account Settings <IoSettingsSharp />
        </h2>
        
        <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
          <div className='p-6 space-y-8'>
            <ChangeUsername />
            <div className='border-t border-gray-200'></div>
            <ChangePassword />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AccountSettings;
