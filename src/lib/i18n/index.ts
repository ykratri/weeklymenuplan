import type { Dictionary } from "./dictionary";
import { en } from "./en";
import { id } from "./id";
import type { Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { getLocale } from "./locale";
export { setLocale } from "./actions";
export type { Locale } from "./types";
export type { Dictionary } from "./dictionary";
