import type { InferSelectModel } from 'drizzle-orm';
import type { schema } from '.';

export type Question = InferSelectModel<typeof schema.questionsSchema>;
export type Quiz = InferSelectModel<typeof schema.quizSchema>;
