import { Outlet } from 'react-router-dom';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaMobile } from "react-icons/fa6"
import { FaUser } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
const AccountSettings = () => {
  const fullName = useSelector((state) => state.auth?.userData?.fullName);
  const mobileNumber = useSelector((state) => state.auth?.userData?.mobileNumber)
  const gender = useSelector((state) => state.auth?.userData?.gender)
  const dob = useSelector((state) => state.auth?.userData?.dob)
  

  return (
    <div className="bg-gradient-to-b from-blue-50 via-gray-50 to-white min-h-screen font-roboto text-gray-700 flex flex-col md:flex-row">
      
      
      <div className="bg-gray-500 w-full md:w-1/4 lg:w-1/5 min-h-[100px] md:min-h-screen shadow-md flex flex-col md:items-center py-3 px-4 md:px-6 border-r border-gray-100">
        
     
        <div className="flex md:flex-col items-center  gap-3 w-full">
          <div className="bg-white p-2 md:p-4 rounded-full shadow-md">
            <FaRegUserCircle className="text-blue-400" size={50} />
          </div>
          <span className="text-base font-medium text-white">
            {fullName === "null null" ? "User Name" : fullName}
          </span>
        </div>

       
        <div className="hidden md:block w-full">
          <div className="w-full h-[1px] bg-gray-300 my-4"></div>

          <div className="space-y-2">
            
            <div className="text-lg font-medium flex items-center gap-3 p-3 rounded-lg w-full hover:bg-gray-600 transition duration-200 cursor-pointer">
              <div className="bg-blue-50 p-2 rounded-full shadow-sm">
                <FaMobile className="text-2xl text-blue-400" />
              </div>
              <span className="truncate text-white">{mobileNumber}</span>
            </div>

           
            <div className="text-lg font-medium flex items-center gap-3 p-3 rounded-lg w-full hover:bg-gray-600 transition duration-200 cursor-pointer">
              <div className="bg-blue-50 p-2 rounded-full shadow-sm">
                <FaUser className="text-2xl text-blue-400" />
              </div>
              <span className="truncate text-white">{gender}</span>
            </div>

            <div className="text-lg font-medium flex items-center gap-3 p-3 rounded-lg w-full hover:bg-gray-600 transition duration-200 cursor-pointer">
              <div className="bg-blue-50 p-2 rounded-full shadow-sm">
                <LiaBirthdayCakeSolid className="text-2xl text-blue-400" />
              </div>
              <span className="truncate text-white">{dob}</span>
            </div>
          </div>
        </div>
      </div>

     
      <div className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 md:px-12 bg-gray-50">
        
        <div className="mb-8 w-full max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 flex items-center gap-2 pb-2 border-b border-gray-200">
            Account Settings
            <div className="bg-blue-50 p-2 rounded-full shadow-sm">
              <IoSettingsSharp className="text-blue-400" />
            </div>
          </h1>
        </div>

       
        <div className="bg-white rounded-lg shadow-md w-full max-w-3xl overflow-hidden border border-gray-100">
          <div className="p-5 sm:p-6 md:p-8">
            <ChangeUsername />
          </div>
          <div className="h-[1px] bg-gray-200"></div>
          <div className="p-5 sm:p-6 md:p-8">
            <ChangePassword />
          </div>
        </div>
      </div>

      <Outlet />
    </div>

  );
};
export default AccountSettings;
