import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Rak Resep utama — resep yang sudah terverifikasi cocok.
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ingredients: text("ingredients").array().notNull().default([]),
  sourceLink: text("source_link"),
  tags: text("tags").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Kotak Referensi — bank resep cadangan untuk Roda Putar Tematik, diisi manual.
export const referenceBox = pgTable("reference_box", {
  id: serial("id").primaryKey(),
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
