import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ClearLogin, setAuth } from "../AuthReducer";

export const CheckAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/user/checkAuth", {
        withCredentials: true,
      });

      if (response.data.success == true) {
        thunkAPI.dispatch(setAuth(response.data.user));
      } else{
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
        "http://localhost:5000/user/login",
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
