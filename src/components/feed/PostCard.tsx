import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom } from "../../atoms/auth";
import { postsAtom } from "../../atoms/posts";
import { deletePost } from "../../api/posts";
import { Avatar } from "../shared/Avatar";
import { CommentSection } from "./CommentSection";
import type { PostWithUser } from "../../types/schemas";

interface PostCardProps {
  post: PostWithUser;
}

/**
 * Displays a single post in a card layout.
 * @param post The post to display in the card
 * @returns A React component of a post card
 */
export function PostCard({ post }: PostCardProps) {
  const currentUser = useAtomValue(currentUserAtom);
  const setPosts = useSetAtom(postsAtom);

  const isOwner = currentUser?.id === post.userId;

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch {
      alert("Failed to delete post");
    }
  };

  const displayName = post.user?.name ?? "Unknown User";

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <Avatar name={displayName} avatarUrl={post.user?.avatar} />
        <div className="min-w-0 flex-1">
          <span className="font-bold">{displayName}</span>
          <h3 className="mt-1 font-semibold text-neutral-900">{post.title}</h3>
          <p className="mt-2 text-[15px] leading-7 text-neutral-800">
            {post.body}
          </p>

          {isOwner && (
            <div className="mt-3">
              <button
                onClick={handleDelete}
                className="rounded-full px-2 py-1 text-sm text-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}

          <CommentSection postId={post.id} />
        </div>
      </div>
    </article>
  );
}
