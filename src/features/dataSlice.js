import { createSlice} from "@reduxjs/toolkit";
import { getAllData, subCategories } from "./dataThunks";


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

//advertismentv slice
export const advertismentData=createSlice({
  name:"advertismentData",
  initialState:{
    advertismentData:{},
    loading:false,
    status:"pending",
    error:null
  },
  extraReducers:(builder)=>{
    builder.addCase(subCategories.pending, (state) => {
      state.loading = true;
      state.error=null;
    })
    .addCase(subCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.advertismentData = action.payload; 
      state.status="fulfilled";
    })
    .addCase(subCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error; // Set the error message in the state
      state.status="rejected";
    });
  }
})


export const categoryReducer = category.reducer;
export const advertismentDataReducer = advertismentData.reducer;

