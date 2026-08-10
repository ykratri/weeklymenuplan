import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { referenceBox } from "@/db/schema";
import { IconBookmark } from "@/components/icons";
import { getDictionary, getLocale } from "@/lib/i18n";
import { requireUser } from "@/lib/supabase/auth";
import BackLink from "@/components/BackLink";
import ReferensiListClient from "./ReferensiListClient";
import { deleteReferenceItem } from "./actions";

export const dynamic = "force-dynamic";

export default async function ReferensiPage() {
  const user = await requireUser();
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.reference;
  const items = await db
    .select()
    .from(referenceBox)
    .where(eq(referenceBox.userId, user.id))
    .orderBy(desc(referenceBox.createdAt));

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <BackLink label={dict.common.backToHome} />
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

      <ReferensiListClient
        items={items}
        dict={dict}
        locale={locale}
        deleteReferenceItem={deleteReferenceItem}
      />
    </main>
  );
}
