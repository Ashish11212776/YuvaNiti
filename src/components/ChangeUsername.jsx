import {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserName } from '../features/accountThunk';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../features/authThunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiUser } from "react-icons/ci";
import { LuUserRoundPen } from "react-icons/lu";



const ChangeUsername = () => {
  const { id } = useSelector((state) => state.auth.profile.data.userDetails);
  const username = useSelector((state) => state.auth.userData.username);
  const userId = id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(username);
  const [change, setChange] = useState(false);

  const changeUserNameHandler = () => {
    dispatch(changeUserName({ userName, userId })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getProfile({ userId }));
        toast.success("User Name Changed Successfully");
        navigate("/");
        setChange(!change);
      }
    }).catch(() => {
      toast.error("Failed to change username.");
    });
  };
    return (
    <div className="p-6 max-w-lg mx-auto flex flex-col item-start text-slate-500 font-roboto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-start gap-3 justify-start"><CiUser className=' h-8'/>Account Settings</h2>
      {!change ? (
        <div>
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 flex">
              Username *  
            </label>
            <input
              type="text"
              name="userName"
              value={userName}
              placeholder={username}
              className="border rounded-lg px-4 py-2 w-full bg-gray-50 text-gray-600 cursor-not-allowed"
              readOnly
            />
            <button
              onClick={() => setChange(!change)}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex gap-3 justify-center items-center duration-300"
            >
             <LuUserRoundPen/> Change UserName
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            type='text'
            name='userName'
            value={userName}
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          />
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setChange(!change)}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition duration-300"
            >
            Cancel
            </button>
            <button
              onClick={() => changeUserNameHandler()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center space-x-4">
              UserName must be unique and different from previous
            </p>
          </div>
      <ToastContainer />
    </div>
  );
};

export default ChangeUsername;
