import type { PageServerLoad } from './$types';
import { db } from '$lib/server/drizzle';

export const load: PageServerLoad = async ({ params }) => {
  const quizId = params.id;

  const quiz = await db.query.quizSchema.findFirst({
    where: (quizzes, { eq }) => eq(quizzes.id, Number(quizId)),
  });

  if (!quiz) {
    return {
      status: 302,
      redirect: '/error'
    };
  }

  const questions = await db.query.questionsSchema.findMany({
    where: (questions, { eq }) => eq(questions.quizId, Number(quizId)),
  });

  return {
    quizWithQuestions: {
      ...quiz,
      questions,
    }
  };
}


