import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getDictionary, getLocale } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weekly Kitchen",
  description: "Recipes saved, shopping made easy",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LocaleSwitcher locale={locale} />
        <div className="flex-1 pb-24">{children}</div>
        <BottomNav nav={dict.nav} />
      </body>
    </html>
  );
}
