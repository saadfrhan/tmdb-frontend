import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const preferencesApiSlice = createApi({
  reducerPath: "prefApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "http://tmdb-backend-ruby.vercel.app"
        : "http://localhost:3000",
    prepareHeaders(headers) {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      postPreferences: builder.mutation<
        {
          message: string;
        },
        {
          user_id: string;
          genres: {
            name: string;
            id: number;
          }[];
          rating?: number;
        }
      >({
        query: ({ genres, rating, user_id }) => ({
          url: `preferences/${user_id}`,
          method: "POST",
          body: { genres, rating },
        }),
      }),
      getPreferences: builder.query<
        {
          genres: {
            name: string;
            id: number;
          }[];
          rating: number;
        },
        string
      >({
        query: (user_id) => `preferences/${user_id}`,
      }),
    };
  },
});

export const { useGetPreferencesQuery, usePostPreferencesMutation } =
  preferencesApiSlice;
