import Link from "next/link";

const menu = [
  {
    href: "/rak",
    icon: "📚",
    title: "Rak Resep",
    desc: "Lihat & tambah resep yang sudah terbukti cocok",
  },
  {
    href: "/roda",
    icon: "🎡",
    title: "Roda Putar Tematik",
    desc: "Cari ide resep baru sesuai tema",
  },
  {
    href: "/rencana",
    icon: "🛒",
    title: "Rencana Mingguan",
    desc: "Pilih resep minggu ini & buat daftar belanja",
  },
  {
    href: "/referensi",
    icon: "🗂️",
    title: "Kotak Referensi",
    desc: "Simpan ide resep dari TikTok/YouTube/artikel untuk roda putar",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-800">🍲 Rak Resep</h1>
        <p className="mt-1 text-sm text-stone-500">
          Rak permanen untuk resep andalanmu
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 rounded-2xl border border-orange-200 bg-white p-4 shadow-sm active:bg-orange-50"
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="flex flex-col">
              <span className="text-lg font-semibold text-stone-800">
                {item.title}
              </span>
              <span className="text-sm text-stone-500">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
