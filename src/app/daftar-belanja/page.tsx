import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { IconBasket } from "@/components/icons";
import DaftarBelanjaClient from "./DaftarBelanjaClient";

export const dynamic = "force-dynamic";

export default async function DaftarBelanjaPage() {
  const items = await db.select().from(recipes).orderBy(desc(recipes.createdAt));

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
        <h1 className="flex items-center gap-2 text-xl font-bold text-stone-800">
          <IconBasket className="h-8 w-8" /> Daftar Belanja
        </h1>
        <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-6 text-center text-sm text-stone-500">
          Rak resep masih kosong. Tambah resep dulu sebelum membuat daftar
          belanja.
          <div className="mt-3">
            <Link
              href="/rak/tambah"
              className="inline-block rounded-full bg-moss-600 px-4 py-2 text-sm font-semibold text-white"
            >
              + Tambah Resep
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <DaftarBelanjaClient recipes={items} />;
}
