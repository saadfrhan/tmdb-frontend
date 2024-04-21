import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchGenresQuery } from "@/features/movie/movies-api-slice";

export default function SettingsPage() {
  const { data, isLoading } = useFetchGenresQuery();

  return (
    <div className="mx-auto w-full px-[2rem] max-sm:px-[1rem] max-w-4xl pb-[2rem] max-sm:pb-[1rem] space-y-4">
      <h1 className="text-3xl font-bold">Select Genres</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex gap-2 flex-wrap">
          {data &&
            data.genres?.map((genre) => (
              <Button key={genre.id}>{genre.name}</Button>
            ))}
        </ul>
      )}
      <h1 className="text-3xl font-bold">Set Rating</h1>
      <Input type="number" min="0" max="10" step="0.1" />
    </div>
  );
}
