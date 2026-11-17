import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { referenceBox } from "@/db/schema";
import { DEFAULT_REFERENCE_ITEMS } from "@/db/seedData";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      await seedDefaultReferenceItems(data.user.id);
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Confirmation%20link%20invalid%20or%20expired`);
}

// Gives every brand-new account a non-empty Kotak Referensi to start from.
// Only runs once per account — skipped if this user already has items
// (e.g. the confirmation link was opened more than once).
async function seedDefaultReferenceItems(userId: string) {
  const [existing] = await db
    .select({ id: referenceBox.id })
    .from(referenceBox)
    .where(eq(referenceBox.userId, userId))
    .limit(1);
  if (existing) return;

  await db.insert(referenceBox).values(
    DEFAULT_REFERENCE_ITEMS.map((item) => ({
      userId,
      name: item.name,
      ingredients: item.ingredients,
      tags: item.tags,
    })),
  );
}
