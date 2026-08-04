"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { ReferenceItem } from "@/db/schema";
import { spinTheme, moveToRak } from "./actions";

export default function RodaClient({
  availableThemes,
}: {
  availableThemes: string[];
}) {
  const [theme, setTheme] = useState("");
  const [result, setResult] = useState<ReferenceItem | null | undefined>(
    undefined,
  );
  const [moved, setMoved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSpin(chosenTheme: string) {
    setTheme(chosenTheme);
    setMoved(false);
    startTransition(async () => {
      const { item } = await spinTheme(chosenTheme);
      setResult(item);
    });
  }

  function handleAdd(id: number) {
    startTransition(async () => {
      const { ok } = await moveToRak(id);
      if (ok) {
        setMoved(true);
        setResult(undefined);
      }
    });
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800">🎡 Roda Putar Tematik</h1>
      <p className="text-sm text-stone-500">
        Pilih tema, lalu putar untuk dapat ide resep baru dari Kotak
        Referensi.
      </p>

      {availableThemes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableThemes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleSpin(t)}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium ${
                theme === t
                  ? "border-orange-600 bg-orange-600 text-white"
                  : "border-orange-200 bg-white text-stone-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem(
            "customTheme",
          ) as HTMLInputElement;
          if (input.value.trim()) handleSpin(input.value.trim());
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          name="customTheme"
          placeholder="Atau ketik tema baru..."
          className="flex-1 rounded-xl border border-orange-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-orange-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-orange-600 px-5 py-3 text-base font-semibold text-white shadow-sm active:bg-orange-700 disabled:opacity-50"
        >
          Putar
        </button>
      </form>

      {isPending && (
        <p className="text-center text-sm text-stone-500">Memutar roda...</p>
      )}

      {moved && (
        <div className="rounded-2xl border border-green-300 bg-green-50 p-4 text-center text-sm text-green-800">
          ✅ Resep berhasil dipindahkan ke Rak Resep!{" "}
          <Link href="/rak" className="font-semibold underline">
            Lihat Rak
          </Link>
        </div>
      )}

      {!isPending && result === null && (
        <div className="rounded-2xl border border-dashed border-orange-300 bg-white p-6 text-center text-sm text-stone-500">
          Belum ada resep di Kotak Referensi untuk tema{" "}
          <span className="font-semibold">&quot;{theme}&quot;</span>.
          <div className="mt-3">
            <Link
              href="/referensi/tambah"
              className="inline-block rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white"
            >
              + Tambah ke Kotak Referensi
            </Link>
          </div>
        </div>
      )}

      {!isPending && result && (
        <div className="rounded-2xl border border-orange-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-800">
            {result.name}
          </h2>

          {result.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {result.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {result.ingredients.length > 0 && (
            <p className="mt-2 text-sm text-stone-600">
              <span className="font-medium">Bahan: </span>
              {result.ingredients.join(", ")}
            </p>
          )}

          {result.sourceLink && (
            <a
              href={result.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-orange-600 underline"
            >
              🔗 Lihat sumber
            </a>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => handleAdd(result.id)}
              disabled={isPending}
              className="flex-1 rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white shadow-sm active:bg-orange-700 disabled:opacity-50"
            >
              ➕ Tambah ke Rak
            </button>
            <button
              type="button"
              onClick={() => handleSpin(theme)}
              disabled={isPending}
              className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 disabled:opacity-50"
            >
              🎲 Putar lagi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
