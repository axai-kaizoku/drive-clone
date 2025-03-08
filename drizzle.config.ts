import { type Config } from "drizzle-kit"

import { env } from "@/env"

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  tablesFilter: ["drive-clone_*"],
} satisfies Config
