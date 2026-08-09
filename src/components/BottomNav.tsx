"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBasket, IconBook, IconHome, IconWheel } from "./icons";
import type { Dictionary } from "@/lib/i18n/dictionary";

const HIDDEN_PATHS = ["/login", "/signup"];

export default function BottomNav({ nav }: { nav: Dictionary["nav"] }) {
  const pathname = usePathname();

  if (HIDDEN_PATHS.some((path) => pathname.startsWith(path))) return null;

  const items = [
    { href: "/", label: nav.home, Icon: IconHome },
    { href: "/daftar-belanja", label: nav.shopping, Icon: IconBasket },
    { href: "/rak", label: nav.shelf, Icon: IconBook },
    { href: "/cari-ide", label: nav.discover, Icon: IconWheel },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-moss-200 bg-white">
      <ul className="mx-auto flex max-w-md">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium ${
                  active ? "text-moss-700" : "text-stone-400"
                }`}
              >
                <span
                  className={`rounded-full p-1 ${active ? "bg-moss-100" : ""}`}
                >
                  <Icon
                    className={`h-7 w-7 ${active ? "" : "opacity-60 grayscale"}`}
                  />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
