"use client";

import { useRef, useState, useTransition, type PointerEvent } from "react";
import Link from "next/link";
import type { ReferenceItem } from "@/db/schema";
import { IconWheel } from "@/components/icons";
import BackLink from "@/components/BackLink";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";
import { format } from "@/lib/i18n/format";
import { translateTag } from "@/lib/tags";
import { getThemeItems, moveToRak } from "./actions";

const SWIPE_THRESHOLD = 90;
const FLY_DISTANCE = 600;

export default function CariIdeClient({
  availableThemes,
  t,
  common,
  locale,
}: {
  availableThemes: { value: string; label: string }[];
  t: Dictionary["discover"];
  common: Dictionary["common"];
  locale: Locale;
}) {
  const [theme, setTheme] = useState("");
  const [queue, setQueue] = useState<ReferenceItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [addedCount, setAddedCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flyingDir, setFlyingDir] = useState<"left" | "right" | null>(null);
  const startXRef = useRef(0);

  function pickTheme(chosenTheme: string) {
    setTheme(chosenTheme);
    setIndex(0);
    setAddedCount(0);
    setDragX(0);
    setQueue(null);
    startTransition(async () => {
      const items = await getThemeItems(chosenTheme);
      setQueue(items);
    });
  }

  function gantiTema() {
    setTheme("");
    setQueue(null);
    setIndex(0);
    setDragX(0);
  }

  const current = queue?.[index];
  const upNext = queue?.[index + 1];

  function commitSwipe(direction: "left" | "right") {
    if (!current || flyingDir) return;
    const item = current;
    setDragging(false);
    setFlyingDir(direction);
    setDragX(direction === "right" ? FLY_DISTANCE : -FLY_DISTANCE);

    setTimeout(() => {
      if (direction === "right") {
        startTransition(async () => {
          const { ok } = await moveToRak(item.id);
          if (ok) setAddedCount((c) => c + 1);
        });
      }
      setIndex((i) => i + 1);
      setDragX(0);
      setFlyingDir(null);
    }, 220);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (flyingDir) return;
    setDragging(true);
    startXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragX(e.clientX - startXRef.current);
  }

  function onPointerUp() {
    if (!dragging) return;
    setDragging(false);
    if (dragX > SWIPE_THRESHOLD) {
      commitSwipe("right");
    } else if (dragX < -SWIPE_THRESHOLD) {
      commitSwipe("left");
    } else {
      setDragX(0);
    }
  }

  const rotation = dragX / 18;
  const likeOpacity = Math.min(Math.max(dragX / SWIPE_THRESHOLD, 0), 1);
  const skipOpacity = Math.min(Math.max(-dragX / SWIPE_THRESHOLD, 0), 1);

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <BackLink label={common.backToHome} />
      <h1 className="flex items-center gap-2 text-xl font-bold text-stone-800">
        <IconWheel className="h-8 w-8" /> {t.title}
      </h1>

      {!theme && (
        <>
          <p className="text-sm text-stone-500">{t.intro}</p>
          <Link
            href="/referensi"
            className="-mt-2 text-sm font-semibold text-moss-700 underline"
          >
            {t.manageReference}
          </Link>

          {availableThemes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {availableThemes.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => pickTheme(value)}
                  className="rounded-full border border-moss-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem(
                "customTheme",
              ) as HTMLInputElement;
              if (input.value.trim()) pickTheme(input.value.trim());
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              name="customTheme"
              placeholder={t.customPlaceholder}
              className="flex-1 rounded-xl border border-moss-200 bg-white px-4 py-3 text-base text-stone-800 outline-none focus:border-moss-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-moss-600 px-5 py-3 text-base font-semibold text-white shadow-sm active:bg-moss-700"
            >
              {t.searchButton}
            </button>
          </form>
        </>
      )}

      {theme && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-500">
            {format(t.themeLabel, { theme: translateTag(theme, locale) })}
          </span>
          <button
            type="button"
            onClick={gantiTema}
            className="text-sm font-semibold text-moss-700 underline"
          >
            {t.changeTheme}
          </button>
        </div>
      )}

      {theme && isPending && queue === null && (
        <p className="text-center text-sm text-stone-500">{t.loading}</p>
      )}

      {theme && queue !== null && queue.length === 0 && (
        <div className="rounded-2xl border border-dashed border-moss-300 bg-white p-6 text-center text-sm text-stone-500">
          {t.emptyPrefix}
          <span className="font-semibold">
            &quot;{translateTag(theme, locale)}&quot;
          </span>
          {t.emptySuffix}
          <div className="mt-3">
            <Link
              href="/referensi/tambah"
              className="inline-block rounded-full bg-moss-600 px-4 py-2 text-sm font-semibold text-white"
            >
              {t.addToReference}
            </Link>
          </div>
        </div>
      )}

      {theme && queue !== null && queue.length > 0 && !current && (
        <div className="rounded-2xl border border-moss-200 bg-white p-6 text-center text-sm text-stone-600">
          {format(t.doneTitle, { theme: translateTag(theme, locale) })}
          {addedCount > 0 && (
            <p className="mt-1 font-semibold text-moss-700">
              {format(t.addedCount, { count: addedCount })}
            </p>
          )}
          <div className="mt-3 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => pickTheme(theme)}
              className="rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
            >
              {t.retryTheme}
            </button>
            <button
              type="button"
              onClick={gantiTema}
              className="rounded-full bg-moss-600 px-4 py-2 text-sm font-semibold text-white"
            >
              {t.pickAnotherTheme}
            </button>
          </div>
        </div>
      )}

      {current && (
        <div className="relative h-[420px] select-none">
          {upNext && (
            <div className="absolute inset-x-3 top-3 h-full rounded-3xl border border-moss-200 bg-white shadow-sm" />
          )}

          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
              transition: dragging ? "none" : "transform 220ms ease",
              touchAction: "pan-y",
            }}
            className="absolute inset-0 flex cursor-grab flex-col rounded-3xl border border-moss-200 bg-white p-5 shadow-md active:cursor-grabbing"
          >
            <span
              className="absolute left-4 top-4 rounded-lg border-2 border-moss-600 px-2 py-1 text-sm font-bold text-moss-600"
              style={{ opacity: likeOpacity }}
            >
              {t.saveBadge}
            </span>
            <span
              className="absolute right-4 top-4 rounded-lg border-2 border-red-500 px-2 py-1 text-sm font-bold text-red-500"
              style={{ opacity: skipOpacity }}
            >
              {t.skipBadge}
            </span>

            <h2 className="mt-8 text-xl font-bold text-stone-800">
              {current.name}
            </h2>

            {current.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-moss-100 px-2.5 py-0.5 text-xs font-medium text-moss-700"
                  >
                    {translateTag(tag, locale)}
                  </span>
                ))}
              </div>
            )}

            {current.ingredients.length > 0 && (
              <p className="mt-3 text-sm text-stone-600">
                <span className="font-medium">{common.ingredientsLabel}</span>
                {current.ingredients.join(", ")}
              </p>
            )}

            {current.sourceLink && (
              <a
                href={current.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-2 inline-block text-sm text-moss-600 underline"
              >
                {common.viewSource}
              </a>
            )}

            <div className="mt-auto flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => commitSwipe("left")}
                aria-label={t.skipAria}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 bg-white text-2xl text-red-500 shadow-sm active:bg-red-50"
              >
                ✕
              </button>
              <button
                type="button"
                onClick={() => commitSwipe("right")}
                aria-label={t.saveAria}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-moss-300 bg-white text-2xl shadow-sm active:bg-moss-50"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
