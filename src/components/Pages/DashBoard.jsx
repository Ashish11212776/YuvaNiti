import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMobile } from "react-icons/fa6"
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import {
  filledForms,
  recommendedForm,
  savedForms,
} from "../../features/accountThunk";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state?.auth?.profile?.data?.userDetails);
  const FilledForms = useSelector((state) => state?.account?.FilledForms?.data);
  const fullName = useSelector((state) => state.auth?.userData?.fullName);
  const mobileNumber = useSelector((state) => state.auth?.userData?.mobileNumber)
  const gender = useSelector((state) => state.auth?.userData?.gender)
  const dob = useSelector((state) => state.auth?.userData?.dob)
  console.log(FilledForms);

  const SavedForms = useSelector((state) => state?.account?.SavedForms?.data);

  const RecommendData = useSelector(
    (state) => state?.account?.RecommendedForm?.data
  );

  useEffect(() => {
    dispatch(filledForms({ userId: id }));
    dispatch(savedForms({ userId: id }));
    dispatch(recommendedForm({ userId: id }));
  }, []);

  return (
    <div className=" flex">
       <div className="bg-gray-500 w-full  md:w-1/4 lg:w-1/5 min-h-[100px] md:min-h-screen shadow-md flex flex-col md:items-center py-3 px-4 md:px-6 border-r border-gray-100">
              
           
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
                      <FaWpforms className="text-2xl text-blue-400" />
                    </div>
                    <span className="truncate text-white">Saved Forms</span>
                  </div>
      
                 
                  <div className="text-lg font-medium flex items-center gap-3 p-3 rounded-lg w-full hover:bg-gray-600 transition duration-200 cursor-pointer">
                    <div className="bg-blue-50 p-2 rounded-full shadow-sm">
                      <FaWpforms className="text-2xl text-blue-400" />
                    </div>
                    <span className="truncate text-white">Filled Forms</span>
                  </div>
      
                  <div className="text-lg font-medium flex items-center gap-3 p-3 rounded-lg w-full hover:bg-gray-600 transition duration-200 cursor-pointer">
                    <div className="bg-blue-50 p-2 rounded-full shadow-sm">
                      <FaWpforms className="text-2xl text-blue-400" />
                    </div>
                    <span className="truncate text-white">Recommended Forms</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className=" ml-[15%] mt-9 ">
            <center>
      <div className="flex flex-wrap gap-8 justify-center items-center">
        <div className="bg-blue-100 shadow-lg p-6 rounded-2xl w-64 text-center border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <p className="text-4xl font-extrabold text-blue-500">
            {SavedForms?.totalItems ?? 0}
          </p>
          <h2 className="text-lg font-semibold text-gray-700">Saved Forms</h2>
        </div>

        <div className="bg-green-100 shadow-lg p-6 rounded-2xl w-64 text-center border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <p className="text-4xl font-extrabold text-green-500">
            {RecommendData?.totalItems ?? 0}
          </p>
          <h2 className="text-lg font-semibold text-gray-700">
            Recommended Forms
          </h2>
        </div>
        <div className="bg-purple-100 shadow-lg p-6 rounded-2xl w-64 text-center border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <p className="text-4xl font-extrabold text-purple-500">
            {FilledForms?.totalItems ?? 0}
          </p>
          <h2 className="text-lg font-semibold text-gray-700">Filled Forms</h2>
        </div>
      </div>
      <div className="mt-8 space-y-6 text-center">
        <div>
          <h3 className="text-xl font-semibold">Saved Forms</h3>
          {SavedForms?.totalItems === 0 && (
            <p className="text-red-500 font-medium italic">No data available</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold">Filled Forms</h3>
          {FilledForms?.totalItems === 0 && (
            <p className="text-red-500 font-medium italic">No data available</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold">Recommended Forms</h3>
          {RecommendData?.totalItems === 0 && (
            <p className="text-red-500 font-medium italic">No data available</p>
          )}
        </div>
      </div>
      </center>
      </div>
    </div>
  );
};

export default DashBoard;
