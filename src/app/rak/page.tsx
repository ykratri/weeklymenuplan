import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { IconBook } from "@/components/icons";
import { getDictionary, getLocale } from "@/lib/i18n";
import BackLink from "@/components/BackLink";
import RakListClient from "./RakListClient";
import { deleteRecipe } from "./actions";

export const dynamic = "force-dynamic";

export default async function RakPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.shelf;
  const items = await db.select().from(recipes).orderBy(desc(recipes.createdAt));

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <BackLink label={dict.common.backToHome} />
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-stone-800">
          <IconBook className="h-8 w-8" /> {t.title}
        </h1>
        <Link
          href="/rak/tambah"
          className="rounded-full bg-moss-600 px-4 py-2 text-sm font-semibold text-white shadow-sm active:bg-moss-700"
        >
          {t.addButton}
        </Link>
      </div>

      <RakListClient
        items={items}
        dict={dict}
        locale={locale}
        deleteRecipe={deleteRecipe}
      />
    </main>
  );
}
