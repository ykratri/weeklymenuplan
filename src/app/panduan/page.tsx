import Link from "next/link";
import { IconBasket, IconBook, IconBookmark, IconWheel } from "@/components/icons";

const langkah = [
  {
    Icon: IconBook,
    title: "1. Isi Rak Resep",
    desc: "Tambahkan resep yang sudah pernah kamu coba dan cocok. Cukup isi nama resep, daftar bahan, dan tag tema (misal: ayam, cepat). Link referensi (TikTok/YouTube/artikel) itu opsional.",
    href: "/rak",
    linkLabel: "Buka Rak Resep",
  },
  {
    Icon: IconBookmark,
    title: "2. Isi Kotak Referensi (opsional)",
    desc: "Kalau kamu punya ide resep baru yang belum sempat dicoba (lihat dari TikTok/YouTube), simpan dulu di sini. Ini bank cadangan yang dipakai Cari Ide Resep.",
    href: "/referensi",
    linkLabel: "Buka Kotak Referensi",
  },
  {
    Icon: IconWheel,
    title: "3. Bosan? Cari Ide Resep",
    desc: "Pilih tema masakan, lalu geser kartu ide resep dari Kotak Referensi — geser kanan (atau tekan ➕) untuk simpan ke Rak, geser kiri (atau tekan ✕) untuk lewati.",
    href: "/cari-ide",
    linkLabel: "Buka Cari Ide Resep",
  },
  {
    Icon: IconBasket,
    title: "4. Buat Daftar Belanja",
    desc: "Centang beberapa resep dari Rak yang mau dimasak minggu ini. Daftar belanjanya otomatis dibuat (bahan yang sama digabung), tinggal disalin sebagai teks.",
    href: "/daftar-belanja",
    linkLabel: "Buka Daftar Belanja",
  },
];

export default function PanduanPage() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-4 py-6">
      <div>
        <Link href="/" className="text-sm text-moss-700 underline">
          ← Kembali ke Beranda
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-stone-800">
          Cara Pakai Dapur Mingguan
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          4 langkah sederhana, tidak perlu dihafal — tinggal ikuti urutannya.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {langkah.map(({ Icon, title, desc, href, linkLabel }) => (
          <div
            key={title}
            className="rounded-2xl border border-moss-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Icon className="h-10 w-10 shrink-0" />
              <div>
                <h2 className="font-bold text-stone-800">{title}</h2>
                <p className="mt-1 text-sm text-stone-600">{desc}</p>
                <Link
                  href={href}
                  className="mt-2 inline-block text-sm font-semibold text-moss-700 underline"
                >
                  {linkLabel} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-4 text-center text-sm text-stone-500">
        Aplikasi ini cuma untuk kamu sendiri (tidak perlu login), jadi semua
        resep yang kamu simpan aman tersimpan setiap kali kamu buka lagi.
      </div>
    </main>
  );
}
