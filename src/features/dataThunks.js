import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const getAllData = createAsyncThunk("category/getAllData", async()=>{
   
    try {
    const res = await axios.get("https://xtmpxko7pt.ap.loclx.io/api/v1/category-custom/get-all-categories");
     
    return res.data?.data?.categories||[]; 
    } catch (error) {
        console.log(error);
        return error;
    }
    
});