<!-- src/routes/leaderboard/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	const quizzes = data.quizzes;

	const navigateToScorePage = (quizId: number) => {
		goto(`/score/${quizId}`);
	};
</script>

<body
	class="flex-grow flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
>
	<h1 class="text-4xl font-bold animate-bounce mb-8">Leaderboard</h1>

	<div
		class="w-full max-w-3xl bg-white text-black p-8 rounded-xl shadow-2xl border-4 border-yellow-500"
	>
		<ul class="space-y-4">
			{#each quizzes as quiz}
				<li class="flex justify-between items-center">
					<span class="text-2xl font-bold">{quiz.topic}</span>
					<div>
						<span>{quiz.score}</span>
						<button
							on:click={() => navigateToScorePage(quiz.id)}
							class="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-2 rounded-full hover:bg-gradient-to-l hover:from-purple-600 hover:via-blue-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105"
						>
							View breakdown
						</button>
					</div>
				</li>
      {:else}
        <p class="text-2xl font-bold">No quizzes available</p>
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
