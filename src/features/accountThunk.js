import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const changeUserName = createAsyncThunk(
  "account/changeUserName",
  async ({ userName, userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.post(
        `${BASE_URL}/api/v1/customer/update-username?customerId=${userId}`,
        { username: userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "account/changePassword",
  async ({ password, confirmPassword, userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.post(
        `${BASE_URL}/api/v1/customer/create-or-update-password?customerId=${userId}`,
        { password: password, confirmPassword: confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "account/updateUserDetails",
  async ({ data, userId }, { rejectWithValue }) => {
    try {

      const token = sessionStorage.getItem("authToken");

      const response = await axios.post(
        `${BASE_URL}/api/v1/customer/update?customerId=${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const savedForms = createAsyncThunk(
  "account/savedForms",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        `${BASE_URL}/api/v1/customer/forms/show-saved-forms?customer_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const recommendedForm = createAsyncThunk(
  "account/recommendedForm",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        `${BASE_URL}/api/v1/customer/forms/show-recommended-forms?customer_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const filledForms = createAsyncThunk(
  "account/filledForms",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        `${BASE_URL}/api/v1/customer/forms/show-filled-forms?customer_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
