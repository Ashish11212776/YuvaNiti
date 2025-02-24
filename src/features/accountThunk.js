import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const changeUserName = createAsyncThunk(
    "account/userName",
    async (username,id, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `https://78fb-203-190-154-106.ngrok-free.app/api/v1/customer/update-username?customerId=${id}`,
          {username: username }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const changePassword = createAsyncThunk(
    "account/userName",
    async (password,confirmPassword,id, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `https://78fb-203-190-154-106.ngrok-free.app/api/v1/customer/create-or-update-password?customerId=${id}`,
          {password: password,confirmPassword:confirmPassword }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
