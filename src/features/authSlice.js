import { createSlice } from "@reduxjs/toolkit";

import { sendOTP, verifyOTP, loginWithPassword, getProfile } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: JSON.parse(localStorage.getItem("profile")) || null,
    userData: JSON.parse(localStorage.getItem("userData")) || {},
    isOTPSent: false,
    isAuthenticated: false,
    loading: false,
    error: null,
    status: "pending",
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      sessionStorage.clear();
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /*{Send Otp}*/
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.status = "fulfilled";
        state.isOTPSent = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
      })
      /*{verify Otp}*/

      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "fulfilled";
        state.profile = action.payload;
        state.userData=action?.payload?.data?.userDetails
        
        state.isAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
      })
      /*{Login WIth Password}*/

      .addCase(loginWithPassword.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.status = "fulfilled";
        state.profile = action.payload;
        state.userData=action?.payload?.data?.userDetails
      })
      .addCase(loginWithPassword.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
      })
      /*{Get Profile}*/

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state,action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userData=action.payload
        
        state.status = "fulfilled";
        
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
