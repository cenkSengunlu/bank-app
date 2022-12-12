import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../configs/axiosConfig";
import { RootState } from "../../app/store";
import Router from "next/router";
import { BankType } from "../../typings";

interface BankState {
  //  ----------- TÜM BANKALAR -----------
  banks: BankType[];
  getBanksError: string | null;
  getBanksStatus: string;
  //  ----------- TEK BANKA -----------
  bank: BankType | null;
  bankError: string | null;
  bankStatus: string;
  //  ----------- BANKA EKLE -----------
  addBankError: string | null;
  addBankStatus: string;
  //  ----------- BANKA SİL -----------
  deleteError: string | null;
  deleteStatus: string;
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
  //  ----------- BANKA EKLE -----------
  addBankError: null,
  addBankStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  //  ----------- BANKA SİL -----------
  deleteError: null,
  deleteStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

//  ----------- TÜM BANKALAR -----------
// export const getBanks: any = createAsyncThunk("bank/getBanks", async () => {
//   const response = await axios({
//     method: "get",
//     url: POST_URL,
//   })
//     .then(function (response) {
//       console.log(JSON.parse(response.request.response));
//       return JSON.parse(response.request.response);
//     })
//     .catch(function (err) {
//       console.log(err.message);
//     });

//   return response;
// });

//  ----------- TEK BANKA -----------
export const getBank: any = createAsyncThunk(
  "bank/getBank",
  async (bank_id: number) => {
    return await axios
      .post(`banks/${bank_id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          redirect: {
            destination: "/login",
          },
        };
      });
  }
);

//  ----------- BANKA EKLE -----------
export const addBank: any = createAsyncThunk(
  "bank/addBank",
  async (bank_name: string) => {
    return await axios
      .post("banks/", { bank_name: bank_name })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          redirect: {
            destination: "/login",
          },
        };
      });
  }
);

//  ----------- INTEREST EKLE -----------
export const addInterest: any = createAsyncThunk(
  "bank/addInterest",
  async ({
    bank_id,
    interest,
    time_option,
    credit_type,
  }: {
    bank_id: number;
    interest: number;
    time_option: number;
    credit_type: number;
  }) => {
    return await axios
      .post("interests/", {
        bank_id: bank_id,
        interest: interest,
        time_option: time_option,
        credit_type: credit_type,
      })
      .then((res) => {
        return res.data;
      });
    // .catch((err) => {
    //   return {
    //     redirect: {
    //       destination: "/login",
    //     },
    //   };
    // });
  }
);

//  ----------- BANKA SİL -----------
export const deleteBank: any = createAsyncThunk(
  "bank/deleteBank",
  async (bank_id: number) => {
    return await axios
      .delete("banks/", { data: { id: bank_id } })
      .then(function (response) {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setInterest: {
      reducer(
        state,
        action: PayloadAction<{
          bank: BankType;
        }>
      ) {
        const { bank } = action.payload;
        console.log(bank);
        const banks = state.banks;
        state.banks = banks.map((b) => (b.id === bank.id ? bank : b));
        Router.replace(Router.asPath);
      },
      prepare(bank: BankType) {
        return { payload: { bank } };
      },
    },

    removeInterest: {
      reducer(
        state,
        action: PayloadAction<{
          bank: BankType;
        }>
      ) {
        const { bank } = action.payload;
        state.banks = state.banks.map((b) => (b.id === bank.id ? bank : b));
        Router.replace(Router.asPath);
      },
      prepare(bank: BankType) {
        return { payload: { bank } };
      },
    },

    updateInterest: {
      reducer(
        state,
        action: PayloadAction<{ id: number; obj: any; interest_index: number }>
      ) {
        const { id, obj, interest_index } = action.payload;
        const bank = state.banks.find((bank) => bank.id === id);
        if (bank) {
          bank.interests[interest_index] = {
            ...bank.interests[interest_index],
            ...obj,
          };
        }
        Router.replace(Router.asPath);
      },
      prepare(id: number, obj: any, interest_index) {
        return { payload: { id, obj, interest_index } };
      },
    },
  },
  extraReducers(builder) {
    builder
      //  ----------- TÜM BANKALAR -----------
      // .addCase(getBanks.pending, (state) => {
      //   state.getBanksStatus = "loading";
      // })
      // .addCase(getBanks.fulfilled, (state, action) => {
      //   state.getBanksStatus = "succeeded";
      //   state.banks = action.payload;
      // })
      // .addCase(getBanks.rejected, (state, action) => {
      //   console.log(action);
      //   state.getBanksStatus = "failed";
      //   state.getBanksError = action.error.message;
      // })
      //  ----------- TEK BANKA -----------
      .addCase(getBank.pending, (state) => {
        state.bankStatus = "loading";
      })
      .addCase(getBank.fulfilled, (state, action) => {
        state.bankStatus = "succeeded";
        state.bank = action.payload;
      })
      .addCase(getBank.rejected, (state, action) => {
        console.log(action);
        // Router.push("/login");
        state.bankStatus = "failed";
        state.bankError = action.error.message;
      })
      //  ----------- BANKA EKLE -----------
      .addCase(addBank.pending, (state) => {
        state.addBankStatus = "loading";
      })
      .addCase(addBank.fulfilled, (state, action) => {
        state.addBankStatus = "succeeded";
        const newBank = {
          id: action.payload.data.id,
          bank_name: action.payload.data.bank_name,
          interests: [],
        };
        state.banks.push(newBank);
        Router.replace(Router.asPath);
      })
      .addCase(addBank.rejected, (state, action) => {
        console.log(action);
        state.addBankStatus = "failed";
        state.addBankError = action.error.message;
      })
      //  ----------- BANKA SİL -----------
      .addCase(deleteBank.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        const deletedBank = action.payload.data;
        const banks = state.banks;
        state.banks = banks.filter((bank) => bank.id !== deletedBank.id);
        Router.replace(Router.asPath);
      })
      .addCase(deleteBank.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message;
      });
  },
});

export const selectBank = (state: RootState) => state.bank.bank;
export const bankStatus = (state: RootState) => state.bank.bankStatus;
export const selectBanks = (state: RootState) => state.bank.banks;
export const getBanksStatus = (state: RootState) => state.bank.getBanksStatus;

export const { setInterest, updateInterest, removeInterest } =
  bankSlice.actions;

export default bankSlice.reducer;
