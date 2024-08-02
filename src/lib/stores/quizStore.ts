// Not used just for reference
import { writable } from 'svelte/store';

export type Question = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export type QuizStore = {
  quizSubject: string;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswerIndices: number[];
  score: number;
  quizCompleted: boolean;
}

export const quizStore = writable<QuizStore>({
  quizSubject: '',
  questions: [],
  currentQuestionIndex: 0,
  userAnswerIndices: [],
  score: 0,
  quizCompleted: false
});

export const setQuizSubject = (quizSubject: string) => {
  quizStore.update(store => {
    store.quizSubject = quizSubject;
    return store;
  });
}

export const setQuestions = (questions: Question[]) => {
  quizStore.update(store => {
    store.questions = questions;
    return store;
  });
}

export const addUserAnswer = (answerIndex: number) => {
  quizStore.update(store => {
    store.userAnswerIndices.push(answerIndex);
    
    // Increase the score if the answer is correct
    if (store.questions[store.currentQuestionIndex].correctAnswerIndex === answerIndex) {
      store.score++;
    }

    // if it's the last question, set quizCompleted to true, otherwise, move to the next question 
    if (store.currentQuestionIndex === store.questions.length - 1) {
      store.quizCompleted = true;
    } else {
      store.currentQuestionIndex++;
    }
    
    // correct answers 

    return store;
  });
}

export const resetQuiz = () => {
  quizStore.update(store => {
    store.quizSubject = '';
    store.questions = [];
    store.currentQuestionIndex = 0;
    store.userAnswerIndices = [];
    store.score = 0;
    store.quizCompleted = false;
    return store;
  });
}

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


export const setupTempData = () => {
  setQuizSubject('Astrophysics');
  setQuestions(astrophysicsQuestions);
}
