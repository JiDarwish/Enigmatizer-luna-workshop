<script>
	import PricingCard from '$lib/components/PricingCard.svelte';

	const randomTailwindBackground = () => {
		const colors = [
			'bg-red-200',
			'bg-blue-200',
			'bg-green-200',
			'bg-yellow-200',
			'bg-purple-200',
			'bg-pink-200',
			'bg-indigo-200',
			'bg-gray-200'
		];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	const pricingPlans = [
		{
			name: 'Basic Enigma Plan',
			price: '$9.99/month',
			features: [
				'Generate up to 5 quizzes per month',
				'Access to the standard Enigma Engine',
				'Basic support (responses within 7-10 business days)',
				'Occasional riddles and brain teasers delivered to your inbox',
				'Ads interspersed with cryptic messages'
			]
		},
		{
			name: 'Advanced Enigma Plan',
			price: '$29.99/month',
			features: [
				'Generate up to 50 quizzes per month',
				'Access to the Enigma Engine and RiddleRealm',
				'Priority support (responses within 3-5 business days)',
				'Personalized brain teasers based on your quiz history',
				'Ads with mysterious hints and clues'
			]
		},
		{
			name: 'Pro Enigmatizer Plan',
			price: '$79.99/month',
			features: [
				'Generate unlimited quizzes',
				'Full access to the Enigma Engine, PuzzlePad, and RiddleRealm',
				'Premium support (responses within 24 hours)',
				'Customizable quiz themes and question formats',
				'Monthly virtual escape room challenges',
				'Ads featuring enigmatic riddles and puzzles'
			]
		},
		{
			name: 'Enigmatizer Guru Plan',
			price: '$199.99/month',
			features: [
				'All features of the Pro Enigmatizer Plan',
				'Dedicated AI quiz assistant named "EnigmaBot"',
				'Personalized quiz analytics and insights',
				'Quarterly brain teaser boxes sent to your home',
				'Exclusive access to Enigma Nights events',
				"Ads? What ads? They're all encoded messages now"
			]
		},
		{
			name: 'Ultimate Enigma Plan',
			price: '$999.99/month',
			features: [
				'All features of the Enigmatizer Guru Plan',
				'Access to the Beta Enigma Engine with cutting-edge AI',
				'24/7 concierge support with a direct line to our Enigmatizer experts',
				'Lifetime access to all future features and updates',
				'Annual invite to the Enigmatizer Summit (travel not included)',
				'Personalized video messages from the Enigmatizer development team',
				'Secretive, ever-changing premium quizzes that adapt to your mood and thoughts',
				'Ads replaced by cryptic messages that may or may not contain the secrets of the universe'
			]
		},
		{
			name: 'Corporate Enigmatizer Plan',
			price: 'Contact us for a quote (starting at $4999.99/month)',
			features: [
				'All features of the Ultimate Enigma Plan',
				'Enterprise-level security and data encryption',
				'Custom-built quiz solutions for teams and organizations',
				'On-site Enigmatizer workshops (travel and accommodation not included)',
				'VIP access to all Enigmatizer-hosted events',
				'Ads replaced by motivational messages in code'
			]
		}
	];
</script>

<body class="flex-grow w-screen flex justify-center">
	<div class="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-20">
		{#each pricingPlans as plan}
			<PricingCard {...plan} backgroundColor={randomTailwindBackground()} />
		{/each}
	</div>
</body>
