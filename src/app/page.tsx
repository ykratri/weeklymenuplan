import Link from "next/link";
import { IconBasket, IconBook, IconBookmark, IconWheel } from "@/components/icons";
import { getDictionary, getLocale } from "@/lib/i18n";
import { signOut } from "@/app/signout/actions";

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-800">{t.appName}</h1>
        <p className="mt-1 text-sm text-stone-500">{t.tagline}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="/daftar-belanja"
          className="flex flex-col items-center gap-2 rounded-3xl border border-moss-200 bg-white p-6 text-center shadow-sm active:bg-moss-50"
        >
          <IconBasket className="h-16 w-16" />
          <span className="text-xl font-bold text-stone-800">
            {t.shoppingTitle}
          </span>
          <span className="text-sm text-stone-500">{t.shoppingDesc}</span>
        </Link>

        <Link
          href="/rak"
          className="flex flex-col items-center gap-2 rounded-3xl border border-moss-200 bg-white p-6 text-center shadow-sm active:bg-moss-50"
        >
          <IconBook className="h-16 w-16" />
          <span className="text-xl font-bold text-stone-800">
            {t.shelfTitle}
          </span>
          <span className="text-sm text-stone-500">{t.shelfDesc}</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/cari-ide"
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-moss-200 bg-white p-4 text-center shadow-sm active:bg-moss-50"
        >
          <IconWheel className="h-10 w-10" />
          <span className="text-sm font-semibold text-stone-800">
            {t.discoverTitle}
          </span>
        </Link>

        <Link
          href="/referensi"
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-moss-200 bg-white p-4 text-center shadow-sm active:bg-moss-50"
        >
          <IconBookmark className="h-10 w-10" />
          <span className="text-sm font-semibold text-stone-800">
            {t.referenceTitle}
          </span>
        </Link>
      </div>

      <Link
        href="/guide"
        className="text-center text-sm font-semibold text-moss-700 underline"
      >
        {t.howToUse}
      </Link>

      <form action={signOut} className="text-center">
        <button type="submit" className="text-sm text-stone-400 underline">
          {dict.auth.signOutButton}
        </button>
      </form>
    </main>
  );
}
