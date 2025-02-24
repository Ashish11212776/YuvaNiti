import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import generateCaptcha from "../utils/gengenerateCaptcha";

const UserSignUp = () => {
  const [user_number, setUserNumber] = useState("");
  const [user_captcha, setUserCaptcha] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [errors, setErrors] = useState({}); // Store error messages

  useEffect(() => {
    setCaptchaValue(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "usernumber") {
      setUserNumber(value);
    } else if (name === "captcha") {
      setUserCaptcha(value);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    const phoneRegex = /^[1-9][0-9]{9}$/;
    if (!user_number.match(phoneRegex)) {
      newErrors.user_number = "Enter a valid 10-digit mobile number.";
    }

    if (user_captcha !== captchaValue) {
      newErrors.user_captcha = "CAPTCHA does not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please enter valid data.");
      return;
    }

    try {
      const response = await axios.post(
        "https://xtmpxko7pt.ap.loclx.io/api/v1/otp/send-otp",
        { mobileNumber: user_number }
      );
      console.log("Success:", response.data);
      toast.success("OTP sent successfully!");

      setCaptchaValue(generateCaptcha());
      setUserCaptcha("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending OTP!");
    }
  };

     return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl text-white">📚</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Take the Lead Today, Shape a Brighter Tomorrow—One Step Ahead for a Future Full of Possibilities.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm bg-opacity-90">
          <form id="myForm" onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="usernumber"
                  placeholder="Enter Mobile Number"
                  value={user_number}
                  onChange={handleChange}
                  aria-label="Mobile Number"
                  required
                  className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  📞
                </span>
              </div>
              {errors?.user_number && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.user_number}
                </p>
              )}
            </div>

            {/* Captcha Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CAPTCHA Verification
              </label>
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl space-y-4">
                {/* CAPTCHA Display */}
                <div className="flex justify-between items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="captcha-display relative flex-1">
                    <div 
                      className="px-4 py-3 bg-[repeating-linear-gradient(45deg,#eee,#eee_1px,#fff_2px,#fff_3px)] select-none"
                    >
                      <div className="flex justify-center items-center h-10">
                        {captchaValue.split('').map((char, index) => (
                          <span 
                            key={index}
                            className="inline-block mx-0.5 font-mono text-2xl"
                            style={{
                              transform: `rotate(${Math.random() * 20 - 10}deg) translateY(${Math.random() * 6 - 3}px)`,
                              color: `hsl(${Math.random() * 360}, 70%, 40%)`,
                              textShadow: '1px 1px 0 rgba(0,0,0,0.1)'
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_85%,rgba(0,0,0,0.05))]"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCaptchaValue(generateCaptcha())}
                    className="h-full px-4 border-l border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    aria-label="Refresh CAPTCHA"
                  >
                    🔄
                  </button>
                </div>

                {/* CAPTCHA Input */}
                <input
                  type="text"
                  name="captcha"
                  placeholder="Enter the code shown above"
                  value={user_captcha}
                  onChange={handleChange}
                  required
                  className="w-full h-[52px] px-4 rounded-xl border italic border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                />
                
                {errors?.user_captcha && (
                  <p className="text-red-500 text-sm flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.user_captcha}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[52px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:translate-y-[-1px] active:translate-y-0 active:scale-[0.99] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserSignUp;
