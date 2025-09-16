import "@/db/envConfig";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);
const database = drizzle(client, { schema });

if (process.env.MIGRATIONS_ON_STARTUP === "true") {
  await migrate(database, { migrationsFolder: process.env.MIGRATIONS_PATH! });
}

export const db = database;
