import { getAllDistinctTags } from "@/db/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { translateTag } from "@/lib/tags";
import CariIdeClient from "./CariIdeClient";

export const dynamic = "force-dynamic";

export default async function CariIdePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const themes = await getAllDistinctTags();
  const themeOptions = themes.map((value) => ({
    value,
    label: translateTag(value, locale),
  }));

  return (
    <CariIdeClient
      availableThemes={themeOptions}
      t={dict.discover}
      common={dict.common}
      locale={locale}
    />
  );
}
