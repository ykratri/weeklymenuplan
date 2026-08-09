import { getAllDistinctTags } from "@/db/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { requireUser } from "@/lib/supabase/auth";
import { translateTag } from "@/lib/tags";
import CariIdeClient from "./CariIdeClient";

export const dynamic = "force-dynamic";

export default async function CariIdePage() {
  const user = await requireUser();
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const themes = await getAllDistinctTags(user.id);
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
