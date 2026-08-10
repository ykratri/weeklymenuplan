"use client";

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
        className="shrink-0 rounded-full px-2 py-1 text-lg text-stone-400 active:text-red-600"
      >
        🗑️
      </button>
    </form>
  );
}
