import { BrowserRouter, useLocation } from "react-router";
import { Provider, useAtomValue } from "jotai";
import { useApiData } from "./hooks/useApiData";
import { currentUserAtom } from "./atoms/auth";
import { FeedLayout } from "./components/layout/FeedLayout";
import { UserSelectionPage } from "./pages/UserSelectionPage";

function AppContent() {
  const { loading, error } = useApiData();
  const currentUser = useAtomValue(currentUserAtom);
  const { pathname } = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
          <p className="text-neutral-500">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-800">Failed to load</p>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (pathname === "/feed" && currentUser) {
    return <FeedLayout />;
  }

  return <UserSelectionPage />;
}

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
