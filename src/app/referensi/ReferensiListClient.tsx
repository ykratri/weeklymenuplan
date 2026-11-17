"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ReferenceItem } from "@/db/schema";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";
import { format } from "@/lib/i18n/format";
import { translateTag } from "@/lib/tags";
import { IconEdit } from "@/components/icons";
import DeleteButton from "@/components/DeleteButton";

export default function ReferensiListClient({
  items,
  dict,
  locale,
  deleteReferenceItem,
}: {
  items: ReferenceItem[];
  dict: Dictionary;
  locale: Locale;
  deleteReferenceItem: (formData: FormData) => void;
}) {
  const [query, setQuery] = useState("");
  const t = dict.reference;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.ingredients.some((i) => i.toLowerCase().includes(q)) ||
        item.tags.some(
          (tag) =>
            tag.toLowerCase().includes(q) ||
            translateTag(tag, locale).toLowerCase().includes(q),
        ),
    );
  }, [items, query, locale]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-6 text-center text-sm text-stone-500">
        {t.empty}
      </div>
    );
  }

  return (
    <>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.searchPlaceholder}
        className="rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-6 text-center text-sm text-stone-500">
          {format(dict.common.noSearchResults, { query })}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-moss-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold text-stone-800">
                  {item.name}
                </h2>
                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/referensi/${item.id}/edit`}
                    aria-label={format(dict.common.editAria, { name: item.name })}
                    className="rounded-full p-2 text-moss-600 active:text-moss-800"
                  >
                    <IconEdit className="h-5 w-5" />
                  </Link>
                  <DeleteButton
                    action={deleteReferenceItem}
                    id={item.id}
                    ariaLabel={format(dict.common.deleteAria, { name: item.name })}
                    confirmMessage={format(dict.common.confirmDelete, {
                      name: item.name,
                    })}
                  />
                </div>
              </div>

              {item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-moss-100 px-2.5 py-0.5 text-xs font-medium text-moss-700"
                    >
                      {translateTag(tag, locale)}
                    </span>
                  ))}
                </div>
              )}

              {item.ingredients.length > 0 && (
                <p className="mt-2 text-sm text-stone-600">
                  <span className="font-medium">{dict.common.ingredientsLabel}</span>
                  {item.ingredients.join(", ")}
                </p>
              )}

              {item.sourceLink && (
                <a
                  href={item.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-moss-600 underline"
                >
                  {dict.common.viewSource}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
