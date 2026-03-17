import { atom } from "jotai";

export const dataLoadingAtom = atom(true);
export const dataErrorAtom = atom<string | null>(null);
