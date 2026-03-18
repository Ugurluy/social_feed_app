import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router";
import { usersAtom } from "../atoms/users";
import { currentUserAtom } from "../atoms/auth";
import { currentPageAtom } from "../atoms/posts";
import { Avatar } from "../components/shared/Avatar";
import type { User } from "../types/schemas";

export function UserSelectionPage() {
  const users = useAtomValue(usersAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const setPage = useSetAtom(currentPageAtom);
  const navigate = useNavigate();

  const handleSelect = (user: User) => {
    setCurrentUser(user);
    setPage(1);
    navigate("/feed");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Social Feed
          </h1>
          <p className="mt-2 text-neutral-500">
            Select a user to start browsing
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelect(user)}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
            >
              <Avatar name={user.name} avatarUrl={user.avatar} />
              <div className="mt-3 truncate font-semibold">{user.name}</div>
              <div className="truncate text-sm text-neutral-500">{user.email}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
