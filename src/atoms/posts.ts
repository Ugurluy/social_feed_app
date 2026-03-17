import { atom } from "jotai";
import type { Post, PostWithUser } from "../types/schemas";
import { usersAtom } from "./users";
import { searchQueryAtom } from "./search";

export const POSTS_PER_PAGE = 10;

export const postsAtom = atom<Post[]>([]);

/**
 * Creates a new array of posts that includes the user information for each post.
 */
export const enrichedPostsAtom = atom<PostWithUser[]>((get) => {
  const posts = get(postsAtom);
  const users = get(usersAtom);
  const userMap = new Map(users.map((u) => [u.id, u]));

  return posts.map((post) => ({
    ...post,
    user: userMap.get(post.userId) ?? null,
  }));
});


/**
 * Filters the enriched posts based on the search query from 'searchQueryAtom'.
 * @returns An array of posts that match the search query. 
 */
export const filteredPostsAtom = atom<PostWithUser[]>((get) => {
  const query = get(searchQueryAtom).toLowerCase().trim();
  const posts = get(enrichedPostsAtom);
  if (!query) return posts;
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.body.toLowerCase().includes(query) ||
      (p.user?.name ?? "").toLowerCase().includes(query),
  );
});

export const currentPageAtom = atom(1);

/**
 * Calculates the total number of pages based on the length of the filtered posts.
 * @returns The total number of pages for pagination.
 */
export const totalPagesAtom = atom((get) => {
  const total = get(filteredPostsAtom).length;
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
});

/**
 * Returns a paginated list of posts based on the current page and the filtered posts.
 * @returns An array of posts for the current page.
 */
export const paginatedFeedAtom = atom<PostWithUser[]>((get) => {
  const page = get(currentPageAtom);
  const start = (page - 1) * POSTS_PER_PAGE;
  return get(filteredPostsAtom).slice(start, start + POSTS_PER_PAGE);
});
