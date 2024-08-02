import type { PageServerLoad } from './$types';
import { db } from '$lib/server/drizzle';

export const load: PageServerLoad = async ({ params }) => {
  const quizId = params.id;

  // Redirect to error page if quizId is not a number
  if (isNaN(Number(quizId))) {
    return {
      status: 302,
      redirect: '/error'
    };
  }

  const quiz = await db.query.quizSchema.findFirst({
    where: (quizzes, { eq }) => eq(quizzes.id, parseInt(quizId)),
  });

  if (!quiz) {
    return {
      status: 302,
      redirect: '/error'
    };
  }

  const questions = await db.query.questionsSchema.findMany({
    where: (questions, { eq }) => eq(questions.quizId, parseInt(quizId)),
  });

  return {
    quizWithQuestions: {
      ...quiz,
      questions 
    }
  };
}
