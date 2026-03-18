import { useAtomValue, useSetAtom } from "jotai";
import { todosAtom } from "../../atoms/todos";
import { currentUserAtom } from "../../atoms/auth";
import { deleteTodo } from "../../api/todos";

export function TodoList() {
  const todos = useAtomValue(todosAtom);
  const setTodos = useSetAtom(todosAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const myTodos = todos.filter((t) => t.userId === currentUser?.id);

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete todo");
    }
  };

  if (myTodos.length === 0) {
    return <p className="text-sm text-neutral-400">No todos yet</p>;
  }

  return (
    <ul className="space-y-1.5">
      {myTodos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between rounded-lg bg-neutral-50 px-2 py-1.5 text-sm"
        >
          <span className={todo.completed ? "text-neutral-400 line-through" : ""}>
            {todo.title}
          </span>
          <button
            onClick={() => handleDelete(todo.id)}
            className="ml-2 text-xs text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
