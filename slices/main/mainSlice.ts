import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface MainState {
  activeTab: string;
}

const initialState: MainState = {
  activeTab: "credit",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setActiveTab: {
      reducer(state, action: PayloadAction<{ activeTab: string }>) {
        state.activeTab = action.payload.activeTab;
      },
      prepare(activeTab: string) {
        return { payload: { activeTab } };
      },
    },
  },
});

export const selectActiveTab = (state: RootState) => state.main.activeTab;

export const { setActiveTab } = mainSlice.actions;

export default mainSlice.reducer;
