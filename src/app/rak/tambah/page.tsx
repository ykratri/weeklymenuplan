import Link from "next/link";
import { getExtraThemes } from "@/db/queries";
import { PREDEFINED_TAGS } from "@/lib/tags";
import { getDictionary, getLocale } from "@/lib/i18n";
import TagPicker from "@/components/TagPicker";
import { addRecipe } from "../actions";

export const dynamic = "force-dynamic";

export default async function TambahResepPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.shelfAdd;
  const extraThemes = await getExtraThemes();
  const predefined = PREDEFINED_TAGS.map((tag) => ({
    value: tag.value,
    label: tag[locale],
  }));

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <div className="flex items-center gap-2">
        <Link href="/rak" className="text-xl text-stone-500" aria-label={dict.common.back}>
          ←
        </Link>
        <h1 className="text-xl font-bold text-stone-800">{t.title}</h1>
      </div>

      <form action={addRecipe} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            {t.nameLabel}
          </span>
          <input
            type="text"
            name="name"
            required
            placeholder={t.namePlaceholder}
            className="rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            {t.ingredientsLabel}
          </span>
          <span className="text-xs text-stone-500">{t.ingredientsHelp}</span>
          <textarea
            name="ingredients"
            rows={5}
            placeholder={t.ingredientsPlaceholder}
            className="rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            {dict.common.tagsLabel}
          </span>
          <span className="text-xs text-stone-500">{dict.common.tagsHelp}</span>
          <TagPicker
            name="tags"
            predefined={predefined}
            extra={extraThemes}
            addPlaceholder={dict.common.addManualPlaceholder}
            addButtonLabel={dict.common.addManualButton}
          />
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            {t.sourceLabel}
          </span>
          <input
            type="url"
            name="sourceLink"
            placeholder={t.sourcePlaceholder}
            className="rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-xl bg-moss-600 py-3.5 text-base font-semibold text-white shadow-sm active:bg-moss-700"
        >
          {t.submit}
        </button>
      </form>
    </main>
  );
}
