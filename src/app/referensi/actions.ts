"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { referenceBox } from "@/db/schema";
import { parseLines, parseTags } from "@/lib/parse";

export async function addReferenceItem(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Nama resep wajib diisi");
  }

  await db.insert(referenceBox).values({
    name,
    ingredients: parseLines(formData.get("ingredients")),
    sourceLink: String(formData.get("sourceLink") ?? "").trim() || null,
    tags: parseTags(formData.get("tags")),
  });

  revalidatePath("/referensi");
  revalidatePath("/roda");
  redirect("/referensi");
}

export async function deleteReferenceItem(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(referenceBox).where(eq(referenceBox.id, id));
  revalidatePath("/referensi");
  revalidatePath("/roda");
}
