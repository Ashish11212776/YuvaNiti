
import { createSlice } from "@reduxjs/toolkit";

import { sendOTP, verifyOTP,loginWithPassword} from "./authThunk";





const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: JSON.parse(localStorage.getItem("profile"))||null,
    isOTPSent: false,
    isAuthenticated: !!sessionStorage.getItem("authToken"),
    loading: false,
    error: null,
    id:null
   
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.isOTPSent = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state,action) => {
        state.loading = false;
        
        
        state.isAuthenticated = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginWithPassword.pending,(state)=>{
        state.loading=true;
        state.error=null;
      }).addCase(loginWithPassword.fulfilled,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true
      }).addCase(loginWithPassword.rejected),(state,action)=>{
        state.loading=false;
        state.error=payload
      }
    
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
