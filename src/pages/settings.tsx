import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchGenresQuery } from "@/features/movie/movies-api-slice";
import {
  useGetPreferencesQuery,
  usePostPreferencesMutation,
} from "@/features/preferences/preferences-api-slice";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data, isLoading } = useFetchGenresQuery();
  const { user } = useUser();

  const { data: preferencesData, isLoading: preferencesIsLoading } =
    useGetPreferencesQuery(user?.id || "");

  const [updatePrefs, result] = usePostPreferencesMutation();

  const [rating, setRating] = useState<number | undefined>(undefined);
  const [genres, setGenres] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (preferencesData) {
      setGenres(preferencesData.genres);
      setRating(preferencesData.rating);
    }
  }, [preferencesData]);
  if (preferencesIsLoading || isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-[2rem] max-sm:px-[1rem] max-w-4xl pb-[2rem] max-sm:pb-[1rem] space-y-4">
      <h1 className="text-3xl font-bold">Select Genres</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex gap-2 flex-wrap">
          {data &&
            data.genres?.map((genre, index) => (
              <Button
                key={index}
                onClick={() => {
                  //  {id: number, name: string}
                  const genreIndex = genres.findIndex((g) => g.id === genre.id);
                  if (genreIndex === -1) {
                    setGenres([...genres, genre]);
                  } else {
                    const newGenres = [...genres];
                    newGenres.splice(genreIndex, 1);
                    setGenres(newGenres);
                  }
                }}
                variant={
                  genres.some((g) => g.id === genre.id)
                    ? "default"
                    : "secondary"
                }
              >
                {genre.name}
              </Button>
            ))}
        </ul>
      )}
      <h1 className="text-3xl font-bold">Set Rating</h1>
      <Input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={rating || 0}
        onChange={(e) => setRating(parseFloat(e.target.value))}
      />
      <Button
        onClick={() => {
          updatePrefs({
            user_id: user?.id || "",
            genres,
            rating,
          });
          if (result) {
            toast.success("Preferences saved");
            navigate("/");
          }
        }}
      >
        Save
      </Button>
    </div>
  );
}
