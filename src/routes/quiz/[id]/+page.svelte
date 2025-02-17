<script lang="ts">
	import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	const { quizWithQuestions } = data;
	const questions = quizWithQuestions?.questions ?? [];
	let curQuestionIndex = 0;
	let questionAnswers: { [key: number]: number } = {};

	$: quizIsCompleted = curQuestionIndex === questions.length;

	const handleAnswer = (answerIndex: number, questionId: number) => {
		questionAnswers[questionId] = answerIndex;
		curQuestionIndex++;

		if (curQuestionIndex === questions.length) {
			fetch('/score', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					answers: questionAnswers,
					quizId: quizWithQuestions?.id
				})
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					goto(`/score/${data.quizId}`);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};
</script>

<body
	class="flex-grow flex flex-col min-h-screen w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
>
	<h1 class="pt-10 text-center text-4xl font-bold animate-bounce mb-8">
		Chosen quiz subject is <span class="italic underline decoration-wavy decoration-yellow-500"
			>{quizWithQuestions?.topic}</span
		>
	</h1>

	<div class="flex-grow flex flex-col justify-center items-center">
		<div
			class="w-full max-w-lg bg-white text-black p-8 rounded-xl shadow-2xl border-4 border-yellow-500"
			transition:fade
		>
			{#if !quizIsCompleted && questions.length > 0}
				{@const options = questions[curQuestionIndex]?.options ?? []}
				<h2 class="text-3xl font-bold mb-6 text-center">
					{questions[curQuestionIndex]?.questionText}
				</h2>
				<div class="space-y-4">
					{#each options as option, i}
						<button
							on:click={() => handleAnswer(i, questions[curQuestionIndex].id)}
							class="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-full hover:bg-gradient-to-l hover:from-purple-600 hover:via-blue-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105"
						>
							{option}
						</button>
					{/each}
				</div>
				<div class="mt-8 text-center">
					<p class="text-lg font-semibold mb-2">
						Question {curQuestionIndex + 1} of {questions.length}
					</p>
					<progress
						max={questions.length}
						value={curQuestionIndex + 1}
						class="w-full h-4 rounded-full overflow-hidden"
					>
						<div class="h-full bg-yellow-500"></div>
					</progress>
				</div>
			{:else if quizIsCompleted}
				<p class="text-2xl font-bold">Quiz completed! Redirecting to score page...</p>
			{:else}
				<p class="text-2xl font-bold">Loading questions...</p>
			{/if}
		</div>
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
