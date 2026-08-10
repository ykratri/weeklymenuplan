"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { parseLines, parseTags } from "@/lib/parse";
import { requireUser } from "@/lib/supabase/auth";

export async function addRecipe(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Nama resep wajib diisi");
  }

  await db.insert(recipes).values({
    userId: user.id,
    name,
    ingredients: parseLines(formData.get("ingredients")),
    sourceLink: String(formData.get("sourceLink") ?? "").trim() || null,
    tags: parseTags(formData.get("tags")),
  });

  revalidatePath("/rak");
  redirect("/rak");
}

export async function deleteRecipe(formData: FormData) {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  if (!id) return;
  await db
    .delete(recipes)
    .where(and(eq(recipes.id, id), eq(recipes.userId, user.id)));
  revalidatePath("/rak");
  revalidatePath("/daftar-belanja");
}

export async function updateRecipe(formData: FormData) {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) {
    throw new Error("Nama resep wajib diisi");
  }

  await db
    .update(recipes)
    .set({
      name,
      ingredients: parseLines(formData.get("ingredients")),
      sourceLink: String(formData.get("sourceLink") ?? "").trim() || null,
      tags: parseTags(formData.get("tags")),
    })
    .where(and(eq(recipes.id, id), eq(recipes.userId, user.id)));

  revalidatePath("/rak");
  revalidatePath("/daftar-belanja");
  redirect("/rak");
}
