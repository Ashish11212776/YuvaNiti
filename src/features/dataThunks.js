import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk to get all categories
export const getAllData = createAsyncThunk("category/getAllData", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("https://xtmpxko7pt.ap.loclx.io/api/v1/category-custom/get-all-categories");
    
    // If response is successful, return the categories data
    return res.data?.data?.categories || [];
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching categories:", error);

    // You can return a custom error message using rejectWithValue
    return rejectWithValue(error.response?.data?.message || "Failed to fetch categories.");
  }
});
