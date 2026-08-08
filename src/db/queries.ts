import { sql } from "drizzle-orm";
import { db } from "./index";
import { recipes, referenceBox } from "./schema";
import { PREDEFINED_TAGS } from "@/lib/tags";

export async function getAllDistinctTags(): Promise<string[]> {
  const result = await db.execute<{ tag: string }>(sql`
    SELECT DISTINCT tag FROM (
      SELECT unnest(${recipes.tags}) AS tag FROM ${recipes}
      UNION
      SELECT unnest(${referenceBox.tags}) AS tag FROM ${referenceBox}
    ) all_tags
    ORDER BY tag
  `);
  return result.rows.map((row) => row.tag);
}

// Tags that already exist in the data but aren't part of the predefined set —
// shown as extra pickable chips so people reuse them instead of retyping
// (and re-typo-ing) a near-duplicate.
export async function getExtraThemes(): Promise<string[]> {
  const all = await getAllDistinctTags();
  const predefinedLower = new Set(
    PREDEFINED_TAGS.map((t) => t.value.toLowerCase()),
  );
  return all.filter((tag) => !predefinedLower.has(tag.toLowerCase()));
}
