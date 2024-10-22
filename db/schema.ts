import { sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const cardTable = table("cards", {
  id: t.integer().primaryKey({ autoIncrement: true }),
  question: t.text().notNull(),
  answer: t.text().notNull(),
  archived: t
    .integer({
      mode: "boolean",
    })
    .default(false),
  createdAt: t.text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const CardSchema = createSelectSchema(cardTable);
export type CardSchemaType = z.infer<typeof CardSchema>;
