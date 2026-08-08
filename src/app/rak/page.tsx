import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { IconBook } from "@/components/icons";
import { deleteRecipe } from "./actions";

export const dynamic = "force-dynamic";

export default async function RakPage() {
  const items = await db.select().from(recipes).orderBy(desc(recipes.createdAt));

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-stone-800">
          <IconBook className="h-8 w-8" /> Rak Resep
        </h1>
        <Link
          href="/rak/tambah"
          className="rounded-full bg-moss-600 px-4 py-2 text-sm font-semibold text-white shadow-sm active:bg-moss-700"
        >
          + Tambah Resep
        </Link>
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-6 text-center text-sm text-stone-500">
          Rak masih kosong. Tambah resep pertamamu, atau coba{" "}
          <Link href="/roda" className="font-semibold text-moss-600">
            Roda Putar Tematik
          </Link>
          .
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map((recipe) => (
          <div
            key={recipe.id}
            className="rounded-2xl border border-moss-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-stone-800">
                {recipe.name}
              </h2>
              <form action={deleteRecipe}>
                <input type="hidden" name="id" value={recipe.id} />
                <button
                  type="submit"
                  aria-label={`Hapus ${recipe.name}`}
                  className="shrink-0 rounded-full px-2 py-1 text-lg text-stone-400 active:text-red-600"
                >
                  🗑️
                </button>
              </form>
            </div>

            {recipe.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-moss-100 px-2.5 py-0.5 text-xs font-medium text-moss-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {recipe.ingredients.length > 0 && (
              <p className="mt-2 text-sm text-stone-600">
                <span className="font-medium">Bahan: </span>
                {recipe.ingredients.join(", ")}
              </p>
            )}

            {recipe.sourceLink && (
              <a
                href={recipe.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-moss-600 underline"
              >
                🔗 Lihat referensi
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
