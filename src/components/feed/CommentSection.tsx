import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { commentsAtom } from "../../atoms/comments";
import { currentUserAtom } from "../../atoms/auth";
import { createComment } from "../../api/comments";
import { Avatar } from "../shared/Avatar";

interface CommentSectionProps {
  postId: number;
}

/**
 * A component for displaying and adding comments to a specific post.
 * @param postId The ID of the post for which to display comments 
 * @returns 
 */
export function CommentSection({ postId }: CommentSectionProps) {
  const allComments = useAtomValue(commentsAtom);
  const setComments = useSetAtom(commentsAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const postComments = allComments.filter((c) => c.postId === postId);

  const handleAdd = async () => {
    if (!text.trim() || !currentUser) return;
    setSubmitting(true);
    try {
      const newComment = await createComment({
        postId,
        name: currentUser.name,
        email: currentUser.email,
        body: text,
      });
      setComments((prev) => [...prev, newComment]);
      setText("");
    } catch {
      alert("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium text-neutral-500 hover:text-neutral-700"
      >
        {postComments.length} comments {expanded ? "▲" : "▼"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 rounded-2xl bg-neutral-50 p-3">
          {postComments.map((c) => (
            <div key={c.id} className="flex gap-2 rounded-xl bg-white p-3 justify-between items-start">
              <div className="flex gap-2 flex-1 min-w-0">
                <Avatar name={c.name} size="sm" />
                <div className="min-w-0">
                  <span className="text-sm font-semibold">{c.name}</span>
                  <p className="text-sm text-neutral-600">{c.body}</p>
                </div>
              </div>         
            </div>
          ))}
          

          {postComments.length === 0 && (
            <p className="text-sm text-neutral-400">No comments yet</p>
          )}

          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
              placeholder="Add a comment..."
              className="flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300"
            />
            <button
              onClick={handleAdd}
              disabled={submitting || !text.trim()}
              className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
