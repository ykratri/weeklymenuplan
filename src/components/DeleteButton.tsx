"use client";

import { IconDelete } from "./icons";

export default function DeleteButton({
  action,
  id,
  ariaLabel,
  confirmMessage,
}: {
  action: (formData: FormData) => void;
  id: number;
  ariaLabel: string;
  confirmMessage: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label={ariaLabel}
        className="shrink-0 rounded-full p-2 text-stone-400 active:text-red-600"
      >
        <IconDelete className="h-5 w-5" />
      </button>
    </form>
  );
}
