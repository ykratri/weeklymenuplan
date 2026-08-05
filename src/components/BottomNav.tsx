"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Beranda", icon: "🏠" },
  { href: "/rak", label: "Rak", icon: "📚" },
  { href: "/roda", label: "Roda", icon: "🎡" },
  { href: "/rencana", label: "Rencana", icon: "🛒" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-orange-200 bg-white">
      <ul className="mx-auto flex max-w-md">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-3 text-xs font-medium ${
                  active ? "text-orange-600" : "text-stone-500"
                }`}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
