interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  answerGivenIndex: number;
  quizId: number;
}

interface Quiz {
  id: number;
  topic: string;
  score: number;
}
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
      quiz?: Quiz;
      quizzes?: Quiz[];
      quizWithQuestions?: Quiz & { questions: Question[] };
    }
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
