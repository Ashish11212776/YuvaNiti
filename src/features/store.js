import { configureStore } from "@reduxjs/toolkit";
import     {categoryReducer,advertismentDataReducer}  from "./dataSlice";
import authReducers from "./authSlice"
import accountReducers from "./accountSlice"
const store = configureStore({
    reducer:{

        auth:authReducers,
        account:accountReducers,
        app:categoryReducer,
        advertismentData:advertismentDataReducer
    }
})
export default store