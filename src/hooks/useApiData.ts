import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { usersAtom } from "../atoms/users";
import { postsAtom } from "../atoms/posts";
import { commentsAtom } from "../atoms/comments";
import { todosAtom } from "../atoms/todos";
import { dataLoadingAtom, dataErrorAtom } from "../atoms/loading";
import { getUsers } from "../api/users";
import { getPosts } from "../api/posts";
import { getComments } from "../api/comments";
import { getTodos } from "../api/todos";

/**
 * A custom hook to fetch and manage API data for users, posts, comments, and todos. 
 * It handles loading and error states, and stores the fetched data in Jotai atoms for global state management.
 * @returns An object of 'loading' and 'error' states for the API Data fetching.
 */
export function useApiData() {
  //
  const setUsers = useSetAtom(usersAtom);
  const setPosts = useSetAtom(postsAtom);
  const setComments = useSetAtom(commentsAtom);
  const setTodos = useSetAtom(todosAtom);
  const setLoading = useSetAtom(dataLoadingAtom);
  const setError = useSetAtom(dataErrorAtom);

  const loading = useAtomValue(dataLoadingAtom);
  const error = useAtomValue(dataErrorAtom);
  const users = useAtomValue(usersAtom);

  useEffect(() => {
    if (users.length > 0) return;

    let cancelled = false;

    async function fetchSetAllData() {
      try {
        const [users, posts, comments, todos] = await Promise.all([
          getUsers(),
          getPosts(),
          getComments(),
          getTodos(),
        ]);
        if (cancelled) return;
        setUsers(users);
        setPosts(posts);
        setComments(comments);
        setTodos(todos);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSetAllData();
    return () => {
      cancelled = true;
    };
  }, [users.length, setUsers, setPosts, setComments, setTodos, setLoading, setError]);

  return { loading, error };
}
