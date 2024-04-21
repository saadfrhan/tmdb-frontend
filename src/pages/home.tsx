import GridSkeleton from "@/components/grid-skeleton";
import SearchForm from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { useFetchMoviesQuery } from "@/features/movie/movies-api-slice";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function HomePage() {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useFetchMoviesQuery({
    page,
    search: searchParams.get("search") || "",
  });

  return (
    <div className="mx-auto w-full px-[2rem] max-sm:px-[1rem] pb-[2rem] max-sm:pb-[1rem] space-y-4">
      <SearchForm value={searchParams.get("search") || ""} />
      {isLoading && <GridSkeleton />}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.data.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.original_title}
              className="rounded-md"
            >
              <img
                className="w-full rounded-md"
                loading="lazy"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://i0.wp.com/capri.org.au/wp-content/uploads/2017/10/poster-placeholder.jpg?ssl=1"
                }
                alt={movie.original_title}
              />
              <div className="px-3 pb-3">
                <h2 className="text-lg font-semibold mt-2">
                  {movie.original_title}
                </h2>
                <p className="text-sm mt-1">{movie.release_date}</p>
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
        {data && page < data.total_pages && (
          <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
