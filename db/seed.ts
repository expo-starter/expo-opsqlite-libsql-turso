import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { cardTable } from "./schema";
import { faker } from "@faker-js/faker";

const remoteDb = createClient({
  url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN,
});

export const db = drizzle(remoteDb);

async function seed() {
  const cards = [];

  for (let i = 0; i < 10000; i++) {
    cards.push({
      question: faker.lorem.sentence(),
      answer: faker.lorem.sentence(),
      archived: false,
    });
  }

  try {
    const result = await db.insert(cardTable).values(cards);
    console.log(`Successfully inserted ${result.rowsAffected} cards.`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed().catch(console.error);
