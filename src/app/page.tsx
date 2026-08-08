import Link from "next/link";
import { IconBasket, IconBook, IconBookmark, IconWheel } from "@/components/icons";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-800">🍲 Rak Resep</h1>
        <p className="mt-1 text-sm text-stone-500">
          Rak permanen untuk resep andalanmu
        </p>
        <Link
          href="/panduan"
          className="mt-2 inline-block text-sm font-semibold text-moss-700 underline"
        >
          ❓ Cara pakai aplikasi ini
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="/rak"
          className="flex flex-col items-center gap-2 rounded-3xl border border-moss-200 bg-white p-6 text-center shadow-sm active:bg-moss-50"
        >
          <IconBook className="h-16 w-16" />
          <span className="text-xl font-bold text-stone-800">Rak Resep</span>
          <span className="text-sm text-stone-500">
            Lihat & tambah resep yang sudah terbukti cocok
          </span>
        </Link>

        <Link
          href="/rencana"
          className="flex flex-col items-center gap-2 rounded-3xl border border-moss-200 bg-white p-6 text-center shadow-sm active:bg-moss-50"
        >
          <IconBasket className="h-16 w-16" />
          <span className="text-xl font-bold text-stone-800">
            Rencana Mingguan
          </span>
          <span className="text-sm text-stone-500">
            Pilih resep minggu ini & buat daftar belanja
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/roda"
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-moss-200 bg-white p-4 text-center shadow-sm active:bg-moss-50"
        >
          <IconWheel className="h-10 w-10" />
          <span className="text-sm font-semibold text-stone-800">
            Roda Putar Tematik
          </span>
        </Link>

        <Link
          href="/referensi"
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-moss-200 bg-white p-4 text-center shadow-sm active:bg-moss-50"
        >
          <IconBookmark className="h-10 w-10" />
          <span className="text-sm font-semibold text-stone-800">
            Kotak Referensi
          </span>
        </Link>
      </div>
    </main>
  );
}
