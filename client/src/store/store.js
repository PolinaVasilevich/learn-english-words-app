import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import wordReducer from "./wordSlice";

export const store = configureStore({
  reducer: { user: userReducer, word: wordReducer },
});
