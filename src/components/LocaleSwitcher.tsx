"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/lib/i18n/actions";
import type { Locale } from "@/lib/i18n/types";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div className="fixed right-3 top-3 z-20 inline-flex rounded-full border border-moss-300 bg-white p-0.5 text-xs font-bold shadow-sm">
      {(["en", "id"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => change(l)}
          className={`rounded-full px-2.5 py-1 ${
            locale === l ? "bg-moss-600 text-white" : "text-stone-500"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
