import { postSchema, type Post } from "../types/schemas";
import { apiGet, apiPost, apiDelete } from "./client";

/**
 * Fetches all posts from the API
 * @returns  A promise resolving to an array of posts
 */
export async function getPosts(): Promise<Post[]> {
  const data = await apiGet<unknown[]>("/posts");
  return data.flatMap((item) => {
    const result = postSchema.safeParse(item);
    return result.success ? [result.data] : [];
  });
}

/**
 * Creates a new post
 * @param body The post data
 * @returns A promise resolving to the created post
 */

export async function createPost(
  body: Omit<Post, "id">,
): Promise<Post> {
  const data = await apiPost<unknown>("/posts", body);
  return postSchema.parse(data);
}

/**
 * Deletes a post
 * @param id The ID of the post to delete
 * @returns A promise resolving when the post is deleted
 */
export async function deletePost(id: number): Promise<void> {
  await apiDelete(`/posts/${id}`);
}
