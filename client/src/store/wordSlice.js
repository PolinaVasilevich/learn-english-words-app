import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  words: [],
  currentWordList: [],
  status: null,
  loading: true,
  error: null,
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
      return rejectWithValue(e.message);
    }
  }
);

export const fetchCurrentWordList = createAsyncThunk(
  "word/fetchCurrentWordList",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/word/wordlist/${id}`
      );
      if (!response.ok) {
        throw new Error(`Could not fetch, status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addWordList = createAsyncThunk(
  "word/addWordList",
  async function (newWordList, { rejectWithValue, dispatch }) {
    console.log(newWordList);
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(wordListCreated(data.data));
    } catch (e) {
      return rejectWithValue(e.message);
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

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(wordListDeleted(data.data));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const learnWord = createAsyncThunk(
  "word/learnWord",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/word/wordlist/${data.wordlistid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wordid: data.wordid,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can't update this word. Server error.");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const addNewWord = createAsyncThunk(
  "word/addNewWord",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/word/wordlist/${data.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.word),
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      dispatch(wordAdded(data.word));
    } catch (err) {
      return rejectWithValue(err.message);
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

    wordAdded: (state, action) => {
      console.log(action.payload);
      state.currentWordList.push(action.payload);
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
      state.loading = false;
      state.error = action.payload;
    },

    [fetchCurrentWordList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchCurrentWordList.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentWordList = action.payload;
    },
    [fetchCurrentWordList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [addWordList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addWordList.fulfilled]: (state) => {
      state.loading = false;
    },
    [addWordList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteWordList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteWordList.fulfilled]: (state) => {
      state.loading = false;
    },
    [deleteWordList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [learnWord.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = wordSlice;
export default reducer;

export const { setWords, wordListCreated, wordListDeleted, wordAdded } =
  actions;
