<script>
	import '../app.css';
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
</script>

<svelte:head>
	<title>Enigmatizer</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta
		name="description"
		content="Enigmatizer: Where Every Quiz Is a Conundrum Waiting to Be Solved"
	/>
	<meta name="author" content="@jidarwish" />
</svelte:head>

<div
	class="flex flex-col min-h-screen w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
>
	{#if currentPath !== '/quiz'}
		<header class="flex justify-between px-36 pt-10">
			<a href="/"><h1 class="text-3xl">Enigmatizer</h1></a>

			<nav>
				<ul class="flex space-x-4">
					<li><a href="/leaderboard">Leaderboard</a></li>
					<li><a href="/pricing">Pricing</a></li>
					<li><a href="/about">About</a></li>
				</ul>
			</nav>
		</header>
	{/if}

	<slot />

	{#if currentPath !== '/quiz'}
		<footer class="flex justify-center p-8">
			<p>&copy; 2024 Enigmatizer LLC<sup>TM</sup></p>
		</footer>
	{/if}
</div>
