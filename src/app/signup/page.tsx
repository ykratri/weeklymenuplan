import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { signUp } from "./actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.auth;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-800">{dict.home.appName}</h1>
        <p className="mt-1 text-sm text-stone-500">{dict.home.tagline}</p>
        <h2 className="mt-5 text-xl font-bold text-stone-800">{t.signupTitle}</h2>
        <p className="mt-1 text-sm text-stone-500">{t.signupSubtitle}</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700">
          {error}
        </div>
      )}

      <form action={signUp} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            {t.emailLabel}
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-stone-700">
            {t.passwordLabel}
          </span>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-xl bg-moss-600 py-3.5 text-base font-semibold text-white shadow-sm active:bg-moss-700"
        >
          {t.signUpButton}
        </button>
      </form>

      <p className="text-center text-sm text-stone-500">
        {t.haveAccountPrefix}
        <Link href="/login" className="font-semibold text-moss-700 underline">
          {t.signInLink}
        </Link>
      </p>
    </main>
  );
}
