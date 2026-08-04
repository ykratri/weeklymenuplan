import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  var _pgPool: Pool | undefined;
  var _db: NodePgDatabase<typeof schema> | undefined;
}

function getDb(): NodePgDatabase<typeof schema> {
  if (!global._db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL belum diset. Lihat README untuk setup.");
    }
    if (!global._pgPool) {
      global._pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes("sslmode=disable")
          ? false
          : { rejectUnauthorized: false },
      });
    }
    global._db = drizzle(global._pgPool, { schema });
  }
  return global._db;
}

// Lazy proxy so importing this module never touches DATABASE_URL until a
// query actually runs — Next.js evaluates server action modules at build
// time just to collect references, even for pages that render statically.
export const db: NodePgDatabase<typeof schema> = new Proxy(
  {} as NodePgDatabase<typeof schema>,
  {
    get(_target, prop, receiver) {
      return Reflect.get(getDb(), prop, receiver);
    },
  },
);
