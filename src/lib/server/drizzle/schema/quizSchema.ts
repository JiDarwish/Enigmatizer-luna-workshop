import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const quizSchema = pgTable('quiz', {
  id: serial('id').primaryKey(),
  topic: varchar('topic').notNull(),
  score: integer('score'),
});

// export const quizRelations = relations(quizSchema, ({ many }) => ({
//   questions: many(questionsSchema),
// }));
