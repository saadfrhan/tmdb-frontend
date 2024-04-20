import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_KEY = `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`;

interface Data {
  page: number;
  data: {
    id: number;
    original_title: string;
    poster_path: string;
    release_date: string;
  }[];
  total_pages: number;
}

interface Response {
  page: number;
  results: {
    id: number;
    adult: boolean;
    original_title: string;
    poster_path: string;
    release_date: string;
  }[];
  total_pages: number;
}

interface MovieDetails {
  original_title: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  overview: string;
  tagline: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string }[];
  budget: number;
  revenue: number;
  homepage: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders(headers) {
      headers.set("Authorization", TMDB_API_KEY);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchMovies: builder.query<
        Data,
        {
          page: number;
          search?: string;
        }
      >({
        query({ page, search }) {
          if (search && search.length > 0) {
            return `search/movie?language=en-US&query=${search}&page=${page}&include_adult=false`;
          } else {
            return `movie/popular?language=en-US&page=${page}`;
          }
        },
        transformResponse(response: Response) {
          const { page, results, total_pages } = response;
          const movies = results
            .filter((movie) => movie.adult === false)
            .map((movie) => {
              const { original_title, poster_path, release_date, id } = movie;
              return { original_title, poster_path, release_date, id };
            });
          return { page, data: movies, total_pages };
        },
      }),
      fetchMovie: builder.query<MovieDetails, string>({
        query(id = "693134") {
          return `movie/${id}?language=en-US`;
        },
        transformResponse(response: MovieDetails) {
          const {
            original_title,
            release_date,
            runtime,
            genres,
            overview,
            tagline,
            imdb_id,
            production_companies,
            production_countries,
            budget,
            revenue,
            homepage,
            backdrop_path,
            poster_path,
          } = response;
          return {
            original_title,
            release_date,
            runtime,
            genres,
            overview,
            tagline,
            imdb_id,
            production_companies,
            production_countries,
            budget,
            revenue,
            homepage,
            backdrop_path,
            poster_path,
          };
        },
      }),
    };
  },
});

export const { useFetchMoviesQuery, useFetchMovieQuery } = apiSlice;
