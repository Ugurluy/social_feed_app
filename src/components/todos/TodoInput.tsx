import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { todosAtom } from "../../atoms/todos";
import { currentUserAtom } from "../../atoms/auth";
import { createTodo } from "../../api/todos";

export function TodoInput() {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const setTodos = useSetAtom(todosAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !currentUser) return;
    setSubmitting(true);
    try {
      const todo = await createTodo({
        title: title.trim(),
        completed: false,
        userId: currentUser.id,
      });
      setTodos((prev) => [todo, ...prev]);
      setTitle("");
    } catch {
      alert("Failed to add todo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a todo..."
        className="min-w-0 flex-1 rounded-lg border border-neutral-200 px-2 py-1.5 text-sm outline-none focus:border-sky-300"
      />
      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="shrink-0 rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
