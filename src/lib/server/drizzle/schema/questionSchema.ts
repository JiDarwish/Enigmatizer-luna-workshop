import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { quizSchema } from './quizSchema';

export const questionsSchema = pgTable('questions', {
  id: serial('id').primaryKey(),
  questionText: text('question_text').notNull(),
  options: text('options').array().notNull(),
  correctAnswerIndex: integer('correct_answer_index').notNull(),
  answerGivenIndex: integer('answer_given_index').notNull(),
  quizId: integer('quiz_id').references(() => quizSchema.id).notNull(), // foreign key
});


// export const usersRelations = relations(questionsSchema, ({ one }) => ({
//   profileInfo: one(quizSchema, {
//     fields: [questionsSchema.id],
//     references: [quizSchema.id],
//   }),
// }));

