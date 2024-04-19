import BackButton from "@/components/back-button";
import { useFetchMovieQuery } from "@/features/movie/movies-api-slice";
import { useParams } from "react-router-dom";
import { intervalToDuration } from "date-fns";
import ImdbIcon from "@/icons/ImdbIcon";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "usehooks-ts";
import GridSkeletonMovie from "@/components/grid-skeleton-movie";

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

  const { data, isLoading } = useFetchMovieQuery(params.id!);
  const isLg = useMediaQuery("(min-width: 1250px)");
  const isSm = useMediaQuery("(min-width: 640px)");

  return (
    <div className="mx-auto w-full p-[2rem] max-sm:p-[1rem] space-y-4">
      <BackButton />
      {isLoading && <GridSkeletonMovie />}
      {data && (
        <div className="w-full gap-4 rounded-md relative">
          <div
            className="absolute inset-0 rounded-md"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.4,
              zIndex: -1,
            }}
          ></div>
          <div className="grid grid-cols-[0.5fr,2fr] max-[1250px]:grid-cols-1 gap-4 p-4 w-full rounded-md relative z-10">
            <img
              className="rounded-md h-full w-[30rem] max-[1250px]:w-full"
              src={
                isLg
                  ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                  : isSm
                  ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
                  : `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
              }
              alt={data.original_title}
            />

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="flex flex-col gap-4 w-full">
                <div>
                  <h1 className="text-3xl font-semibold">
                    {data.original_title}
                  </h1>
                  <p className="text-sm">
                    {data.release_date}
                    {data.production_countries.map((country) => (
                      <span key={country.iso_3166_1}>
                        {" "}
                        ({country.iso_3166_1})
                      </span>
                    ))}
                  </p>
                  <p className="text-sm">{formatDuration(data.runtime)}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Overview</h2>
                  <p className="text-sm">{data.tagline}</p>
                  <p className="text-sm">{data.overview}</p>
                </div>
                <a
                  href={`https://www.imdb.com/title/${data.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ImdbIcon />
                </a>
                <div>
                  <p>Genres:</p>
                  <div className="flex gap-2 flex-wrap">
                    {data.genres.map((genre) => (
                      <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-y-3">
                <div>
                  <p>Production Companies:</p>
                  <div className="flex gap-2 flex-wrap">
                    {data.production_companies.map((company) => (
                      <Badge key={company.id}>{company.name}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p>Budget:</p>
                  <p>{USDollar.format(data.budget)}</p>
                </div>
                <div>
                  <p>Revenue:</p>
                  <p>{USDollar.format(data.revenue)}</p>
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
