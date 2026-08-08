# 🍲 Dapur Mingguan

Aplikasi rencana menu mingguan untuk ibu rumah tangga yang memasak setiap
hari. Resep tersimpan, belanja tanpa mikir — "rak" permanen untuk resep yang
sudah terbukti cocok, plus cara cepat menemukan ide baru saat rak terasa
itu-itu saja.

## Fitur (MVP)

1. **Daftar Belanja** — pilih beberapa resep dari Rak, sistem menggabungkan
   semua nama bahan (dedupe, tanpa takaran) jadi satu daftar belanja yang
   bisa disalin sebagai teks. Ini fitur utama aplikasi.
2. **Rak Resep** — tambah/lihat/hapus resep (nama, bahan, tag tema, link
   referensi opsional).
3. **Cari Ide Resep** — pilih tema, lalu geser kartu (swipe, ala dating app)
   ide resep dari **Kotak Referensi** (diisi manual oleh pengguna, biasanya
   dari link TikTok/YouTube/artikel) yang cocok dengan tema tsb. Geser
   kanan/tekan ➕ untuk simpan — resep pindah (dihapus dari Kotak Referensi)
   ke Rak Resep. Geser kiri/tekan ✕ untuk lewati.
4. **Kotak Referensi** — halaman terpisah untuk mengisi bank ide resep
   cadangan, dengan field link sumber yang ditonjolkan.

Yang sengaja tidak ada di versi ini: kalkulasi takaran/porsi, scraping
otomatis dari media sosial, login multi-user, rekomendasi AI, kalender 7
hari.

## Struktur data

```
recipes (Rak Resep)        reference_box (Kotak Referensi)
├── id                     ├── id
├── name                   ├── name
├── ingredients: text[]    ├── ingredients: text[]
├── source_link?           ├── source_link?
├── tags: text[]           ├── tags: text[]
└── created_at             └── created_at
```

Kedua tabel punya bentuk yang sama — bedanya cuma tabel tempat data itu
hidup. "Pindah ke Rak" dari Cari Ide Resep = insert ke `recipes` + delete
dari `reference_box` dalam satu transaksi.

## Tumpukan teknis

- **Next.js 16 (App Router)** + Server Actions untuk semua mutasi (tanpa
  REST API terpisah).
- **Tailwind CSS v4**, mobile-first (max-width 28rem / `max-w-md`, tombol
  besar, bottom nav 4 menu).
- **Vercel Postgres (Neon)** via `drizzle-orm` + driver `pg`. Dipilih karena:
  - Native terintegrasi ke Vercel (tinggal klik "Add" dari dashboard project,
    tanpa perlu akun pihak ketiga terpisah).
  - Gratis di tier hobi, cukup untuk single-user.
  - Data relasional (resep–bahan–tag) lebih pas di Postgres dibanding
    key-value store (Vercel KV), terutama untuk query "cari resep referensi
    dengan tag X".
  - Persisten selama deploy, tidak seperti filesystem lokal di Vercel yang
    ephemeral.
- Tanpa autentikasi (single-user, sesuai scope MVP).

## Menjalankan secara lokal

1. Siapkan Postgres (lokal atau cloud), lalu buat file `.env.local`:

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/rakresep
   ```

2. Install dependency & jalankan migrasi:

   ```bash
   npm install
   npm run db:migrate
   ```

3. Jalankan dev server:

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000).

### Script database

- `npm run db:generate` — buat file migrasi baru dari perubahan `src/db/schema.ts`.
- `npm run db:migrate` — jalankan migrasi yang belum diterapkan.
- `npm run db:studio` — buka Drizzle Studio (GUI browser) untuk lihat isi data.

## Deploy ke Vercel

1. **Push repo ini ke GitHub** (jika belum), lalu buka
   [vercel.com/new](https://vercel.com/new) dan import repo tsb.
2. **Tambahkan database.** Di halaman project Vercel → tab **Storage** →
   **Create Database** → pilih **Neon (Postgres)** → ikuti wizard (pilih
   region terdekat, mis. Singapore) → **Connect** ke project ini. Vercel akan
   otomatis mengisi environment variable `DATABASE_URL` (atau
   `POSTGRES_URL`, sesuaikan nama env var di Project Settings → Environment
   Variables jika berbeda dari `DATABASE_URL` yang dipakai kode ini — cukup
   tambahkan `DATABASE_URL` yang menunjuk ke connection string yang sama).
3. **Deploy.** Klik **Deploy** — build pertama akan sukses walau tabel belum
   ada (halaman yang butuh DB baru dipanggil saat request, bukan saat build).
4. **Jalankan migrasi ke database production**, dari komputer lokal:

   ```bash
   # Ambil DATABASE_URL production dari Vercel dashboard → Storage → .env.local tab,
   # lalu jalankan:
   DATABASE_URL="<connection-string-production>" npm run db:migrate
   ```

   Atau install Vercel CLI dan tarik env var otomatis:

   ```bash
   npx vercel link
   npx vercel env pull .env.production.local
   DATABASE_URL=$(grep DATABASE_URL .env.production.local | cut -d '=' -f2-) npm run db:migrate
   ```

5. Buka domain `*.vercel.app` yang diberikan — aplikasi siap dipakai dari HP.

Setiap kali skema (`src/db/schema.ts`) berubah di masa depan: jalankan
`npm run db:generate` lokal, commit file migrasi baru, lalu ulangi langkah 4
(`db:migrate` dengan `DATABASE_URL` production) setelah deploy.
