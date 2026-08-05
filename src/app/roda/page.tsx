import { sql } from "drizzle-orm";
import { db } from "@/db";
import { recipes, referenceBox } from "@/db/schema";
import RodaClient from "./RodaClient";

export const dynamic = "force-dynamic";

async function getAvailableThemes(): Promise<string[]> {
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

export default async function RodaPage() {
  const themes = await getAvailableThemes();
  return <RodaClient availableThemes={themes} />;
}
