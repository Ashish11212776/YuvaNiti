import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    sendOTP,
    verifyOTP,
    loginWithPassword,
    getProfile,
} from "../features/authThunk";
import { generateCaptcha } from "../utils/generateCaptcha";
import { RiRefreshFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import OtpLayout from "./OtpLayout";
import { MdCheck } from "react-icons/md";
import login from "../../public/login.png";
import { FiLogIn } from "react-icons/fi";
import StatusReject from "./Pages/StatusReject";
const LoginPage = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [otpEntered, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [generatedCaptcha, setGeneratedCaptcha] = useState("");
    const [isLoginWithPassword, setIsLoginWithPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOTPSent, loading, error, status } = useSelector((state) => state.auth);

    React.useEffect(() => {
        setGeneratedCaptcha(generateCaptcha());
    }, []);

    const handleSendOTP = () => {
        if (mobileNumber.length === 10 && captcha === generatedCaptcha) {
            dispatch(sendOTP(mobileNumber)).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    toast.success("Otp Sent !!!!!!!");
                } else if (res.meta.requestStatus === "rejected") {
                    toast.error("Otp not sent");
                }
            });
        } else {
            toast.warning("Invalid credentials");
        }
    };
    const handleVerifyOTP = () => {
        dispatch(verifyOTP({ mobileNumber, otpEntered })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                const userId = res.payload.data.userDetails.id;
                dispatch(getProfile({ userId }));
                navigate("/");
                toast.success("User login Successfully !!!!!");
            } else if (res.meta.requestStatus === "rejected") {
                toast.error(res.message);
            }
        });
    };

    const handleLoginWithPassword = () => {
        if (captcha === generatedCaptcha) {
            dispatch(loginWithPassword({ mobileNumber, password })).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    const userId = res.payload.data.userDetails.id;
                    dispatch(getProfile({ userId }));
                    toast("Login Successfully done !!!!");
                    navigate("/");
                } else if (res.meta.requestStatus === "rejected") {
                    toast("Something went wrong");
                }
            });
        } else {
            alert("Captcha is incorrect");
        }
    };
    const isFormValid =
        mobileNumber.length === 10 &&
        captcha.length >= 6 &&
        captcha === generatedCaptcha;
    return (
        <>{status ?
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6 font-roboto">
                <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2 border-4 border-blue-50">
                    {/* Left Section */}
                    <div className="hidden md:flex flex-col justify-center items-start w-full gap-6 p-10 bg-gradient-to-br from-blue-500 to-blue-500 text-white relative overflow-hidden">
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
                            onClick={() => navigate("/signup")}
                        >
                            Register
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

                        {!isLoginWithPassword ? (
                            <>
                                {!isOTPSent ? (
                                    <div className="w-full space-y-5">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block text-gray-700">Mobile Number</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                className="border-2 border-blue-100 p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50/50 text-sm h-[52px] w-full rounded-xl shadow-sm transition-all duration-300"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                maxLength={10}
                                                aria-label="Mobile Number"
                                            />
                                            <p className="text-[11px] text-gray-500 mt-1">You will receive an OTP on this number</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Captcha"
                                                className="border-2 border-blue-100 p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50/50 text-sm h-[52px] w-full sm:w-[50%] rounded-xl shadow-sm"
                                                value={captcha}
                                                onChange={(e) => setCaptcha(e.target.value)}
                                            />
                                            <div
                                                onClick={() => setGeneratedCaptcha(generateCaptcha())}
                                                className="bg-blue-500 text-white font-bold rounded-xl text-center tracking-widest h-[52px] w-full sm:w-[45%] shadow-sm flex items-center justify-center cursor-pointer hover:bg-blue-600 transition duration-300 group"
                                            >
                                                <span className="text-sm mr-2">{generatedCaptcha}</span>
                                                <RiRefreshFill className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSendOTP}
                                            disabled={!isFormValid || loading}
                                            className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg
                        ${!isFormValid || loading
                                                    ? "bg-blue-300 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                                                }`}
                                        >
                                            {loading ? "Sending OTP..." : "Get OTP"}
                                        </button>

                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setIsLoginWithPassword(true)}
                                                disabled={!isFormValid}
                                                className={`text-blue-600 transition duration-300 text-sm hover:underline ${!isFormValid ? "cursor-not-allowed opacity-50" : "hover:text-blue-800"}`}
                                            >
                                                Login with password instead
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <OtpLayout setOTP={setOTP} otpEntered={otpEntered} handleVerifyOTP={handleVerifyOTP} loading={loading} />
                                )}
                            </>
                        ) : (
                            <div className="w-full space-y-5">
                                <div>
                                    <label className="text-sm font-medium mb-2 block text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        className="w-full border-2 border-blue-100 p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50/50 shadow-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        aria-label="Password"
                                    />
                                </div>
                                <button
                                    onClick={handleLoginWithPassword}
                                    disabled={!isFormValid || loading}
                                    className={`w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg
                ${!isFormValid || loading
                                            ? "bg-blue-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                                        }`}
                                >
                                    {loading ? "Verifying..." : (<>Login <FiLogIn /></>)}
                                </button>

                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setIsLoginWithPassword(false)}
                                        className="text-blue-600 hover:underline text-sm transition duration-300 hover:text-blue-800"
                                    >
                                        Login with OTP instead
                                    </button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-600 font-medium mt-6 text-center p-3 bg-red-50 rounded-xl border border-red-200 animate-pulse">
                                Error: {error.message || "Something went wrong!"}
                            </div>
                        )}
                    </div>
                </div>
                <ToastContainer closeButton={true} />

                {/* Background Pattern */}
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
            </div> : <StatusReject />}</>
    );
};

export default LoginPage;
