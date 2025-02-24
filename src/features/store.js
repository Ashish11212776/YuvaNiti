import { configureStore } from "@reduxjs/toolkit";

import authReducers from "./authSlice"
import accountReducers from "./accountSlice"
const store = configureStore({
    reducer:{

        auth:authReducers,
        account:accountReducers
        
    }
})
export default store