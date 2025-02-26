import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../features/accountThunk';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const {id} = useSelector((state) => state.auth.profile.data.userDetails);
    const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const dispatch = useDispatch()
  const userId=id;
  
  // Password validation states
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    });
    
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
 
  const changePasswordHandler =()=>{
    dispatch(changePassword({ password, confirmPassword, userId }))
    .then((res) => {
      navigate("/");
    });

  }

  

  const isPasswordValid = Object.values(validations).every(value => value === true);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              password && !isPasswordValid ? "border-yellow-500" : ""
            }`}
            placeholder="Enter password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {/* Password requirements */}
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700 mb-1">Password must have:</p>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div className="flex items-center">
              {validations.length ? 
                <Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> : 
                <X size={16} className="text-red-500 mr-2 flex-shrink-0" />}
              <span>At least 8 characters</span>
            </div>
            <div className="flex items-center">
              {validations.uppercase ? 
                <Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> : 
                <X size={16} className="text-red-500 mr-2 flex-shrink-0" />}
              <span>At least one uppercase letter</span>
            </div>
            <div className="flex items-center">
              {validations.lowercase ? 
                <Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> : 
                <X size={16} className="text-red-500 mr-2 flex-shrink-0" />}
              <span>At least one lowercase letter</span>
            </div>
            <div className="flex items-center">
              {validations.number ? 
                <Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> : 
                <X size={16} className="text-red-500 mr-2 flex-shrink-0" />}
              <span>At least one number</span>
            </div>
            <div className="flex items-center">
              {validations.special ? 
                <Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> : 
                <X size={16} className="text-red-500 mr-2 flex-shrink-0" />}
              <span>At least one special character</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              confirmPassword && !passwordsMatch ? "border-red-500" : ""
            }`}
            placeholder="Confirm password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={toggleConfirmPasswordVisibility}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {confirmPassword && !passwordsMatch && (
          <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
        )}
      </div>
      
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={!password || !confirmPassword || !passwordsMatch || !isPasswordValid}
        onClick={()=>changePasswordHandler()}
      >
        change pasasword
      </button>
    </div>
  );
};

export default ChangePassword;