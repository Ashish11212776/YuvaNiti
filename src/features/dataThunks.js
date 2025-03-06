import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllData = createAsyncThunk("category/getAllData", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("https://xtmpxko7pt.ap.loclx.io/api/v1/category-custom/get-all-categories");
    
    return res.data?.data?.categories || [];
  } catch (error) {

    console.error("Error fetching categories:", error);

    return rejectWithValue(error.response?.data?.message || "Failed to fetch categories.");
  }
});
