// src/routes/leaderboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/drizzle';
import type { Quiz } from '$lib/server/drizzle/types';

export const load: PageServerLoad = async () => {
  const quizzes: Quiz[] = await db.query.quizSchema.findMany();

  return {
    quizzes
  };
};


