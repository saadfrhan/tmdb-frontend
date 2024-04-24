import GridSkeleton from "@/components/grid-skeleton";
import SearchForm from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { useFetchMoviesQuery } from "@/features/movie/movies-api-slice";
import { useGetPreferencesQuery } from "@/features/preferences/preferences-api-slice";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function HomePage() {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [skip, setSkip] = useState(true);
  const { user } = useUser();
  const { data: prefData } = useGetPreferencesQuery(user?.id || "", { skip });
  const { data, isLoading } = useFetchMoviesQuery({
    page,
    search: searchParams.get("search") || undefined,
    genres: prefData?.genres.map((genre) => genre.id).join("|") || undefined,
    rating: prefData?.rating || 0,
  });

  useEffect(() => {
    if (user && user.id) {
      setSkip(false);
      return;
    }
  }, [user]);

  return (
    <div className="mx-auto w-full px-[2rem] max-sm:px-[1rem] pb-[2rem] max-sm:pb-[1rem] space-y-2">
      <SearchForm value={searchParams.get("search") || ""} />
      {isLoading && <GridSkeleton />}
      {prefData && (prefData.genres.length === 0 || prefData.rating) && (
        <p>Preferences applied</p>
      )}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.data.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} key={index} className="rounded-md">
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
