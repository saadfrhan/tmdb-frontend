import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchForm({ value }: { value: string }) {
  const navigate = useNavigate();
  return (
    <form
      className="max-w-4xl flex space-x-2"
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
        className="rounded-full w-full"
      />
      <Button
        size="icon"
        className="rounded-full max-md:bg-transparent max-md:text-foreground max-md:hover:bg-transparent"
      >
        <Search />
      </Button>
    </form>
  );
}
