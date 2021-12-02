import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  words: [],
  status: null,
  loading: false,
  error: null,
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchWordLists = createAsyncThunk(
  "word/fetchWordLists",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/word/wordlists/${userid}`
      );

      if (!response.ok) {
        throw new Error(`Could not fetch, status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      rejectWithValue(e.message);
    }
  }
);

export const addWordList = createAsyncThunk(
  "word/addWordList",
  async function (newWordList, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "api/word/wordlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newWordList }),
        }
      );

      if (!response.ok) {
        throw new Error(`Could not fetch, status: ${response.status}`);
      }

      const data = await response.json();

      dispatch(wordListCreated(data.data));
    } catch (e) {
      rejectWithValue(e.message);
    }
  }
);

export const deleteWordList = createAsyncThunk(
  "word/deleteWordList",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/word/wordlist/${id}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      dispatch(wordListDeleted(data.data));
    } catch (e) {
      rejectWithValue(e.message);
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
    wordListCreated: (state, action) => {
      state.words.push(action.payload);
    },

    wordListDeleted: (state, action) => {
      state.words = state.words.filter((w) => w._id !== action.payload._id);
    },
  },
  extraReducers: {
    [fetchWordLists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchWordLists.fulfilled]: (state, action) => {
      state.loading = false;
      state.words = action.payload;
    },
    [fetchWordLists.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [addWordList.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [deleteWordList.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const { actions, reducer } = wordSlice;
export default reducer;

export const { setWords, wordListCreated, wordListDeleted } = actions;
