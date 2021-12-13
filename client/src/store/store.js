import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import wordReducer from "./wordSlice";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    word: wordReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
