<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { quizStore, addUserAnswer, setupTempData } from '$lib/stores/quizStore';
	import { fade } from 'svelte/transition';

  console.log('quizStore', $quizStore);
  onMount(() => {
    if ($quizStore.quizSubject === '') {
      goto('/');
    }
    setupTempData();
  });

	const handleAnswer = (index: number) => {
		addUserAnswer(index);
		if ($quizStore.quizCompleted) {
			goto('/score');
		}
	};
</script>

<body class="flex-grow flex flex-col min-h-screen w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
	<h1 class="pt-10 text-center text-4xl font-bold animate-bounce mb-8">
		Chosen quiz subject is <span class="italic underline decoration-wavy decoration-yellow-500">{$quizStore.quizSubject}</span>
	</h1>

	<div class="flex-grow flex flex-col justify-center items-center">
		<div class="w-full max-w-lg bg-white text-black p-8 rounded-xl shadow-2xl border-4 border-yellow-500" transition:fade>
			{#if !$quizStore.quizCompleted && $quizStore.questions.length > 0}
				<h2 class="text-3xl font-bold mb-6 text-center">{$quizStore.questions[$quizStore.currentQuestionIndex].question}</h2>
				<div class="space-y-4">
					{#each $quizStore.questions[$quizStore.currentQuestionIndex].options as option, i}
						<button on:click={() => handleAnswer(i)} class="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-full hover:bg-gradient-to-l hover:from-purple-600 hover:via-blue-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105">
							{option}
						</button>
					{/each}
				</div>
				<div class="mt-8 text-center">
					<p class="text-lg font-semibold mb-2">Question {$quizStore.currentQuestionIndex + 1} of {$quizStore.questions.length}</p>
					<progress max={$quizStore.questions.length} value={$quizStore.currentQuestionIndex + 1} class="w-full h-4 rounded-full overflow-hidden">
						<div class="h-full bg-yellow-500"></div>
					</progress>
				</div>
			{:else if $quizStore.quizCompleted}
				<p class="text-2xl font-bold">Quiz completed! Redirecting to score page...</p>
			{:else}
				<p class="text-2xl font-bold">Loading questions...</p>
			{/if}
		</div>
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
