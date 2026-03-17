import { atom } from "jotai";
import type { Todo } from "../types/schemas";

export const todosAtom = atom<Todo[]>([]);
