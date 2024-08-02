<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Question } from '$lib/server/drizzle/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let scoreMessage = '';
	const score = data.quizWithQuestions.score ?? 0;
	const questions = data.quizWithQuestions?.questions ?? [];

	$: if (score === 10) {
		scoreMessage = 'Unbelievable! A perfect score! Are you some kind of quiz deity?';
	} else if (score >= 8) {
		scoreMessage = 'Impressive! But let’s be honest, you probably Googled a few answers.';
	} else if (score >= 6) {
		scoreMessage = 'Not too shabby! You might actually have a brain in there.';
	} else if (score >= 4) {
		scoreMessage = 'You got some right! Were those guesses or do you actually know stuff?';
	} else if (score >= 2) {
		scoreMessage = 'At least you’re consistent. Consistently bad, that is.';
	} else {
		scoreMessage = 'Yikes! Did you even try?';
	}

	const isQuestionCorrect = (question: Question) => question.answerGivenIndex === question.correctAnswerIndex;

	const goToStart = () => {
		goto('/');
	};
</script>

<body
	class="flex-grow flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
>
	<div class="mt-40">
		<h1 class="text-center text-4xl font-bold animate-bounce mb-8">Quiz Completed!</h1>

		<div
			class="w-full max-w-lg bg-white text-black p-8 rounded-xl shadow-2xl border-4 border-yellow-500 text-center"
		>
			<h2 class="text-3xl font-bold mb-4">Your Score: {score}/10</h2>
			<p class="text-xl mb-8">{scoreMessage}</p>

			<button
				on:click={goToStart}
				class="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-full hover:bg-gradient-to-l hover:from-purple-600 hover:via-blue-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105"
			>
				New quiz
			</button>
		</div>
	</div>

	<div
		class="w-full max-w-3xl bg-white text-black p-8 rounded-xl shadow-2xl border-4 border-yellow-500 text-center mt-8"
	>
		<h2 class="text-3xl font-bold mb-6 text-center">Your Answers</h2>

		<ul class="mb-8">
			{#each questions as question}
				<li class="mb-4">
					<h3 class="text-2xl">{question.questionText}</h3>
					<p class="text-lg">
						Your Answer: {question.options[question.answerGivenIndex]}
						{#if isQuestionCorrect(question)}
							<span class="text-green-500"> (Correct)</span>
						{:else}
							<span class="text-red-500">
								(Wrong, Correct Answer: {question.options[question.correctAnswerIndex]})</span
							>}
						{/if}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</body>

<style>
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-15px);
		}
	}
	.animate-bounce {
		animation: bounce 1s infinite;
	}
</style>
