import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wordApi = createApi({
  reducerPath: "wordApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getWords: builder.query({
      query: () => `allwords`,
    }),

    addWords: builder.mutation({
      query: (body) => ({
        url: `words`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetWordsQuery, useAddWordsMutation } = wordApi;
