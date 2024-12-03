import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ClearLogin, setAuth } from "../AuthReducer";
const API_URL = import.meta.env.VITE_BACKEND_API;
export const CheckAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}user/checkAuth`, {
        withCredentials: true,
      });

      if (response.data.success == true) {
        thunkAPI.dispatch(setAuth(response.data.user));
      } else {
        thunkAPI.dispatch(ClearLogin());
      }
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(ClearLogin());
      throw error;
    }
  }
);

export const LoginThunk = createAsyncThunk(
  "auth/login",
  async (loginInfo, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}user/login`,
        loginInfo,
        {
          withCredentials: true,
        }
      );
      thunkAPI.dispatch(setAuth(response.data.user));
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(AuthLogout());
      throw error;
    }
  }
);
