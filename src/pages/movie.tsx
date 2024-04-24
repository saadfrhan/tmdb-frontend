import { useFetchMovieQuery } from "@/features/movie/movies-api-slice";
import { useParams } from "react-router-dom";
import { intervalToDuration } from "date-fns";
import ImdbIcon from "@/icons/ImdbIcon";
import { Badge } from "@/components/ui/badge";
import GridSkeletonMovie from "@/components/grid-skeleton-movie";
import { useMediaQuery } from "usehooks-ts";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

function formatDuration(duration: number) {
  const { hours, minutes } = intervalToDuration({
    start: 0,
    end: duration * 60 * 1000,
  });
  return `${hours}h ${minutes}m`;
}

export default function Movie() {
  const params = useParams();
  const isMaxMd = useMediaQuery("(max-width: 768px)");

  const { data, isLoading } = useFetchMovieQuery(params.id!);
  return (
    <div className="relative mx-auto w-full px-[2rem] max-sm:px-[1rem] pb-[2rem] max-sm:pb-[1rem] space-y-4">
      <div className="absolute inset-0 min-h-screen" />

      {isLoading && <GridSkeletonMovie />}
      {data && (
        <div className="w-full gap-4 rounded-md relative z-10">
          <div className="grid grid-cols-[0.5fr,2fr] max-[1250px]:grid-cols-1 gap-4 w-full rounded-md">
            <img
              className="rounded-md h-full w-[30rem] max-[1250px]:w-full"
              src={
                isMaxMd
                  ? data.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`
                    : `https://image.tmdb.org/t/p/w1280${data.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${data.poster_path}`
              }
              alt={data.original_title}
            />

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="flex flex-col gap-4 w-full">
                <div>
                  <h1 className="text-4xl font-bold">{data.original_title}</h1>
                  <p className="text-lg">
                    {data.release_date}
                    {data.production_countries.map((country) => (
                      <span key={country.iso_3166_1}>
                        {" "}
                        ({country.iso_3166_1})
                      </span>
                    ))}
                  </p>
                  <p className="text-lg">{formatDuration(data.runtime)}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Overview</h2>
                  <p className="text-lg">{data.tagline}</p>
                  <p className="text-lg">{data.overview}</p>
                </div>
                <a
                  href={`https://www.imdb.com/title/${data.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ImdbIcon />
                </a>
                <div>
                  <p className="text-lg font-semibold">Genres:</p>
                  <div className="flex gap-2 flex-wrap">
                    {data.genres.map((genre) => (
                      <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-y-3">
                <div>
                  <p className="text-lg font-semibold">Production Companies:</p>
                  <div className="flex gap-2 flex-wrap">
                    {data.production_companies.map((company) => (
                      <Badge key={company.id}>{company.name}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">Budget:</p>
                  <p className="text-lg">{USDollar.format(data.budget)}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">Revenue:</p>
                  <p className="text-lg">{USDollar.format(data.revenue)}</p>
                </div>
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-500"
                >
                  Homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
