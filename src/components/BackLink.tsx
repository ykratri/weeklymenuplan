import Link from "next/link";

export default function BackLink({ label }: { label: string }) {
  return (
    <Link href="/" className="text-sm font-semibold text-moss-700 underline">
      {label}
    </Link>
  );
}
