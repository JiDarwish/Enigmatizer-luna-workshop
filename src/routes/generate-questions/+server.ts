
// TEMPORARY DATA 
const astrophysicsQuestions = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    correctAnswerIndex: 1
  },
  {
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswerIndex: 1
  },
  {
    question: "What is the name of the galaxy that contains our Solar System?",
    options: ["Andromeda", "Messier 82", "Milky Way", "Sombrero"],
    correctAnswerIndex: 2
  },
  {
    question: "What type of celestial object is a pulsar?",
    options: ["Black hole", "Neutron star", "White dwarf", "Supernova"],
    correctAnswerIndex: 1
  },
  {
    question: "Which element is most abundant in the universe?",
    options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
    correctAnswerIndex: 2
  },
  {
    question: "What is the name of the first black hole to be directly imaged?",
    options: ["Sagittarius A*", "Cygnus X-1", "M87*", "V404 Cygni"],
    correctAnswerIndex: 2
  },
  {
    question: "What is the theoretical boundary around a black hole beyond which no light or other radiation can escape?",
    options: ["Event horizon", "Singularity", "Accretion disk", "Photon sphere"],
    correctAnswerIndex: 0
  },
  {
    question: "What is the primary cause of Earth's seasons?",
    options: ["Distance from the sun", "Tilt of Earth's axis", "Solar flares", "Earth's rotation speed"],
    correctAnswerIndex: 1
  },
  {
    question: "What is the name of the effect that causes light from a star to shift towards the red end of the spectrum as it moves away from the observer?",
    options: ["Redshift", "Blueshift", "Doppler effect", "Gravitational lensing"],
    correctAnswerIndex: 0
  },
  {
    question: "What phenomenon causes the apparent backward motion of planets as observed from Earth?",
    options: ["Retrograde motion", "Prograde motion", "Orbital resonance", "Precession"],
    correctAnswerIndex: 0
  }
];

// +server.ts
import type { RequestHandler } from "@sveltejs/kit";
import { json } from '@sveltejs/kit';
import { db, schema } from '$lib/server/drizzle';

import { generateQuestions } from '$lib/utils/questionGenerator';

export const POST: RequestHandler = async ({ request }) => {
  const { topic } = await request.json();
  const realQuestions = await generateQuestions(topic);
  // Use realQuestions if there are any, otherwise use the temporary data 
  const questions = realQuestions.length > 0 ? realQuestions : astrophysicsQuestions;

  const quiz = await db.insert(schema.quizSchema).values({ topic }).returning({ newQuizId: schema.quizSchema.id });
  console.log(quiz);
  const quizId = quiz[0].newQuizId;

  for (const question of questions) {
    await db.insert(schema.questionsSchema).values({
      questionText: question.question,
      options: question.options,
      correctAnswerIndex: question.correctAnswerIndex,
      answerGivenIndex: -1,
      quizId
    });
  }

  return json({
    quizId: quiz[0].newQuizId,
    questions
  });
}
