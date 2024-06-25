<script lang="ts">
    export let name: string;
    export let price: string;
    export let features: string[];
    export let backgroundColor: string;
</script>

<div class={`border border-gray-300 text-black rounded-lg p-6 shadow-md flex flex-col justify-between ${backgroundColor}`}>
    <div>
        <h3 class="text-xl font-semibold mb-4">{name}</h3>
        <div class="text-2xl font-bold mb-4">{price}</div>
        <ul class="list-disc list-inside space-y-2">
            {#each features as feature}
                <li>{feature}</li>
            {/each}
        </ul>
    </div>
    <div class="flex-grow" />
    <div class="pb-4 text-sm text-gray-500 italic">
        {#if name === 'Basic Enigma Plan'}
            * Perfect for those who think five quizzes a month is living on the edge.
        {:else if name === 'Advanced Enigma Plan'}
            * For when you need just enough quizzes to confuse but not overwhelm.
        {:else if name === 'Pro Enigmatizer Plan'}
            * Unlimited quizzes for the truly quiz-obsessed. Is there a quiz support group?
        {:else if name === 'Enigmatizer Guru Plan'}
            * Includes your very own AI assistant because who doesn't want to talk to a machine?
        {:else if name === 'Ultimate Enigma Plan'}
            * For those who think spending $999.99 a month on quizzes is a wise investment.
        {:else if name === 'Corporate Enigmatizer Plan'}
            * When your entire organization needs to be as confused as you are.
        {/if}
    </div>
    <button class="mt-4 text-sm bg-black text-white py-2 px-2 rounded">
        Choose {name}
    </button>
</div>
