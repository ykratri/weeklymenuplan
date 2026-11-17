"use client";

import { useMemo, useState } from "react";
import type { Recipe } from "@/db/schema";
import { IconBasket } from "@/components/icons";
import BackLink from "@/components/BackLink";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { format } from "@/lib/i18n/format";

export default function DaftarBelanjaClient({
  recipes,
  t,
  common,
  backToHome,
}: {
  recipes: Recipe[];
  t: Dictionary["shopping"];
  common: Dictionary["common"];
  backToHome: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [bought, setBought] = useState<Set<string>>(new Set());

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(q) ||
        recipe.ingredients.some((i) => i.toLowerCase().includes(q)),
    );
  }, [recipes, query]);

  function toggle(id: number) {
    setCopied(false);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleBought(key: string) {
    setBought((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const shoppingList = useMemo(() => {
    const seen = new Map<string, string>();
    for (const recipe of recipes) {
      if (!selectedIds.has(recipe.id)) continue;
      for (const ingredient of recipe.ingredients) {
        const key = ingredient.trim().toLowerCase();
        if (key && !seen.has(key)) seen.set(key, ingredient.trim());
      }
    }
    return Array.from(seen.entries());
  }, [recipes, selectedIds]);

  const listText = shoppingList.map(([, label]) => `- ${label}`).join("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(listText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <BackLink label={backToHome} />
      <h1 className="flex items-center gap-2 text-xl font-bold text-stone-800">
        <IconBasket className="h-8 w-8" /> {t.title}
      </h1>
      <p className="text-sm text-stone-500">{t.subtitle}</p>

      {selectedIds.size === 0 && (
        <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-4 text-center text-sm text-stone-500">
          {t.pickPrompt}
        </div>
      )}

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
      />

      {filteredRecipes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-4 text-center text-sm text-stone-500">
          {format(common.noSearchResults, { query })}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredRecipes.map((recipe) => {
            const checked = selectedIds.has(recipe.id);
            return (
              <label
                key={recipe.id}
                className={`flex items-center gap-3 rounded-2xl border p-4 shadow-sm ${
                  checked
                    ? "border-moss-500 bg-moss-50"
                    : "border-moss-200 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(recipe.id)}
                  className="h-5 w-5 accent-moss-600"
                />
                <span className="flex-1">
                  <span className="block font-semibold text-stone-800">
                    {recipe.name}
                  </span>
                  {recipe.ingredients.length > 0 && (
                    <span className="block text-xs text-stone-500">
                      {recipe.ingredients.join(", ")}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="rounded-2xl border border-moss-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-800">
              {t.resultTitle}
            </h2>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full bg-moss-600 px-3.5 py-1.5 text-sm font-semibold text-white active:bg-moss-700"
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>

          {shoppingList.length === 0 ? (
            <p className="mt-3 text-sm text-stone-500">{t.noIngredients}</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-1">
              {shoppingList.map(([key, label]) => {
                const isBought = bought.has(key);
                return (
                  <li key={key}>
                    <label className="flex items-center gap-2 py-0.5">
                      <input
                        type="checkbox"
                        checked={isBought}
                        onChange={() => toggleBought(key)}
                        className="h-4 w-4 accent-moss-600"
                      />
                      <span
                        className={`text-sm ${
                          isBought
                            ? "text-stone-400 line-through"
                            : "text-stone-700"
                        }`}
                      >
                        {label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
