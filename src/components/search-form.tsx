import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function SearchForm() {
  return (
    <div className="max-w-2xl flex gap-4">
      <Input placeholder="Search a movie..." className="rounded-full" />
      <button>
        <Search />
      </button>
    </div>
  );
}
