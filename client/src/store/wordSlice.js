import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  words: [],
  status: null,
  error: null,
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const fetchWordLists = createAsyncThunk(
  "word/fetchWords",
  async function (userid) {
    const response = await axios(
      process.env.REACT_APP_API_URL + `api/word/wordlists/${userid}`
    );
    return response.data;
  }
);

export const addWordList = createAsyncThunk(
  "word/addWordList",
  async function (newWordList, { rejectWithValue }) {
    try {
      await axios.post(process.env.REACT_APP_API_URL + `api/word/wordlist`, {
        ...newWordList,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload;
    },
    addNewWordList: (state, action) => {
      state.words.push(action.payload);
    },
  },
  extraReducers: {
    [fetchWordLists.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchWordLists.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.words = action.payload;
    },
    [fetchWordLists.rejected]: (state, action) => setError,
    [addWordList.rejected]: (state, action) => setError,
  },
});

export const { setWords, addNewWordList } = wordSlice.actions;

export default wordSlice.reducer;
