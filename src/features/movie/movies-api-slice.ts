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

export const movieApiSlice = createApi({
  reducerPath: "movieApi",
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
          genres?: string;
          rating?: number;
        }
      >({
        query({ page, search, genres, rating }) {
          if (typeof search === "string") {
            return `search/movie?language=en-US&query=${search}&page=${page}&include_adult=false`;
          }
          const pageParam = page ? `&page=${page}` : "";
          const genresParam = genres ? `&with_genres=${genres}` : "";
          const ratingParam = rating ? `&vote_average.gte=${rating}` : "";
          console.log(
            `discover/movie?language=en-US${pageParam}&include_adult=false&sort_by=popularity.desc${genresParam}${ratingParam}`
          );
          return `discover/movie?language=en-US${pageParam}&include_adult=false&sort_by=popularity.desc${genresParam}${ratingParam}`;
        },
        transformResponse(response: Response) {
          const { page, results, total_pages } = response;
          const movies = results.map((movie) => {
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
          return {
            original_title: response.original_title,
            release_date: response.release_date,
            runtime: response.runtime,
            genres: response.genres,
            overview: response.overview,
            tagline: response.tagline,
            imdb_id: response.imdb_id,
            production_companies: response.production_companies,
            production_countries: response.production_countries,
            budget: response.budget,
            revenue: response.revenue,
            homepage: response.homepage,
            backdrop_path: response.backdrop_path,
            poster_path: response.poster_path,
          };
        },
      }),
      fetchGenres: builder.query<
        {
          genres: {
            id: number;
            name: string;
          }[];
        },
        void
      >({
        query() {
          return `genre/movie/list?language=en-US`;
        },
      }),
    };
  },
});

export const { useFetchMoviesQuery, useFetchMovieQuery, useFetchGenresQuery } =
  movieApiSlice;
