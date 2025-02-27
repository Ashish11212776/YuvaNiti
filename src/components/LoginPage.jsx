import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP, loginWithPassword, getProfile } from "../features/authThunk";
import { generateCaptcha } from "../utils/generateCaptcha";
import { RiRefreshFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import OtpLayout from "./OtpLayout";
import { MdCheck } from "react-icons/md";
import login from "../../public/login.png"



const LoginPage = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [otpEntered, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [generatedCaptcha, setGeneratedCaptcha] = useState("");
    const [isLoginWithPassword, setIsLoginWithPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOTPSent, loading, error } = useSelector((state) => state.auth);


    React.useEffect(() => {
        setGeneratedCaptcha(generateCaptcha());
    }, []);

    const handleSendOTP = () => {
        if (mobileNumber.length === 10 && captcha === generatedCaptcha) {
            dispatch(sendOTP(mobileNumber)).then((res) => {
                
                if(res.meta.requestStatus==="fulfilled"){
                    toast("Otp Sent !!!!!!!")
                }
                else if(res.meta.requestStatus === "rejected"){
                    toast("Otp not sent")
                }
                
            });
        } else {
            toast("Invalid crediantiels");
        }
    };

    const handleVerifyOTP = () => {
        dispatch(verifyOTP({ mobileNumber, otpEntered })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                const userId = res.payload.data.userDetails.id
                
                
                dispatch(getProfile({userId}))
                
                navigate("/");
                toast("User login Successfully !!!!!")
            }
            else if (res.meta.requestStatus === "rejected") {
                toast(res.message)

            }
        });

    };

    const handleLoginWithPassword = () => {
        if (captcha === generatedCaptcha) {
            dispatch(loginWithPassword({ mobileNumber, password })).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    toast("Login Successfully done !!!!")
                    navigate("/");
                }
                else if (res.meta.requestStatus === "rejected") {
                    toast(res.message)
                  
                }

            });
        } else {
            alert("Captcha is incorrect");
        }
    };

    const isFormValid = mobileNumber.length === 10 && captcha.length >= 6 && captcha === generatedCaptcha;

    return (
        <div className="flex flex-col md:flex-row m-6 p-4 w-full md:w-[90%] lg:w-[80%] min-h-screen font-roboto mx-auto gap-6 bg-white">
            {/* Left Section */}
            <div className="hidden md:flex flex-col justify-center items-start w-1/2 gap-6 p-8 rounded-lg h-auto ">
                <h2 className="font-bold text-3xl mb-4">New to Yuva Niti?</h2>

                <div className="space-y-4 w-full">
                    <p className="flex items-center gap-3">
                        <MdCheck className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700">Apply Govt form in simple click</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <MdCheck className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700">Get Notifications</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <MdCheck className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700">Read Govt Schemes</span>
                    </p>
                </div>

                <button className="w-1/2 text-blue-400 border-2 border-blue-400 flex items-center justify-center py-3 rounded-md hover:bg-blue-50 transition-all duration-300 font-medium">
                    Register
                </button>

                <div className="mt-6 w-full flex justify-center">
                    <img src={login} alt="Login illustration" className="object-contain max-w-[360px] w-full" />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex flex-col  items-start bg-white  rounded-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-6 text-sm">Plan your future with ease</p>

                {!isLoginWithPassword ? (
                    <>
                        {!isOTPSent ? (
                            <>
                                <label className="text-sm font-medium mb-1 block text-gray-700">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter Mobile Number"
                                    className="border border-gray-300 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-sm h-[52px] w-full rounded-md shadow-sm"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    maxLength={10}
                                    aria-label="Mobile Number"
                                />
                                <p className="text-[11px] text-gray-500 -mt-2 mb-4">You will receive an OTP on this number</p>

                                <div className="mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <input
                                        type="text"
                                        placeholder="Enter Captcha"
                                        className="border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-sm h-[52px] w-full sm:w-[50%] rounded-md shadow-sm"
                                        value={captcha}
                                        onChange={(e) => setCaptcha(e.target.value)}
                                    />
                                    <div
                                        onClick={() => setGeneratedCaptcha(generateCaptcha())}
                                        className="bg-blue-400 text-white font-bold rounded-md text-center tracking-widest h-[52px] w-full sm:w-[45%] shadow-sm flex items-center justify-center cursor-pointer hover:bg-blue-500 transition duration-300 gap-2"
                                    >
                                        <span className="text-sm">{generatedCaptcha}</span>
                                        <RiRefreshFill className="w-5 h-5" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSendOTP}
                                    disabled={!isFormValid || loading}
                                    className={`w-full py-4 rounded-md text-white font-semibold transition-all duration-300 shadow-sm
                            ${!isFormValid || loading
                                            ? "bg-blue-300 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    {loading ? "Sending OTP..." : "Get OTP"}
                                </button>

                                <div className="flex justify-center mt-5">
                                    <button
                                        onClick={() => setIsLoginWithPassword(true)}
                                        disabled={!isFormValid}
                                        className={`text-blue-600 transition duration-300 text-sm hover:underline ${!isFormValid ? "cursor-not-allowed opacity-50" : ""}`}
                                    >
                                        Login with password instead
                                    </button>
                                </div>
                            </>
                        ) : (
                            <OtpLayout setOTP={setOTP} otpEntered={otpEntered} handleVerifyOTP={handleVerifyOTP} loading={loading} />
                        )}
                    </>
                ) : (
                    <>
                        <label className="text-sm font-medium mb-1 block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="w-full border border-gray-300 p-4 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Password"
                        />
                        <button
                            onClick={handleLoginWithPassword}
                            disabled={!isFormValid || loading}
                            className={`w-full py-4 rounded-md text-white font-semibold transition-all duration-300 shadow-sm 
                    ${!isFormValid || loading
                                    ? "bg-purple-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Verifying..." : "Login"}
                        </button>

                        <div className="flex justify-center mt-5">
                            <button
                                onClick={() => setIsLoginWithPassword(false)}
                                className="text-blue-600 hover:underline text-sm transition duration-300"
                            >
                                Login with OTP instead
                            </button>
                        </div>
                    </>
                )}

                {error && (
                    <div className="text-red-600 font-medium mt-4 text-center p-3 bg-red-50 rounded-md">
                        Error: {error.message || "Something went wrong!"}
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>

    );
};

export default LoginPage;
