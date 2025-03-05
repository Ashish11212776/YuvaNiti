import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { generateCaptcha } from "../utils/generateCaptcha";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, userSignupOTP } from "../features/authThunk";
import OtpLayout from "./OtpLayout";
import { verifyOTP } from "../features/authThunk";
import { useNavigate } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import login from "../../public/login.png";

const UserSignUp = () => {
  const [user_number, setUserNumber] = useState("");
  const [user_captcha, setUserCaptcha] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [otpEntered, setOTP] = useState("");
  const dispatch = useDispatch();
  const [isOtpSend, setisOtpSend] = useState(false);
  const navigate = useNavigate();
  const [Errors, setErrors] = useState("");

  const { loading } = useSelector((state) => state.auth);

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
      newErrors.user_captcha = "Captcha does not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const mobileNumber = user_number;
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please enter valid data.");
      return;
    }
    dispatch(userSignupOTP(mobileNumber))
      .then(() => {
        toast.success("OTP sent successfully!");
        setisOtpSend(true);
        setCaptchaValue(generateCaptcha());
        setUserCaptcha("");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error sending OTP!");
      });
  };

  const handleVerifyOTP = () => {
    dispatch(verifyOTP({ mobileNumber, otpEntered })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast("User signup Successfully !");
        const userId = res.payload.data.userDetails.id
        dispatch(getProfile({ userId }))
        setisOtpSend(false);
        navigate("/");
      } else if (res.meta.requestStatus === "rejected") {
        toast(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6 font-roboto">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2 border-4 border-blue-50">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-start w-full gap-6 p-10 bg-gradient-to-br from-blue-500 to-blue-700 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-20"></div>
                  
                  <h2 className="font-bold text-4xl mb-4 z-10 relative">New to Yuva Niti?</h2>
                  <div className="space-y-5 w-full z-10">
                      {[
                          "Apply Govt form in simple click",
                          "Get Notifications", 
                          "Read Govt Schemes"
                      ].map((feature, index) => (
                          <p 
                              key={index} 
                              className="flex items-center gap-4 transform transition-transform hover:translate-x-2 duration-300"
                          >
                              <MdCheck className="h-6 w-6 text-white flex-shrink-0 bg-blue-400 rounded-full p-1" />
                              <span className="text-lg">{feature}</span>
                          </p>
                      ))}
                  </div>
                  <button 
                      className="w-1/2 text-blue-600 bg-white font-bold flex items-center justify-center py-3 rounded-full hover:bg-blue-50 transition-all duration-300 z-10"
                      onClick={() => navigate("/login")}
                  >
                      Login
                  </button>
      
                  <div className="mt-6 w-full flex justify-center z-10">
                      <img 
                          src={login} 
                          alt="Login illustration" 
                          className="object-contain max-w-[360px] w-full transform hover:scale-105 transition-transform duration-300" 
                      />
                  </div>
              </div>

      {/* Right Section */}
      <div className="w-full flex flex-col justify-center items-start bg-white rounded-lg p-8 md:p-12">
      <h2 className="text-4xl font-bold text-blue-900 text-center w-full mb-2">Welcome Back</h2>
      <p className="text-gray-500 text-center mb-8 w-full text-sm">Plan your future with ease</p>
        {!isOtpSend ? (
          <>
            <label className="text-sm font-medium mb-2 block text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="border border-gray-300 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-sm h-[52px] w-full rounded-md shadow-sm"
              value={user_number}
              name="usernumber"
              onChange={handleChange}
              maxLength={10}
              aria-label="Mobile Number"
            />
            <p className="text-[11px] text-gray-500 -mt-2 mb-4">
              You will receive an OTP on this number
            </p>

            <div className="mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Enter Captcha"
                className="border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-sm h-[52px] w-full sm:w-[50%] rounded-md shadow-sm"
                value={user_captcha}
                name="captcha"
                onChange={handleChange}
              />
              <div
                onClick={() => setCaptchaValue(generateCaptcha())}
                className="bg-blue-400 text-white font-bold rounded-md text-center tracking-widest h-[52px] w-full sm:w-[45%] shadow-sm flex items-center justify-center cursor-pointer hover:bg-blue-500 transition duration-300 gap-2"
              >
                <span className="text-sm">{captchaValue}</span>
                <RiRefreshFill className="w-5 h-5" />
              </div>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={!validateForm || loading}
              className={`w-full py-4 rounded-md text-white font-semibold transition-all duration-300 shadow-sm
                ${
                  !validateForm || loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </>
        ) : (
          <OtpLayout
            setOTP={setOTP}
            otpEntered={otpEntered}
            handleVerifyOTP={handleVerifyOTP}
            loading={loading}
          />
        )}
      </div>
      <ToastContainer />
    </div>
    <style jsx>{`
        .bg-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
            background-size: 50px 50px;
            pointer-events: none;
        }
    `}</style>
    </div>
  );
};

export default UserSignUp;
