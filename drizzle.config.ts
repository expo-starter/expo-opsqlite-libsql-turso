import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
    authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN,
  },
} satisfies Config;
