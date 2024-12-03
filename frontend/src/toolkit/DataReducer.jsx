import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_API;
// student ka data fetch ke liye thunk

export const studentDataFetch = createAsyncThunk(
  "data/studentFetch",
  async () => {
    const response = await axios.get(`${API_URL}/student/all-student`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const teachersData = createAsyncThunk("data/teachersFetch", async () => {
  const response = await axios.get(
    `${API_URL}/teacher/all-teacher`,
    { withCredentials: true }
  );
  return response.data;
});

export const driversFetch = createAsyncThunk("data/driversFetch", async () => {
  const response = await axios.get(`${API_URL}/driver/all-driver`, {
    withCredentials: true,
  });

  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    students: [],
    teachers: [],
    drivers: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(studentDataFetch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(studentDataFetch.fulfilled, (state, action) => {
        (state.isLoading = false), (state.students = action.payload.result);
      })
      .addCase(studentDataFetch.rejected, (state) => {
        (state.isLoading = false), (state.error = "error happened");
      })
      .addCase(teachersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(teachersData.fulfilled, (state, action) => {
        state.teachers = action.payload.data;
      });
  },
});

export default dataSlice.reducer;
