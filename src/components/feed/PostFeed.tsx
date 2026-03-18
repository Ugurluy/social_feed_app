import { useAtomValue, useSetAtom } from "jotai";
import { currentPageAtom, totalPagesAtom, paginatedFeedAtom } from "../../atoms/posts";
import { PostCard } from "./PostCard";

/**
 * @returns A React component of the post feed with pagination controls.
 */
export function PostFeed() {
  const posts = useAtomValue(paginatedFeedAtom);
  const page = useAtomValue(currentPageAtom);
  const totalPages = useAtomValue(totalPagesAtom);
  const setPage = useSetAtom(currentPageAtom);

  const changePage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="space-y-4">
      {posts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-500">
          No posts to show
        </div>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
          <button
            onClick={() => changePage(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-40"
          >
            ← Previous
          </button>
          <span className="text-sm text-neutral-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => changePage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
