"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { parseLines, parseTags } from "@/lib/parse";

export async function addRecipe(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Nama resep wajib diisi");
  }

  await db.insert(recipes).values({
    name,
    ingredients: parseLines(formData.get("ingredients")),
    sourceLink: String(formData.get("sourceLink") ?? "").trim() || null,
    tags: parseTags(formData.get("tags")),
  });

  revalidatePath("/rak");
  redirect("/rak");
}

export async function deleteRecipe(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(recipes).where(eq(recipes.id, id));
  revalidatePath("/rak");
  revalidatePath("/rencana");
}
