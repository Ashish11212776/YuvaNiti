import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Lock, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../features/accountThunk';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ChangePassword = () => {
  const { id } = useSelector((state) => state.auth?.profile?.data?.userDetails);
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
  const [change, setChange] = useState(false);
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
    dispatch(changePassword({ password, confirmPassword, userId: id })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Password successfully changed!", {
          position: "top-right",
          autoClose: 3000
        });
        navigate("/account");
        setChange(!change);
      }
    });
  };

  const isPasswordValid = Object.values(validations).every(value => value);
  const isFormValid = password && confirmPassword && passwordsMatch && isPasswordValid;

  const ValidationItem = ({ isValid, text }) => (
    <div className="flex items-center mb-1">
      {isValid ? 
        <Check size={16} className="text-green-500 mr-2 flex-shrink-0" /> : 
        <X size={16} className="text-red-500 mr-2 flex-shrink-0" />}
      <span className={isValid ? "text-green-700" : "text-gray-500"}>{text}</span>
    </div>
  );

  return (
    <div className="p-6 max-w-lg mx-auto flex flex-col text-gray-700">
      {!change ? (
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <Lock className="text-blue-600 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Password Settings</h2>
          </div>
          
          <div className="mb-6">
            <label className="text-sm font-semibold mb-2 block text-gray-600">
              Current Password
            </label>
            <div className="relative">
              <input
                type="text"
                name="password"
                placeholder="••••••••••••"
                className="border border-gray-200 rounded-lg px-4 py-3 w-full bg-gray-50 text-gray-400 cursor-not-allowed"
                readOnly
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
            </div>
            
            <button
              onClick={() => setChange(!change)}
              className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
              </svg>
              Change Password
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            Your password should be different from previous passwords and include a mix of letters, numbers, and symbols.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Lock className="mr-2" size={20} />
              Change Password
            </h2>
            <p className="text-blue-100 text-sm mt-1">Update your password to keep your account secure</p>
          </div>
          
          <div className="p-6">
            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={visibility.password ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    password ? (isPasswordValid ? "border-green-300 bg-green-50" : "border-yellow-300 bg-yellow-50") : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => toggleVisibility('password')}
                >
                  {visibility.password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <ValidationItem isValid={validations.length} text="At least 8 characters" />
                  <ValidationItem isValid={validations.uppercase} text="One uppercase letter" />
                  <ValidationItem isValid={validations.lowercase} text="One lowercase letter" />
                  <ValidationItem isValid={validations.number} text="One number" />
                  <ValidationItem isValid={validations.special} text="One special character" />
                </div>
              </div>
            </div>
            
            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={visibility.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    confirmPassword ? (passwordsMatch ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50") : "border-gray-300"
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => toggleVisibility('confirmPassword')}
                >
                  {visibility.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <X size={16} className="mr-1" /> Passwords do not match
                </p>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button
                type="button"
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center text-white font-medium transition duration-300 ${
                  isFormValid 
                    ? "bg-blue-600 hover:bg-blue-700 shadow-md" 
                    : "bg-blue-300 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                {isFormValid ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Update Password
                  </>
                ) : (
                  "Complete All Fields"
                )}
              </button>
              <button 
                onClick={() => setChange(!change)} 
                className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center font-medium transition duration-300"
              >
                <ArrowLeft size={18} className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
           <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              For security reasons, you'll be logged out after changing your password and will need to log in again.
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;