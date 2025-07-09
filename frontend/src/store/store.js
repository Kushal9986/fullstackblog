import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice.js";
import postSlice from "./postslice.js"

const store = configureStore({
    reducer:{
        auth:authSlice,
        post:postSlice
    }
})
export default store