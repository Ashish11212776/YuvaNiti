
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserName } from '../features/accountThunk';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../features/authThunk';
import { ToastContainer, toast } from 'react-toastify';



const ChangeUsername = () => {
  const { id } = useSelector((state) => state.auth.profile.data.userDetails);
  const username = useSelector((state) => state.auth.userData.username)






  const userId = id
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userName, setUserName] = useState(username);
  const [change, setChange] = useState(false);
 


  const changeUserNameHandler = () => {
    dispatch(changeUserName({ userName, userId })).then((res) => {

 
      if (res.meta.requestStatus ==="fulfilled") {
       
      
       
        dispatch(getProfile({ userId }));
        toast("User Name Changed Successfully")
        navigate("/")
        setChange(!change)
        
        
     
       
      }
    }).catch((error) => {
      // Handle error if needed
      toast.error("Failed to change username.");
    });
  };
  useEffect(()=>{
    dispatch(getProfile(userId))
  },[])
  

  return (
    <div className="p-6 max-w-lg mx-auto flex flex-col item-start ">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-start">Account Settings</h2>
      {!change ? (
        <div>
          <div className="mb-6">
            <label className=" text-white text-sm font-semibold mb-2 flex">
              Username *
            </label>
            <input
              type='text'
              name='userName'
              value={userName}
              placeholder={username}
              className="border rounded-lg px-4 py-2 w-full  bg-gray-100 text-black cursor-not-allowed"
              readOnly
            />
            <button
              onClick={() => setChange(!change)}
              className="mt-4 w-full px-4 py-2 bg-white text-blue-700 rounded-lg border border-green-400 hover:bg-blue-300  hover:text-white  transition duration-300"
            >
              Change UserName
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            type='text'  
            name='userName'
            value={userName}
            placeholder={"username"}
            onChange={(e) => setUserName(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          />
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setChange(!change)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => changeUserNameHandler()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      )}<ToastContainer />
      
    </div>
    
    
  );
};


export default ChangeUsername
