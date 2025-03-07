import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import axios from "axios";


export const getAllData = createAsyncThunk("category/getAllData", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/category-custom/get-all-categories`);
    
    return res.data?.data?.categories || [];
  } catch (error) {

    console.error("Error fetching categories:", error);

    return rejectWithValue(error.response?.data?.message || "Failed to fetch categories.");
  }
});
