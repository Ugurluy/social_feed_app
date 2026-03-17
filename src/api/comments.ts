import { commentSchema, type Comment } from "../types/schemas";
import { apiGet, apiPost, apiDelete } from "./client";

/**
 * Fetches all comments from the API
 * @returns A promise resolving to an array of comments
 */
export async function getComments(): Promise<Comment[]> {
  const data = await apiGet<unknown[]>("/comments");
  return data.flatMap((item) => {
    const result = commentSchema.safeParse(item);
    return result.success ? [result.data] : [];
  });
}

/**
 * Creates a new comment
 * @param body The comment data
 * @returns A promise resolving to the created comment
 */
export async function createComment(
  body: Omit<Comment, "id">,
): Promise<Comment> {
  const data = await apiPost<unknown>("/comments", body);
  return commentSchema.parse(data);
}

/**
 * Deletes a comment
 * @param id The ID of the comment to delete
 * @returns A promise resolving when the comment is deleted
 */
export async function deleteComment(id: number): Promise<void> {
  await apiDelete(`/comments/${id}`);
}
