import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/login/loginSlice";
import bankReducer from "../slices/bank/bankSlice";
import mainReducer from "../slices/main/mainSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    bank: bankReducer,
    main: mainReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
