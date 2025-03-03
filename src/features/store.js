import { configureStore } from "@reduxjs/toolkit";
import     categoryReducers  from "./dataSlice";
import authReducers from "./authSlice"
import accountReducers from "./accountSlice"
const store = configureStore({
    reducer:{

        auth:authReducers,
        account:accountReducers,
        app:categoryReducers
    }
})
export default store