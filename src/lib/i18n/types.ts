export type Locale = "en" | "id";

export const LOCALE_COOKIE = "locale";

export const LOCALES: Locale[] = ["en", "id"];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "id";
}
