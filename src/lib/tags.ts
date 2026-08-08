import type { Locale } from "./i18n/types";

// `value` is what actually gets stored/filtered on — stable across locales so
// switching the UI language never fragments a theme into two separate tags.
export const PREDEFINED_TAGS: { value: string; en: string; id: string }[] = [
  { value: "ayam", en: "Chicken", id: "Ayam" },
  { value: "ikan", en: "Fish", id: "Ikan" },
  { value: "daging sapi", en: "Beef", id: "Daging Sapi" },
  { value: "food-prep", en: "Food-prep", id: "Food-prep" },
  { value: "breakfast", en: "Breakfast", id: "Sarapan" },
  { value: "snack", en: "Snack", id: "Camilan" },
  { value: "flour", en: "Flour", id: "Tepung" },
  { value: "veggie", en: "Veggie", id: "Sayur" },
];

const labelByValue = new Map(
  PREDEFINED_TAGS.map((tag) => [tag.value.toLowerCase(), tag]),
);

// Translates a stored tag value for display if it's one of the predefined
// tags; any custom/free-typed tag is shown exactly as stored.
export function translateTag(value: string, locale: Locale): string {
  const known = labelByValue.get(value.toLowerCase());
  return known ? known[locale] : value;
}
