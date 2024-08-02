import { defineConfig } from "drizzle-kit"
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.POSTGRES_URL as string; // If empty there will be a problem

export default defineConfig({
  dialect: "postgresql",
  schema: './src/lib/server/drizzle/schema/*',
  out: './drizzle',
  dbCredentials: {
		// host: process.env.POSTGRES_HOST,
  //   port: parseInt(process.env.POSTGRES_PORT as string),
		// user: process.env.POSTGRES_USER,
		// password: process.env.POSTGRES_PASSWORD,
		// database: process.env.POSTGRES_DATABASE
    url: connectionString
  }
})

