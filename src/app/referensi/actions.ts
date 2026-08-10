"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { referenceBox } from "@/db/schema";
import { parseLines, parseTags } from "@/lib/parse";
import { requireUser } from "@/lib/supabase/auth";

export async function addReferenceItem(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Nama resep wajib diisi");
  }

  await db.insert(referenceBox).values({
    userId: user.id,
    name,
    ingredients: parseLines(formData.get("ingredients")),
    sourceLink: String(formData.get("sourceLink") ?? "").trim() || null,
    tags: parseTags(formData.get("tags")),
  });

  revalidatePath("/referensi");
  revalidatePath("/cari-ide");
  redirect("/referensi");
}

export async function deleteReferenceItem(formData: FormData) {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  if (!id) return;
  await db
    .delete(referenceBox)
    .where(and(eq(referenceBox.id, id), eq(referenceBox.userId, user.id)));
  revalidatePath("/referensi");
  revalidatePath("/cari-ide");
}

export async function updateReferenceItem(formData: FormData) {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) {
    throw new Error("Nama resep wajib diisi");
  }

  await db
    .update(referenceBox)
    .set({
      name,
      ingredients: parseLines(formData.get("ingredients")),
      sourceLink: String(formData.get("sourceLink") ?? "").trim() || null,
      tags: parseTags(formData.get("tags")),
    })
    .where(and(eq(referenceBox.id, id), eq(referenceBox.userId, user.id)));

  revalidatePath("/referensi");
  revalidatePath("/cari-ide");
  redirect("/referensi");
}
