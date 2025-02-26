
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserName } from '../features/accountThunk';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../features/authThunk';




const ChangeUsername = () => {
    const {id} = useSelector((state) => state.auth.profile.data.userDetails);
    const username= useSelector((state)=>state.auth.userData.username)
   
    

    
    

 const userId=id
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userName, setUserName] = useState(username);
  const [change, setChange] = useState(false);
  

const changeUserNameHandler = () => {
    dispatch(changeUserName({ userName, userId })).then(()=>{
        dispatch(getProfile({userId})).then((res)=>{
            
            navigate("/")
        
        })
    })
   
  };
  

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h2>
      {!change ? (
        <div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Username
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
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Change
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
              onClick={()=>changeUserNameHandler()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default ChangeUsername
