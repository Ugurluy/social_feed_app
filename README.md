# Social Feed App

A React application that consumes the [MyDummyAPI](https://www.mydummyapi.com/) public API to create a social feed with user selection, post creation, comments, todos, and paginated browsing.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for bundling and dev server
- **Jotai** for atomic state management (base atoms + derived atoms for filtering, enrichment, pagination)
- **Tailwind CSS v4** for utility-first styling
- **Zod** for runtime API response validation
- **React Hook Form** + `@hookform/resolvers` for form handling with Zod validation
- **React Router v7** for client-side routing

## Getting Started

### Prerequisites

- Node.js **v22+** (see `.nvmrc`)

### Install & Run

```bash
# If using nvm
nvm use

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Features

| Requirement | Implementation |
|---|---|
| List of results from API | Post feed with user enrichment via derived atoms |
| Search/filter data | Client-side text search across post title, body, and author name |
| Pagination | Page-based navigation with Previous/Next controls |
| POST operations | Create post, add comment, add todo |
| DELETE operations | Delete own posts, delete todos |
| Multiple routes | `/` (user selection) and `/feed` (main feed) |

## API Endpoints Used

| Endpoint | Operations | Usage |
|---|---|---|
| `/users` | GET, GET by ID | User selection page + enriching posts with author data |
| `/posts` | GET, POST, DELETE | Feed list, search, pagination, create and delete posts |
| `/comments` | GET, POST | Show comments per post, add new comments |
| `/todos` | GET, POST, DELETE | Sidebar todo widget with add and delete |

## Architecture Overview

```
src/
  api/          # Fetch client + per-resource CRUD modules
  atoms/        # Jotai atoms: base data + derived views (enriched, filtered, paginated)
  components/   # UI components (layout/, feed/, todos/, shared/)
  hooks/        # Custom hooks (useApiData)
  pages/        # Route-level page components
  types/        # Zod schemas + TypeScript types
```

### Data Flow

1. `useApiData` fetches all resources in parallel via `Promise.all`
2. Missing users (referenced by posts but not in `/users`) are fetched individually via `GET /users/{id}`
3. Raw data is validated with Zod schemas and stored in base Jotai atoms
4. Derived atoms enrich posts with user data, apply search filters, and paginate results
5. Components subscribe only to the specific atoms they need via `useAtomValue` / `useSetAtom`

### Key Design Decisions

- **Fetch all data upfront, derive everything client-side.** The API has no server-side filtering or pagination, so we load all data once in parallel and handle filtering/pagination with derived atoms.
- **`enrichedPostsAtom` as the join layer.** Posts from the API only have a `userId`. This derived atom joins user data onto each post, keeping downstream components simple.
- **Missing user resolution.** After the initial fetch, any `userId` not found in the users list is fetched individually via `GET /users/{id}` to avoid showing "Unknown User."
- **Zod `safeParse` with `flatMap` for GET responses.** Malformed API records are silently filtered out instead of crashing the app. POST responses use strict `parse`.
- **Graceful avatar fallback.** Broken image URLs (dead IPFS gateway) are caught via `onError` and replaced with gradient initials.
