import { createClient } from "@libsql/client";

const localDb = createClient({
  url: "file:assets/local.db",
  syncUrl: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN,
});

// Function to sync habits from remote to local
async function exportDb() {
  // let create a ready only replica of the remote db
  const replica = await localDb.sync();

  console.log(replica);
}

exportDb().catch(console.error);
