import { createSlice} from "@reduxjs/toolkit";
import { getAllData } from "./dataThunks";


export const category = createSlice({
  name: "category",
  initialState: {
    data: [],  
    loading: false, 
    error: null, 
    status:"pending"   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllData.pending, (state) => {
      state.loading = true;
      state.error=null;
    })
    .addCase(getAllData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; 
      state.status="fulfilled";
    })
    .addCase(getAllData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Set the error message in the state
      state.status="rejected";
    });
  },
});

export default category.reducer;
