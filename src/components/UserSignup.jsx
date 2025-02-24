import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UserSignUp = () => {
  const [user_number, setUserNumber] = useState("");
  const [user_captcha, setUserCaptcha] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [errors, setErrors] = useState({}); // Store error messages

  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  };

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
    <div className="main-container flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          User SignUp
        </h1>
        
        <form id="myForm" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              name="usernumber"
              placeholder="Enter Mobile Number 📞"
              value={user_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-500"
            />
            {errors.user_number && (
              <p className="error text-red-600 text-sm">{errors?.user_number}</p>
            )}
          </div>

          <div className="captcha space-y-4 bg-gray-50 p-4 rounded-lg">
            <input
              type="text"
              name="captcha"
              placeholder="Enter Captcha"
              value={user_captcha}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
            
            <div className="flex space-x-3">
              <input
                type="text"
                name="captcha_display"
                value={captchaValue}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 font-mono text-lg text-center tracking-wider"
              />
              <button
                type="button"
                onClick={() => setCaptchaValue(generateCaptcha())}
                className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-200 flex items-center justify-center"
              >
                🔄
              </button>
            </div>
            
            {errors?.user_captcha && (
              <p className="error text-red-600 text-sm">{errors?.user_captcha}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-200 font-medium shadow-sm hover:shadow focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserSignUp;
