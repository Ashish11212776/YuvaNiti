
import { createSlice } from "@reduxjs/toolkit";

import { sendOTP, verifyOTP, loginWithPassword, getProfile } from "./authThunk";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: JSON.parse(localStorage.getItem("profile")) || {},
    userData: JSON.parse(localStorage.getItem("userData")) || {},
    isOTPSent: false,
    isAuthenticated: sessionStorage.getItem("authToken") || null,
    loading: false,
    error: null,
    status:"pending"


  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder  //send otp
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.status="pending"
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.status="fulfilled"
        state.isOTPSent = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.status="rejected"
        state.error = action.payload;
      }) 
      //verify Otp
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.status="pending"
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.status="fulfilled"
        state.profile = action.payload

        state.isAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
         state.status="rejected"
        state.error = action.payload;
      })
      //login with password
      .addCase(loginWithPassword.pending, (state) => {
        state.loading = true;
        state.status="pending"
        state.error = null;

      }).addCase(loginWithPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true
        state.status="fulfilled"
        state.profile = action.payload
      }).addCase(loginWithPassword.rejected, (state, action) => {
        state.loading = false;
         state.status="rejected"
        state.error = action.payload
      })
      //get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.status="pending"
        state.error = null;
      }).addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true
        state.status="fulfilled"
        state.profile = action.payload

      }).addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
         state.status="rejected"
        state.error = action.payload
      })

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
