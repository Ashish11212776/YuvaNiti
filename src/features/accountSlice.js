import { createSlice } from "@reduxjs/toolkit";
import { changePassword, changeUserName, filledForms, recommendedForm, savedForms, updateUserDetails } from "./accountThunk";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    SavedForms:null,
    RecommendedForm:null,
    FilledForms:null,
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



      .addCase(savedForms.pending, (state) => {
        state.loading = true
        state.status = "pending"
        state.error = null
      }).addCase(savedForms.fulfilled, (state,action) => {
        state.loading = false;
        state.status = "fulfilled"
        
        state.SavedForms=action.payload;
        

        state.error = null
      }).addCase(savedForms.rejected, (state, action) => {
        state.loading = false
        state.status = "rejected"
        state.error = action.payload
      })

      .addCase(recommendedForm.pending, (state) => {
        state.loading = true
        state.status = "pending"
        state.error = null
      }).addCase(recommendedForm.fulfilled, (state,action) => {
        state.loading = false;
        state.status = "fulfilled"
        state.RecommendedForm=action.payload;
        
        state.error = null
      }).addCase(recommendedForm.rejected, (state, action) => {
        state.loading = false
        state.status = "rejected"
        state.error = action.payload
      })

      .addCase(filledForms.pending, (state) => {
        state.loading = true
        state.status = "pending"
        state.error = null
      }).addCase(filledForms.fulfilled, (state,action) => {
        state.loading = false;
        state.status = "fulfilled"
        state.FilledForms=action.payload;
    
        state.error = null
      }).addCase(filledForms.rejected, (state, action) => {
        state.loading = false
        state.status = "rejected"
        state.error = action.payload
      })
      
       .addCase(updateUserDetails.pending, (state) => {
        state.loading = true
        state.status = "pending"
        state.error = null
      }).addCase(updateUserDetails.fulfilled, (state,action) => {
        state.loading = false;
        state.status = "fulfilled"
        state.FilledForms=action.payload;
    
        state.error = null
      }).addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false
        state.status = "rejected"
        state.error = action.payload
      })
      

      


  },
});

export default accountSlice.reducer;
