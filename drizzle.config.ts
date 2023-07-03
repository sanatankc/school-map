import type { Config } from "drizzle-kit";

export default {
  schema: "./app/api/migrate.ts",
  out: "./generated",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: 'mysql://f2coocrsib7rlf7skslm:pscale_pw_fwTfCXcD3MdxM5X50d3mCuRW5ppUTrv6cBr21mNFZMO@aws.connect.psdb.cloud/dotstudio?ssl={"rejectUnauthorized":true}',
  }
} satisfies Config;