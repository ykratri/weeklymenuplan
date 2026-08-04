import Link from "next/link";
import { addRecipe } from "../actions";

export default function TambahResepPage() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <div className="flex items-center gap-2">
        <Link href="/rak" className="text-xl text-stone-500" aria-label="Kembali">
          ←
        </Link>
        <h1 className="text-xl font-bold text-stone-800">Tambah Resep</h1>
      </div>

      <form action={addRecipe} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            Nama resep
          </span>
          <input
            type="text"
            name="name"
            required
            placeholder="Misal: Ayam Kecap"
            className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-orange-500"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            Bahan-bahan
          </span>
          <span className="text-xs text-stone-500">
            Satu bahan per baris, tanpa takaran
          </span>
          <textarea
            name="ingredients"
            rows={5}
            placeholder={"Ayam\nKecap manis\nBawang putih"}
            className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-orange-500"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            Tag tema
          </span>
          <span className="text-xs text-stone-500">
            Pisahkan dengan koma, misal: ayam, cepat, food-prep friendly
          </span>
          <input
            type="text"
            name="tags"
            placeholder="ayam, cepat"
            className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-orange-500"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            Link referensi <span className="font-normal text-stone-400">(opsional)</span>
          </span>
          <input
            type="url"
            name="sourceLink"
            placeholder="https://tiktok.com/..."
            className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-orange-500"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-xl bg-orange-600 py-3.5 text-base font-semibold text-white shadow-sm active:bg-orange-700"
        >
          Simpan ke Rak
        </button>
      </form>
    </main>
  );
}
