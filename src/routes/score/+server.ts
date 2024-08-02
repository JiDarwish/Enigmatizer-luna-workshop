import type { Question } from '$lib/stores/quizStore';
import { db } from '$lib/server/drizzle';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { questionsSchema, quizSchema } from '$lib/server/drizzle/schema';
import { eq } from 'drizzle-orm';

type BodyType = {
  answers: { [key: number]: number };
  quizId: number;
}

export const POST: RequestHandler = async ({ request }) => {
  const body = (await request.json()) as BodyType;
  const quizId = body.quizId;
  const answers = body.answers;


  const promises = Object.entries(answers).map( ([questionId, answerIdx]) => 
    db.update(questionsSchema).set({ answerGivenIndex: answerIdx }).where(eq(questionsSchema.id, Number(questionId)))
  )

  // Save answers
  await Promise.all(promises);

  const questions = await db.query.questionsSchema.findMany({
    where: (questions, { eq }) => eq(questions.quizId, quizId),
  });


  const score = questions.reduce((acc, question) => {
    return question.correctAnswerIndex === question.answerGivenIndex ? acc + 1 : acc;
  }, 0);

  // Update the score in the quiz table
  await db.update(quizSchema).set({ score }).where(eq(quizSchema.id, quizId));
                          

  // return that you should redirect to the score page of the quiz with this id
  return json({
    message: 'Answers saved',
    quizId,
  });
}
