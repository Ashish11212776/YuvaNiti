import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/account/login-with-otp`,
        { mobileNumber: mobileNumber, role: 5 }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//signup with otp
export const userSignupOTP = createAsyncThunk(
  "auth/userSignupOTP",
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/otp/send-otp`, {
        mobileNumber: mobileNumber,
      });
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
      const response = await axios.post(`${BASE_URL}/api/v1/otp/verify-otp`, {
        mobileNumber,
        otpEntered,
        role: 5,
      });

      const { data } = response;
      const { token } = response.data;

      sessionStorage.setItem("authToken", token);
      localStorage.setItem("profile", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginWithPassword = createAsyncThunk(
  "auth/loginwithpasword",
  async ({ mobileNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/account/login-with-password`,
        {
          mobileNumber,
          password,
          role: 5,
        }
      );

      const { data } = response;

      const { token } = response.data;

      sessionStorage.setItem("authToken", token);

      localStorage.setItem("profile", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        `${BASE_URL}/api/v1/customer/get-customer-details/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      localStorage.setItem("userData", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

