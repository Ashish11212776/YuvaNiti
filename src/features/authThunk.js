import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const sendOTP = createAsyncThunk(
    "auth/sendOTP",
    async (mobileNumber, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "https://78fb-203-190-154-106.ngrok-free.app/api/v1/account/login-with-otp",
          {mobileNumber: mobileNumber ,role:5}
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  
  export const verifyOTP = createAsyncThunk(
    "auth/verifyOTP",
    async ({ mobileNumber, otpEntered }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "https://78fb-203-190-154-106.ngrok-free.app/api/v1/otp/verify-otp",
          { mobileNumber, otpEntered,role:5 }
        );
        const userDetails=response.data;
        const { token } = response.data;
        console.log(userDetails.data);
        
        sessionStorage.setItem("authToken", token);
        localStorage.setItem("profile",JSON.stringify(userDetails.data))
        return token;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
 export const loginWithPassword = createAsyncThunk("auth/loginwithpasword",
      async({mobileNumber,password},{rejectWithValue})=>{
          try{
              const response = await axios.post("https://78fb-203-190-154-106.ngrok-free.app/api/v1/account/login-with-password",{
                  mobileNumber,password,role:5
              })
              const {userDetails}=response.data;
              const {token} = response.data;
              sessionStorage.setItem("authToken",token)
              localStorage.setItem("profile",userDetails?.data)
              return token;
          }catch(error){
              return rejectWithValue(error.response.data)
  
          }
      }
  )