import Link from "next/link";
import { IconBasket, IconBook, IconBookmark, IconWheel } from "@/components/icons";
import { getDictionary, getLocale } from "@/lib/i18n";
import BackLink from "@/components/BackLink";

const icons = [IconBook, IconBookmark, IconWheel, IconBasket];

export default async function GuidePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.guide;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-5 px-4 py-6">
      <div>
        <BackLink label={dict.common.backToHome} />
        <h1 className="mt-2 text-2xl font-bold text-stone-800">{t.title}</h1>
        <p className="mt-1 text-sm text-stone-500">{t.subtitle}</p>
      </div>

      <div className="flex flex-col gap-3">
        {t.steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <div
              key={step.title}
              className="rounded-2xl border border-moss-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Icon className="h-10 w-10 shrink-0" />
                <div>
                  <h2 className="font-bold text-stone-800">{step.title}</h2>
                  <p className="mt-1 text-sm text-stone-600">{step.desc}</p>
                  <Link
                    href={step.href}
                    className="mt-2 inline-block text-sm font-semibold text-moss-700 underline"
                  >
                    {step.linkLabel} →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-4 text-center text-sm text-stone-500">
        {t.footer}
      </div>
    </main>
  );
}
