import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["Wordlists", "Words"],
  endpoints: (builder) => ({
    getWordListsByUserId: builder.query({
      query: (userid) => `api/word/wordlists/${userid}`,
      providesTags: ["Wordlists"],
    }),

    getWordsByListId: builder.query({
      query: (id) => `api/word/wordlist/${id}`,
      providesTags: ["Words"],
    }),

    createWordList: builder.mutation({
      query: (wordlist) => ({
        url: "api/word/wordlist",
        method: "POST",
        body: wordlist,
      }),
      invalidatesTags: ["Wordlists"],
    }),

    deleteWordList: builder.mutation({
      query: (id) => ({
        url: `api/word/wordlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wordlists"],
    }),

    learnWord: builder.mutation({
      query: ({ id, wordid }) => ({
        url: `api/word/wordlist/${id}`,
        method: "PATCH",
        body: wordid,
      }),
      invalidatesTags: ["Words"],
    }),
  }),
});

export const {
  useGetWordListsByUserIdQuery,
  useGetWordsByListIdQuery,
  useCreateWordListMutation,
  useDeleteWordListMutation,
  useLearnWordMutation,
} = apiSlice;
