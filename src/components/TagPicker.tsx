"use client";

import { useState } from "react";

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-sm font-medium ${
        active
          ? "border-moss-600 bg-moss-600 text-white"
          : "border-moss-200 bg-white text-stone-700"
      }`}
    >
      {label}
    </button>
  );
}

export default function TagPicker({
  name,
  predefined,
  extra = [],
  defaultSelected = [],
  addPlaceholder,
  addButtonLabel,
}: {
  name: string;
  predefined: { value: string; label: string }[];
  extra?: string[];
  defaultSelected?: string[];
  addPlaceholder: string;
  addButtonLabel: string;
}) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  const knownValues = [...predefined.map((t) => t.value), ...extra];

  function toggle(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    );
  }

  function addCustom() {
    const value = customInput.trim();
    if (!value) return;
    setSelected((prev) => (prev.includes(value) ? prev : [...prev, value]));
    if (!knownValues.includes(value)) {
      setCustomTags((prev) => (prev.includes(value) ? prev : [...prev, value]));
    }
    setCustomInput("");
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap gap-2">
        {predefined.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            active={selected.includes(value)}
            onClick={() => toggle(value)}
          />
        ))}
        {extra.map((value) => (
          <Chip
            key={value}
            label={value}
            active={selected.includes(value)}
            onClick={() => toggle(value)}
          />
        ))}
        {customTags.map((value) => (
          <Chip
            key={value}
            label={value}
            active={selected.includes(value)}
            onClick={() => toggle(value)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder={addPlaceholder}
          className="flex-1 rounded-xl border border-moss-200 bg-white px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-moss-500"
        />
        <button
          type="button"
          onClick={addCustom}
          className="rounded-xl border border-moss-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-moss-700"
        >
          {addButtonLabel}
        </button>
      </div>

      <input type="hidden" name={name} value={selected.join(",")} />
    </div>
  );
}
