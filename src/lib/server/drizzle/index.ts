import { createPool } from '@vercel/postgres';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { POSTGRES_URL } from '$env/static/private';

const pool = createPool({
	connectionString: POSTGRES_URL
});

const db = drizzle(pool, {
	schema,
  logger: true
});

export { db, schema };
