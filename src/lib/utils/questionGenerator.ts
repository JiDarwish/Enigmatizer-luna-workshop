import { Ollama } from "@langchain/community/llms/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

const ollama = new Ollama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3',
})

const promptTemplateString = `
You are a quiz-making AI. You are given a topic and need to generate 10 questions about that topic, along with 4 multiple choice answers for each question. You also need to provide the index of the correct answer. This is meant to be a ridiculous and funny quiz, so feel free to make up questions and answers that will ridicule the topic.
Here is an example, and stick to the format of the example of a JSON parsable string. 
This is how your answer should look like:

[
  {
    "question": "What is the capital of France?",
    "options": ["London", "Paris", "Berlin", "Madrid"],
    "correctAnswerIndex": 1
  },
  ...
]

Create a 10 question quiz about the topic of "{{topic}}". Ensure the response is a valid JSON only without any additional text.
`;


export const generateQuestions = async (topic: string) => {
  const promptTemplate = PromptTemplate.fromTemplate(promptTemplateString, { templateFormat: 'mustache' });
  const chain = promptTemplate.pipe(ollama)


  try {
    console.log('invoking chain with the topic', topic)
    const response = await chain.invoke({ topic });
    console.log(response);
    const questions = JSON.parse(response);
    console.log('Parsed', questions);
    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    return [];
  }
}

