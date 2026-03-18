import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom } from "../../atoms/auth";
import { postsAtom } from "../../atoms/posts";
import { createPost } from "../../api/posts";
import { Avatar } from "../shared/Avatar";

const composerSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  body: z.string().min(1, "Post body is required").max(2000),
});

type ComposerForm = z.infer<typeof composerSchema>;

/**
 * @returns A component for composing and submitting new posts.
 */
export function PostComposer() {
  const currentUser = useAtomValue(currentUserAtom);
  const setPosts = useSetAtom(postsAtom);

// Initialize the form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComposerForm>({
    resolver: zodResolver(composerSchema),
  });

  if (!currentUser) return null;

  const onSubmit = async (data: ComposerForm) => {
    try {
      const newPost = await createPost({
        title: data.title,
        body: data.body,
        userId: currentUser.id,
      });
      setPosts((prev) => [newPost, ...prev]);
      reset();
    } catch {
      alert("Failed to create post");
    }
  };

  return (
    <section className="sticky top-6 z-20 mb-6 rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-md backdrop-blur">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
        <Avatar name={currentUser.name} avatarUrl={currentUser.avatar} />
        <div className="min-w-0 flex-1">
          <div className="mb-3 text-lg font-bold tracking-tight">
            What's happening?
          </div>
          <input
            {...register("title")}
            placeholder="Post title..."
            className="mb-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
          />
          {errors.title && (
            <p className="mb-1 text-xs text-red-500">{errors.title.message}</p>
          )}
          <textarea
            {...register("body")}
            placeholder="Write your post..."
            rows={3}
            className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
          />
          {errors.body && (
            <p className="mb-1 text-xs text-red-500">{errors.body.message}</p>
          )}
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
