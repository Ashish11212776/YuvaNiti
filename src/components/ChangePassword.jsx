import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../features/accountThunk';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const ChangePassword = () => {
  const { id } = useSelector((state) => state.auth.profile.data.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
 const [change,setChange] =useState(false)
  const { password, confirmPassword } = formData;

  useEffect(() => {
    // Validate password
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    });
    
    // Check if passwords match
    setPasswordsMatch(confirmPassword ? password === confirmPassword : true);
  }, [password, confirmPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleVisibility = (field) => {
    setVisibility({
      ...visibility,
      [field]: !visibility[field]
    });
  };

  const handleSubmit = () => {
    dispatch(changePassword({ password, confirmPassword, userId: id })).then((res)=>{
      if (res.meta.requestStatus=="fulfilled"){
        toast("password change")
        navigate("/account")
        setChange(!change)

      }
    })
      
  };

  const isPasswordValid = Object.values(validations).every(value => value);
  const isFormValid = password && confirmPassword && passwordsMatch && isPasswordValid;

  const ValidationItem = ({ isValid, text }) => (
    <div className="flex items-center">
      {isValid ? 
        <Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> : 
        <X size={16} className="text-red-500 mr-2 flex-shrink-0" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className='p-6 max-w-lg mx-auto flex flex-col item-start '>
      {!change?
    (<div className=' '>
          <div className="mb-6">
            <label className=" text-white text-sm font-semibold mb-2 flex">
              Password *
            </label>
            <input
              type='text'
              name='password'
             placeholder='************'
              className="border rounded-lg px-4 py-2 w-full  bg-gray-100 text-black cursor-not-allowed"
              readOnly
            />
            <button
              onClick={() => setChange(!change)}
              className="mt-4 w-full px-4 py-2 bg-white text-blue-700 rounded-lg border border-green-400 hover:bg-blue-300  hover:text-white  transition duration-300"
            >
              Change Password
            </button>
          </div>
        </div>):<>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      
      {/* Password Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={visibility.password ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              password && !isPasswordValid ? "border-yellow-500" : ""
            }`}
            placeholder="Enter password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => toggleVisibility('password')}
          >
            {visibility.password ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {/* Password Requirements */}
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700 mb-1">Password must have:</p>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <ValidationItem isValid={validations.length} text="At least 8 characters" />
            <ValidationItem isValid={validations.uppercase} text="At least one uppercase letter" />
            <ValidationItem isValid={validations.lowercase} text="At least one lowercase letter" />
            <ValidationItem isValid={validations.number} text="At least one number" />
            <ValidationItem isValid={validations.special} text="At least one special character" />
          </div>
        </div>
      </div>
      
      {/* Confirm Password Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={visibility.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              confirmPassword && !passwordsMatch ? "border-red-500" : ""
            }`}
            placeholder="Confirm password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => toggleVisibility('confirmPassword')}
          >
            {visibility.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {confirmPassword && !passwordsMatch && (
          <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
        )}
      </div>
      
      {/* Submit Button */}
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Change Password
      </button>
      <button onClick={()=>{setChange(!change)}} className=' w-full rounded-md mt-3 border hover:text-white hover:bg-blue-600 border-blue-400 bg-white text-blue-300'>Cancel</button>
    </div></>}
    <ToastContainer/>
    </div>
  );
};

export default ChangePassword;