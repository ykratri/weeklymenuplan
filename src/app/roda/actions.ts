"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { recipes, referenceBox, type ReferenceItem } from "@/db/schema";

export async function spinTheme(
  theme: string,
): Promise<{ item: ReferenceItem | null }> {
  const normalized = theme.trim().toLowerCase();
  if (!normalized) return { item: null };

  const candidates = await db
    .select()
    .from(referenceBox)
    .where(sql`EXISTS (
      SELECT 1 FROM unnest(${referenceBox.tags}) t WHERE lower(t) = ${normalized}
    )`);

  if (candidates.length === 0) return { item: null };

  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  return { item: picked };
}

export async function moveToRak(
  id: number,
): Promise<{ ok: boolean }> {
  const [item] = await db
    .select()
    .from(referenceBox)
    .where(eq(referenceBox.id, id));

  if (!item) return { ok: false };

  await db.transaction(async (tx) => {
    await tx.insert(recipes).values({
      name: item.name,
      ingredients: item.ingredients,
      sourceLink: item.sourceLink,
      tags: item.tags,
    });
    await tx.delete(referenceBox).where(eq(referenceBox.id, id));
  });

  revalidatePath("/rak");
  revalidatePath("/referensi");
  revalidatePath("/roda");
  return { ok: true };
}
