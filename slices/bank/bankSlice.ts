import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FormData from "form-data";
import axios from "axios";
import { RootState } from "../../app/store";
import { BankType } from "../../app/type";
// import { LoggedInUser } from "../../app/type";

const POST_URL = "http://localhost:81/api/bank";

interface BankState {
  //  ----------- TÜM BANKALAR -----------
  banks: BankType[];
  getBanksError: string | null;
  getBanksStatus: string;
  //  ----------- TEK BANKA -----------
  bank: BankType | null;
  bankError: string | null;
  bankStatus: string;
}

const initialState: BankState = {
  //  ----------- TÜM BANKALAR -----------
  banks: [],
  getBanksStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  getBanksError: null,
  //  ----------- TEK BANKA -----------
  bank: null,
  bankStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  bankError: null,
};

//  ----------- TÜM BANKALAR -----------
export const getBanks: any = createAsyncThunk("bank/getBanks", async () => {
  const response = await axios({
    method: "get",
    url: POST_URL,
  })
    .then(function (response) {
      console.log(JSON.parse(response.request.response));
      return JSON.parse(response.request.response);
    })
    .catch(function (err) {
      console.log(err.message);
    });

  return response;
});

//  ----------- TEK BANKA -----------
export const getBank: any = createAsyncThunk(
  "bank/getBank",
  async (bank_id: number) => {
    const response = await axios({
      method: "get",
      url: POST_URL + `${bank_id}`,
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

export const addBank: any = createAsyncThunk(
  "bank/addBank",
  async (bank_name: string) => {
    const response = await axios({
      method: "post",
      url: POST_URL,
      data: { bank_name: bank_name },
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

export const deleteBank: any = createAsyncThunk(
  "bank/deleteBank",
  async (bank_name: string) => {
    const response = await axios({
      method: "delete",
      url: POST_URL,
      data: { bank_name: bank_name },
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

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder;
    // .addCase(loginUser.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(loginUser.fulfilled, (state, action) => {
    //   if (action.payload) {
    //     state.status = "succeeded";
    //     state.isLoggedIn = true;
    //     state.user = action.payload;
    //     localStorage.setItem("user", JSON.stringify(action.payload));
    //   } else {
    //     console.log("hata");
    //     state.status = "failed";
    //     state.isLoggedIn = false;
    //     state.error = "Kullanıcı adı veya şifre hatalı";
    //   }
    // })
    // .addCase(loginUser.rejected, (state, action) => {
    //   console.log(action);
    //   state.status = "failed";
    //   state.error = action.error.message;
    // });
  },
});

export const selectBank = (state: RootState) => state.bank.bank;
export const bankStatus = (state: RootState) => state.bank.bankStatus;
export const selectBanks = (state: RootState) => state.bank.banks;
export const getBanksStatus = (state: RootState) => state.bank.getBanksStatus;

export default bankSlice.reducer;
