"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { recipes, referenceBox, type ReferenceItem } from "@/db/schema";

export async function getThemeItems(theme: string): Promise<ReferenceItem[]> {
  const normalized = theme.trim().toLowerCase();
  if (!normalized) return [];

  return db
    .select()
    .from(referenceBox)
    .where(sql`EXISTS (
      SELECT 1 FROM unnest(${referenceBox.tags}) t WHERE lower(t) = ${normalized}
    )`)
    .orderBy(sql`random()`);
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
  revalidatePath("/cari-ide");
  return { ok: true };
}
