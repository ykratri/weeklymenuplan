import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rak Resep",
  description: "Rak resep mingguan untuk ibu rumah tangga",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-orange-50">
        <div className="flex-1 pb-24">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
