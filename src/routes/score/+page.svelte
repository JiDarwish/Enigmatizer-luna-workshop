<script lang="ts">
	import { get } from 'svelte/store';
	import { quizStore, resetQuiz } from '$lib/stores/quizStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let quizData = get(quizStore);
	let scoreMessage = '';

	onMount(() => {
		const score = quizData.score;
		const totalQuestions = quizData.questions.length;

		if (score === totalQuestions) {
			scoreMessage = "Unbelievable! A perfect score! Are you some kind of quiz deity?";
		} else if (score >= totalQuestions * 0.8) {
			scoreMessage = "Impressive! But let’s be honest, you probably Googled a few answers.";
		} else if (score >= totalQuestions * 0.6) {
			scoreMessage = "Not too shabby! You might actually have a brain in there.";
		} else if (score >= totalQuestions * 0.4) {
			scoreMessage = "You got some right! Were those guesses or do you actually know stuff?";
		} else if (score >= totalQuestions * 0.2) {
			scoreMessage = "At least you’re consistent. Consistently bad, that is.";
		} else {
			scoreMessage = "Yikes! Did you even try? My pet rock knows more than you.";
		}
	});
	
	const restartQuiz = () => {
		resetQuiz();
		goto('/');
	};
</script>

<body class="flex-grow flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
	<h1 class="text-4xl font-bold animate-bounce mb-8">Quiz Completed!</h1>

	<div class="w-full max-w-lg bg-white text-black p-8 rounded-xl shadow-2xl border-4 border-yellow-500 text-center">
		<h2 class="text-3xl font-bold mb-4">Your Score: {quizData.score}/{quizData.questions.length}</h2>
		<p class="text-xl mb-8">{scoreMessage}</p>
		<button on:click={restartQuiz} class="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-full hover:bg-gradient-to-l hover:from-purple-600 hover:via-blue-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105">
			New quiz
		</button>
	</div>
</body>

<style>
	@keyframes bounce {
		0%, 100% {
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
