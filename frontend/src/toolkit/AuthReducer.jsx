import {createSlice} from '@reduxjs/toolkit'
const initialState ={
    isAuthenticated :false,
    user:null,
};

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth:(state,action)=>{
            state.isAuthenticated = true,
            state.user = action.payload
        },
        ClearLogin:(state)=>{
            state.isAuthenticated = false,
            state.user = null
        }
    }
});

export const {ClearLogin,setAuth}  = AuthSlice.actions;
export default AuthSlice.reducer;