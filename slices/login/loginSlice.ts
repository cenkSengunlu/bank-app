import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import Cookies from "cookie";

const POST_URL = "http://localhost:81/api/login";

interface LoggedInUserState {
  user: any;
  error: string | null;
  status: string;
  isLoggedIn: boolean;
}

const initialState: LoggedInUserState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : {},
  // user: {},
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isLoggedIn:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? true
      : false,
};

export const loginUser: any = createAsyncThunk(
  "login/loginUser",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios({
      method: "post",
      url: POST_URL,
      data: { username: username, password: password },
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(JSON.parse(response.request.response));
        return JSON.parse(response.request.response);
      })
      .catch(function (err) {
        console.log(err.message);
      });

    return response;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("user");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.isLoggedIn = true;
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          console.log("hata");
          state.status = "failed";
          state.isLoggedIn = false;
          state.error = "Kullanıcı adı veya şifre hatalı";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectLoggedInUser = (state: RootState) => state.login.user;
export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const loginStatus = (state: RootState) => state.login.status;

export default loginSlice.reducer;
