import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router";
import { currentUserAtom } from "../../atoms/auth";
import { searchQueryAtom } from "../../atoms/search";
import { todosAtom } from "../../atoms/todos";
import { Avatar } from "../shared/Avatar";
import { TodoInput } from "../todos/TodoInput";
import { TodoList } from "../todos/TodoList";

export function LeftSidebar() {
  const currentUser = useAtomValue(currentUserAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const todos = useAtomValue(todosAtom);
  const navigate = useNavigate();
  const setSearchQuery = useSetAtom(searchQueryAtom);

  const myTodoCount = todos.filter((t) => t.userId === currentUser?.id).length;

  const handleSwitchUser = () => {
    setCurrentUser(null);
    setSearchQuery("");
    navigate("/");
  };

  return (
    <aside className="col-span-12 lg:col-span-3">
      <div className="sticky top-6 space-y-4">
        {currentUser && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar name={currentUser.name} avatarUrl={currentUser.avatar} />
              <div className="min-w-0">
                <div className="truncate font-bold">{currentUser.name}</div>
                <div className="truncate text-sm text-neutral-500">
                  {currentUser.email}
                </div>
              </div>
            </div>
            <button
              onClick={handleSwitchUser}
              className="mt-3 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
            >
              Switch User
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              My Todos
            </span>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-600">
              {myTodoCount}
            </span>
          </div>
          <TodoInput />
          <div className="mt-3">
            <TodoList />
          </div>
        </div>
      </div>
    </aside>
  );
}
