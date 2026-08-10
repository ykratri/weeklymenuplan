"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { recipes, referenceBox, type ReferenceItem } from "@/db/schema";
import { requireUser } from "@/lib/supabase/auth";

export async function getThemeItems(theme: string): Promise<ReferenceItem[]> {
  const user = await requireUser();
  const normalized = theme.trim().toLowerCase();
  if (!normalized) return [];

  return db
    .select()
    .from(referenceBox)
    .where(
      and(
        eq(referenceBox.userId, user.id),
        sql`EXISTS (
          SELECT 1 FROM unnest(${referenceBox.tags}) t WHERE lower(t) = ${normalized}
        )`,
      ),
    )
    .orderBy(sql`random()`);
}

export async function moveToRak(
  id: number,
): Promise<{ ok: boolean }> {
  const user = await requireUser();
  const [item] = await db
    .select()
    .from(referenceBox)
    .where(and(eq(referenceBox.id, id), eq(referenceBox.userId, user.id)));

  if (!item) return { ok: false };

  await db.transaction(async (tx) => {
    await tx.insert(recipes).values({
      userId: user.id,
      name: item.name,
      ingredients: item.ingredients,
      sourceLink: item.sourceLink,
      tags: item.tags,
    });
    await tx
      .delete(referenceBox)
      .where(and(eq(referenceBox.id, id), eq(referenceBox.userId, user.id)));
  });

  revalidatePath("/rak");
  revalidatePath("/referensi");
  revalidatePath("/cari-ide");
  return { ok: true };
}
