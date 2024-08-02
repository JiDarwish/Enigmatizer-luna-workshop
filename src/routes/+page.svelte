<script lang="ts">
	import { goto } from '$app/navigation';
	import { setQuizSubject, setQuestions } from '$lib/stores/quizStore';

	let quizSubject = '';
	let loading = false;
	let errorMessage = '';

	const formSubmitted = async () => {
		if (quizSubject.trim() === '') {
			errorMessage = 'Please enter a quiz subject';
			return;
		}
		setQuizSubject(quizSubject);
		errorMessage = '';
		loading = true;

		// Send a request to generate the questions on the server
		const questionsResponse = await fetch('/generate-questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ topic: quizSubject })
		});

		if (questionsResponse.ok) {
			const data = await questionsResponse.json();
      console.log('Is all good');
			setQuestions(data.questions);
			goto(`/quiz/${data.quizId}`);
		} else {
			errorMessage = 'Something went wrong, for once it is not your fault.';
			loading = false;
		}
	};
</script>

<body class="flex-grow flex flex-col justify-center items-center text-black">
	<div class="min-h-44 p-8 rounded w-96 bg-white flex flex-col shadow-lg">
		{#if loading}
			<div class="flex-grow flex flex-col justify-center items-center">
				<svg
					class="animate-spin h-12 w-12 mr-3 text-red-500"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<p class="mt-4 text-xl font-bold">Generating Quiz...</p>
			</div>
		{:else}
			<form class="flex flex-col space-y-4" on:submit|preventDefault={formSubmitted}>
				<label for="quiz" class="text-lg font-bold">What do you want to make a quiz about?</label>
				<input
					id="quiz"
					name="quiz"
					bind:value={quizSubject}
					type="text"
					class="p-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
				/>
				<button
					type="submit"
					class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
					>Submit</button
				>
				<p class="text-red-500 text-sm">{errorMessage}</p>
			</form>
		{/if}
	</div>
</body>
