import { LeftSidebar } from "./LeftSidebar";
import { PostComposer } from "../feed/PostComposer";
import { SearchInput } from "../feed/SearchInput";
import { PostFeed } from "../feed/PostFeed";

export function FeedLayout() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <div className="mx-auto grid min-h-screen max-w-5xl grid-cols-12 gap-6 px-4 py-6">
        <LeftSidebar />
        <main className="col-span-12 lg:col-span-9">
          <PostComposer />
          <SearchInput />
          <PostFeed />
        </main>
      </div>
    </div>
  );
}
