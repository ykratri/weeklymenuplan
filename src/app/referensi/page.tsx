import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { referenceBox } from "@/db/schema";
import { IconBookmark } from "@/components/icons";
import { getDictionary, getLocale } from "@/lib/i18n";
import { format } from "@/lib/i18n/format";
import { translateTag } from "@/lib/tags";
import { deleteReferenceItem } from "./actions";

export const dynamic = "force-dynamic";

export default async function ReferensiPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.reference;
  const items = await db
    .select()
    .from(referenceBox)
    .orderBy(desc(referenceBox.createdAt));

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-stone-800">
          <IconBookmark className="h-8 w-8" /> {t.title}
        </h1>
        <Link
          href="/referensi/tambah"
          className="rounded-full bg-moss-600 px-4 py-2 text-sm font-semibold text-white shadow-sm active:bg-moss-700"
        >
          {t.addButton}
        </Link>
      </div>
      <p className="text-sm text-stone-500">{t.desc}</p>

      {items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-6 text-center text-sm text-stone-500">
          {t.empty}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-moss-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-stone-800">
                {item.name}
              </h2>
              <form action={deleteReferenceItem}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  aria-label={format(dict.common.deleteAria, { name: item.name })}
                  className="shrink-0 rounded-full px-2 py-1 text-lg text-stone-400 active:text-red-600"
                >
                  🗑️
                </button>
              </form>
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
    </main>
  );
}
