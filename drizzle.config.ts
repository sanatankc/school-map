import type { Config } from "drizzle-kit";

export default {
  schema: "./app/api/migrate.ts",
  out: "./generated",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: 'mysql://y285hw012u1ao3x9u0ob:pscale_pw_ycxTw0nO9UqbhBA98tVshIvky5hCsPEp9wkJaxESFjc@aws.connect.psdb.cloud/dotstudio?ssl={"rejectUnauthorized":true}',
  }
} satisfies Config;