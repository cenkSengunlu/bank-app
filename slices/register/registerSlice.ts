import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FormData from "form-data";
import axios from "axios";
import { RootState } from "../../app/store";
// import { LoggedInUser } from "../../app/type";

const POST_URL = "http://localhost:81/api/register";

interface RegisterState {
  user: any;
  error: string | null;
  status: string;
  isLoggedIn: boolean;
}

const initialState: RegisterState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : {},
  // user: {},
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isLoggedIn: false,
};

export const registerUser: any = createAsyncThunk(
  "register/registerUser",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios({
      method: "post",
      url: POST_URL,
      data: { username: username, password: password },
      headers: { "Content-Type": "multipart/form-data" },
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

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
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
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectRegister = (state: RootState) => state.register.user;
export const selectIsLoggedIn = (state: RootState) => state.register.isLoggedIn;
export const registerStatus = (state: RootState) => state.register.status;

export default registerSlice.reducer;
