import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import axios from "axios";



  const token = sessionStorage.getItem("authToken");

export const getAllData = createAsyncThunk("category/getAllData", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/category-custom/get-all-categories`);
    
    return res.data?.data?.categories || [];
  } catch (error) {

    return rejectWithValue(error.response?.data?.message || "Failed to fetch categories.");
  }
});


//dashboard work
export const subCategories = createAsyncThunk(
  "category/subCategories",
  async (category_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/category-custom/get-sub-categories/?category=${category_id}`
      );
      if (res.status === 200) {
        const { categories } = res.data.data;

        // Extract category IDs
        const categoryIds = categories.map((item) => item.category_id);

        if (categoryIds.length === 0) {
          return { subCategories: categories, advertisements: [] };
        }

        const categoryIdsQuery = categoryIds.join(",");
        const adsRes = await axios.get(
          `${BASE_URL}/api/v1/advertisement/get-all-advertisement-by-categoryId?category=${categoryIdsQuery}&offset=0&limit=10`,
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        localStorage.setItem("subcategories",JSON.stringify(adsRes.data))

        return  adsRes.data;
        
        
      }
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  })  