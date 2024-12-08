import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_API;
// student ka data fetch ke liye thunk

export const studentDataFetch = createAsyncThunk(
  "data/studentFetch",
  async ({ page, limit }) => {
    const response = await axios.get(
      `${API_URL}student/all-student?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const teachersData = createAsyncThunk(
  "data/teachersFetch",
  async ({ page, limit }) => {
    const response = await axios.get(
      `${API_URL}teacher/all-teacher?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const driversFetch = createAsyncThunk("data/driversFetch", async () => {
  const response = await axios.get(`${API_URL}driver/all-driver`, {
    withCredentials: true,
  });

  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    students: [],
    totalStudentPage: 0,
    teachers: [],
    totalTeacherPage: 0,
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
        (state.isLoading = false),
          (state.students = action.payload.result),
          (state.totalStudentPage = action.payload.totalPage);
      })
      .addCase(studentDataFetch.rejected, (state) => {
        (state.isLoading = false), (state.error = "error happened");
      })
      .addCase(teachersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(teachersData.fulfilled, (state, action) => {
        state.teachers = action.payload.data;
        state.totalTeacherPage = action.payload.totalPage;
      });
  },
});

export default dataSlice.reducer;
