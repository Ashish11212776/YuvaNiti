
import { createSlice } from "@reduxjs/toolkit";
import { changeUserName } from "./accountThunk";






const accountSlice = createSlice({
  name: "account",
  initialState: {
   
   
    loading: false,
    error: null,
    
   
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserName.fulfilled, (state) => {
        state.loading = false;
       
      })
      .addCase(changeUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    
  },
});

export default accountSlice.reducer;
