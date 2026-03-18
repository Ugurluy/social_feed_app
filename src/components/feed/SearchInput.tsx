import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { searchQueryAtom } from "../../atoms/search";
import { currentPageAtom } from "../../atoms/posts";

export function SearchInput() {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const setPage = useSetAtom(currentPageAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search posts by title, content or author..."
        className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:shadow-sm"
      />
    </div>
  );
}
