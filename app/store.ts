import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/login/loginSlice";
import registerReducer from "../slices/register/registerSlice";
import bankReducer from "../slices/bank/bankSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    bank: bankReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
