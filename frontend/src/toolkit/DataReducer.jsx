import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
const API_URL = import.meta.env.VITE_BACKEND_API;
// student ka data fetch ke liye thunk

export const studentDataFetch = createAsyncThunk(
  "data/studentFetch",
  async ({ page, limit, search, studentClass: studentClass }) => {
    const response = await axios.get(
      `${API_URL}student/all-student?page=${page}&limit=${limit}&search=${search}&studentClass=${studentClass}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const teachersData = createAsyncThunk(
  "data/teachersFetch",
  async ({ page, limit, search, subject: subject }) => {
    const response = await axios.get(
      `${API_URL}teacher/all-teacher?page=${page}&limit=${limit}&search=${search}&subject=${subject}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const driversFetch = createAsyncThunk(
  "data/driversFetch",
  async ({ page, limit, search, route }) => {
    const response = await axios.get(
      `${API_URL}driver/all-driver?page=${page}&limit=${limit}&search=${search}&route=${route}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    students: [],
    totalStudentPage: 0,
    teachers: [],
    totalTeacherPage: 0,
    drivers: [],
    totalDriverPage: 0,
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
      })
      .addCase(driversFetch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(driversFetch.fulfilled, (state, action) => {
        (state.drivers = action.payload.result),
          (state.totalDriverPage = action.payload.totalPage);
      });
  },
});

export default dataSlice.reducer;
