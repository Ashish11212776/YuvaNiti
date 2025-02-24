import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserName } from '../features/accountThunk'

const AccountSettings = () => {
    const {id} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const [userName,setUSerName]=useState("")
    const [change,setchange]=useState()
    const changeUserNameHandler=()=>{
         dispatch(changeUserName({ userName, id })).then((res) => {
                   if (res.meta.requestStatus === "fulfilled") {
                       navigate("/");
                   }
               });

    }
  return (
    <div>
      <div>Accounts Settings</div>
      <div>
        <input
      type='text'
      name='userName'
      value={userName}
      placeholder="Enter UserNAme"
      onChange={()=>e.target.value}


      />
      <button onClick={changeUserNameHandler}>
        Change
      </button>
      </div>
      
    </div>
  )
}

export default AccountSettings
