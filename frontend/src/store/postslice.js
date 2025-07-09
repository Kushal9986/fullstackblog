import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts:[]
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        upload:(state,action)=>{
            // console.log("action.payload",action.payload)
            console.log("hello")
            console.log("action,",action.payload)
            state.posts.push(action.payload)
            console.log("state.posts",[...state.posts])

            // console.log("state.userdata::",state.userData)
        },
        
    }
})

export const {upload} = postSlice.actions
export default postSlice.reducer