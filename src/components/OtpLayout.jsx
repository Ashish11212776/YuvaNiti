import React from 'react';
import OtpInput from "react-otp-input";

const OtpLayout = ({ setOTP, otpEntered, handleVerifyOTP, loading }) => {
    return (
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
        renderInput={(props) => <input {...props} />}
    />
    <button
        onClick={handleVerifyOTP}
        disabled={loading}
        className={`w-full py-4 rounded-lg text-white font-semibold transition-all duration-300 shadow-md 
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"}`}
    >
        {loading ? "Verifying OTP..." : "Verify OTP"}
    </button>
    </>
    );
};

export default OtpLayout;
