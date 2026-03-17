import { atom } from "jotai";
import type { Comment } from "../types/schemas";

export const commentsAtom = atom<Comment[]>([]);
