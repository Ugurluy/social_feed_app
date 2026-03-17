import { atom } from "jotai";
import type { User } from "../types/schemas";

export const usersAtom = atom<User[]>([]);
