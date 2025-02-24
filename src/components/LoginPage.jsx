import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP, loginWithPassword } from "../features/authThunk";
import OtpInput from "react-otp-input";

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

    const generateCaptcha = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let captchaText = "";
        for (let i = 0; i < 6; i++) {
            captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGeneratedCaptcha(captchaText);
    };

    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSendOTP = () => {
        if (mobileNumber.length === 10 && captcha === generatedCaptcha) {
            dispatch(sendOTP(mobileNumber));
        } else {
            alert("Please enter a valid 10-digit mobile number and correct captcha");
        }
    };

    const handleVerifyOTP = () => {
        dispatch(verifyOTP({ mobileNumber, otpEntered })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate("/");
            }
        });
    };

    const handleLoginWithPassword = () => {
        if (captcha === generatedCaptcha) {
            dispatch(loginWithPassword({ mobileNumber, password })).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    navigate("/");
                }
            });
        } else {
            alert("Captcha is incorrect");
        }
    };

    const isFormValid = mobileNumber.length === 10 && captcha.length >= 6;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-8 text-sm">Plan your future with ease</p>

                {!isLoginWithPassword ? (
                    <>
                        {!isOTPSent ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter Mobile Number"
                                    className="border border-gray-300 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-sm h-[52px] w-full rounded-md shadow-sm"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    maxLength={10}
                                    aria-label="Mobile Number"
                                />

                                <div className="mb-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                    <input
                                        type="text"
                                        placeholder="Enter Captcha"
                                        className="border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-sm h-[52px] w-full sm:w-[60%] rounded-md shadow-sm"
                                        value={captcha}
                                        onChange={(e) => setCaptcha(e.target.value)}
                                    />
                                    <div className="bg-purple-600 text-white font-bold rounded-md p-4 text-center text-lg tracking-widest h-[52px] w-full sm:w-[35%] shadow-md flex items-center justify-center">
                                        {generatedCaptcha}
                                    </div>
                                </div>

                                <button
                                    onClick={handleSendOTP}
                                    disabled={!isFormValid || loading}
                                    className={`w-full py-4 rounded-lg text-white font-semibold transition-all duration-300 shadow-md
                                        ${!isFormValid || loading
                                            ? "bg-blue-300 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
                                        }`}
                                >
                                    {loading ? "Sending OTP..." : "Login with Mobile"}
                                </button>
                                <button
                                    onClick={() => setIsLoginWithPassword(true)}
                                    disabled={!isFormValid}
                                    className={`mt-4 text-purple-600 hover:text-purple-800 transition duration-300 text-sm ${!isFormValid ? "cursor-not-allowed opacity-50" : ""}`}
                                >
                                    Login with password instead
                                </button>
                            </>
                        ) : (
                            <>
                                <OtpInput
                                    value={otpEntered}
                                    onChange={setOTP}
                                    numInputs={4}
                                    renderSeparator={<span className="mx-2"> </span>}
                                    inputStyle={{
                                        width: "3rem",
                                        height: "3rem",
                                        margin: "0.5rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #ccc",
                                        textAlign: "center",
                                    }}
                                    isInputNum
                                />
                                <button
                                    onClick={handleVerifyOTP}
                                    disabled={loading}
                                    className={`w-full py-4 rounded-lg text-white font-semibold transition-all duration-300 shadow-md 
                                        ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 transform hover:scale-105"}`}
                                >
                                    {loading ? "Verifying OTP..." : "Verify OTP"}
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="w-full border border-gray-300 p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Password"
                        />
                        <button
                            onClick={handleLoginWithPassword}
                            disabled={!isFormValid || loading}
                            className={`w-full py-4 rounded-lg text-white font-semibold transition-all duration-300 shadow-md 
                                ${!isFormValid || loading
                                    ? "bg-purple-400 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700 transform hover:scale-105"
                                }`}
                        >
                            {loading ? "Verifying..." : "Login"}
                        </button>
                        <button
                            onClick={() => setIsLoginWithPassword(false)}
                            className="mt-4 text-blue-600 hover:underline text-sm transition duration-300"
                        >
                            Login with OTP instead
                        </button>
                    </>
                )}

                {error && (
                    <p className="text-red-600 font-semibold mt-4 text-center">
                        Error: {error.message || "Something went wrong!"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
