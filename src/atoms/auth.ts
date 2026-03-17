import { atom } from "jotai";
import type { User } from "../types/schemas";

export const currentUserAtom = atom<User | null>(null);
