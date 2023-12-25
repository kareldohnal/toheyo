import { atom } from "jotai";
import { TokenEntity, UserEntity } from "./models/entities.ts";

export const tokenAtom = atom<TokenEntity | null>(null);
export const userAtom = atom<UserEntity | null>(null);
