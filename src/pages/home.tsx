import GridSkeleton from "@/components/grid-skeleton";
import SearchForm from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { useFetchMoviesQuery } from "@/features/movie/movies-api-slice";
import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchMoviesQuery(page);

  return (
    <div className="mx-auto w-full p-[2rem] max-sm:p-[1rem] space-y-4">
      <SearchForm />
      {isLoading && <GridSkeleton />}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.data.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.original_title}
              className="bg-gray-100 rounded-md"
            >
              <img
                className="w-full rounded-t-md"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
              <div className="px-3 pb-3">
                <h2 className="text-lg font-semibold mt-2">
                  {movie.original_title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {movie.release_date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}

export default HomePage;
