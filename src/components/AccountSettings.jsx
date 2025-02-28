import React, { useState } from 'react';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";

const AccountSettings = () => {
  const fullName= useSelector((state)=>state.auth?.userData?.fullName)


  return (<div className='bg-blue-950 font-roboto min-h-screen'>
    <div className='bg-gray-100 text-pink-500 h-16 flex items-center justify-between px-4 shadow-md'>
      <nav className='flex w-full justify-between items-center'>
        <div className="flex items-center gap-2">
          <FaRegUserCircle className="text-2xl" />
          <span className='font-medium'>{fullName}</span>
        </div>
        <a href="/account-settings" className="hover:text-pink-700 font-medium">
          Account Settings
        </a>
      </nav>
    </div>
    <div className='p-4'>
      <ChangeUsername />
      <ChangePassword />
    </div>
  </div>
  
  );
};

export default AccountSettings;
