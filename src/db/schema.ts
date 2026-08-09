import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Rak Resep utama — resep yang sudah terverifikasi cocok. Scoped per akun
// (user_id references Supabase auth.users.id) so everyone has their own shelf.
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(),
  name: text("name").notNull(),
  ingredients: text("ingredients").array().notNull().default([]),
  sourceLink: text("source_link"),
  tags: text("tags").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Kotak Referensi — bank resep cadangan untuk Cari Ide Resep, diisi manual.
export const referenceBox = pgTable("reference_box", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(),
  name: text("name").notNull(),
  ingredients: text("ingredients").array().notNull().default([]),
  sourceLink: text("source_link"),
  tags: text("tags").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;
export type ReferenceItem = typeof referenceBox.$inferSelect;
export type NewReferenceItem = typeof referenceBox.$inferInsert;
