import { createSlice } from "@reduxjs/toolkit";
import { changePassword, changeUserName } from "./accountThunk";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    loading: false,
    error: null,
    status: "pending"
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
        state.status = "pending"
        state.error = null;
      })
      .addCase(changeUserName.fulfilled, (state) => {

        state.loading = false
        // state.userData = action.payload.data
        state.status = "fulfilled"

        state.error = null

      })
      .addCase(changeUserName.rejected, (state, action) => {
        state.loading = false;
        state.status = "rejected"
        state.error = action.payload;
      })
      // {change Password}       
      .addCase(changePassword.pending, (state) => {
        state.loading = true
        state.status = "pending"
        state.error = null
      }).addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.status = "fulfilled"
        state.error = null
      }).addCase(changePassword.rejected, (state, action) => {
        state.loading = false
        state.status = "rejected"
        state.error = action.payload
      })


  },
});

export default accountSlice.reducer;
