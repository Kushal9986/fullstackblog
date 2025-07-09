import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log("action.payload",action.payload)

            state.status = true
            state.userData = action.payload
            // console.log("state.userdata::",state.userData)
        },
        logout:(state)=>{
            console.log("in logout info")
            state.status = false
            state.userData = null
            console.log("state.status",state.userData)
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer