import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import parkingReducer from "../features/parking/parkingSlice"

export const store=configureStore({
    reducer: {
        auth: authReducer,
        parking: parkingReducer
    }
})