import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// student ka data fetch ke liye thunk

export const studentDataFetch = createAsyncThunk(
  "data/studentFetch",
  async () => {
    const response = await axios.get(
      "http://loclahost:5000/student/all-student",
      { withCredentials: true }
    );

    return response.data;
  }
);

export const teachersData = createAsyncThunk("data/teachersFetch", async () => {
  const response = await axios.get(
    "http://localhost:5000/teacher/all-teacher",
    { withCredentials: true }
  );

  return response.data;
});

export const driversFetch = createAsyncThunk("data/driversFetch", async () => {
  const response = await axios.get("http://localhost:5000/driver/all-driver", {
    withCredentials: true,
  });

  return response.data;
});


const dataSlice = createSlice({
    name:'data',
    initialState:{
        students:[],
        teachers:[],
        drivers:[],
        isLoading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(studentDataFetch.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(studentDataFetch.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.students = action.payload
        })
        .addCase(studentDataFetch.rejected,(state)=>{
            state.isLoading = false,
            state.error = 'error happened'
        })
    }
});


export default dataSlice.reducer;