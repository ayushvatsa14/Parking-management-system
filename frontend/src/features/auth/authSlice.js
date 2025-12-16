import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    user: null
}

const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated=true
            state.user=action.payload.user
            state.token=action.payload.token
            localStorage.setItem("token", action.payload.token)
        },

        logout: (state) => {
            state.isAuthenticated=false
            state.user=null
            state.token=""
            localStorage.removeItem("token")
        }
    }
})

export const {login, logout}=authSlice.actions
export default authSlice.reducer