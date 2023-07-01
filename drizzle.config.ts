import type { Config } from "drizzle-kit";

export default {
  schema: "./app/api/migrate.ts",
  out: "./generated",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: 'mysql://f2prpf73d47od773jug8:pscale_pw_sUgOqTUcnW39VbYz9p5qOsj7cvMarKoB3VVlDiwJBqT@aws.connect.psdb.cloud/dotstudio?ssl={"rejectUnauthorized":true}',
  }
} satisfies Config;