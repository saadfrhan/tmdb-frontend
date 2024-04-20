import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function SearchForm({ value }: { value: string }) {
  const navigate = useNavigate();
  return (
    <form
      className="max-w-2xl flex gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const search = new FormData(e.currentTarget).get("search");
        navigate(`/?search=${search}`);
      }}
    >
      <Input
        placeholder="Search a movie..."
        name="search"
        id="search"
        defaultValue={value}
        className="rounded-full"
      />
      <button>
        <Search />
      </button>
    </form>
  );
}
