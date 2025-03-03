import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { generateCaptcha } from "../utils/generateCaptcha";
import { useDispatch, useSelector } from "react-redux";
import { userSignupOTP } from "../features/authThunk";
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
        toast("User login Successfully !!!!!");
        setisOtpSend(false);
        navigate("/account");
      } else if (res.meta.requestStatus === "rejected") {
        toast(res.message);
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row m-6 p-4 w-full md:w-[90%] lg:w-[80%] min-h-screen font-roboto mx-auto  bg-white">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 gap-6 p-8 rounded-lg h-1/2 shadow-slate-300 bg-gray-100">
        <h2 className="font-bold text-3xl mb-4 text-gray-800">
          New to Yuva Niti?
        </h2>

        <div className="space-y-4 w-full">
          <p className="flex items-center gap-3 text-gray-700">
            <MdCheck className="h-5 w-5 text-blue-400 flex-shrink-0" /> Apply
            Govt form in simple click
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <MdCheck className="h-5 w-5 text-blue-400 flex-shrink-0" /> Get
            Notifications
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <MdCheck className="h-5 w-5 text-blue-400 flex-shrink-0" /> Read
            Govt Schemes
          </p>
        </div>

        <button
          className="w-full text-blue-600 border-2 border-blue-600 py-3 rounded-md hover:bg-blue-50 transition-all duration-300 font-medium"
          onClick={() => navigate("/login")}
        >
          Already have Account
        </button>

        <div className="mt-6 w-full flex justify-center">
          <img
            src={login}
            alt="Login illustration"
            className="object-contain max-w-[360px] w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-top mt-52 w-full md:w-1/2 bg-white shadow-slate-300 h-1/2 p-8 rounded-lg shadow-sm">
        <h1 className="mb-10 text-left text-3xl text-gray-900">
          Register User
        </h1>
        {!isOtpSend ? (
          <>
            <label className="text-xl font-medium mb-1 text-left block text-gray-300">
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
  );
};

export default UserSignUp;
