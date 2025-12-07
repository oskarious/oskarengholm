<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		date?: string;
		tags?: string;
		visibleTags?: string;
		children?: Snippet;
		thumbnail?: string;
	}

	let { title, date, tags, visibleTags, children, thumbnail }: Props = $props();
	// svelte-ignore state_referenced_locally
	let splitTags = tags?.split(',').map((tag) => tag.trim()) || [];
	// svelte-ignore state_referenced_locally
	let splitVisibleTags = visibleTags?.split(',').map((tag) => tag.trim()) || [];

	let absoluteThumbnail = $derived(
		thumbnail ? new URL(thumbnail, page.url.origin).href : undefined
	);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content="Blog post about {title}" />
    <meta property="og:title" content={title} />
    <meta property="twitter:title" content={title} />
    <meta property="og:description" content="Blog post about {title}" />
    <meta property="twitter:description" content="Blog post about {title}" />
    <meta property="article:published_time" content={date} />
    {#if absoluteThumbnail}
        <meta property="og:image" content={absoluteThumbnail} />
        <meta property="twitter:image" content={absoluteThumbnail} />
    {/if}
    
    {#if splitTags.length > 0}
        <meta name="keywords" content={splitTags.join(', ')} />
        <meta name="og:keywords" content={splitTags.join(', ')} />
        <meta name="twitter:keywords" content={splitTags.join(', ')} />
    {/if}
</svelte:head>

<article class="mx-auto max-w-prose px-4 py-8">
	{#if title}
		<header class="mb-8 border-b border-gray-200 pb-4">
			<h1 class="text-4xl font-bold leading-tight mb-2">{title}</h1>
            {#if splitVisibleTags.length > 0}
                <div class="mb-2">
                    {#each splitVisibleTags as tag (tag)}
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">{tag}</span>
                    {/each}
                </div>
            {/if}
			{#if date}
				<time datetime={date} class="text-gray-500 text-sm">
					{new Date(date).toLocaleDateString('en-US', { 
						year: 'numeric', 
						month: 'long', 
						day: 'numeric' 
					})}
				</time>
			{/if}
		</header>
	{/if}
	
	<div class="prose prose-lg prose-blue max-w-none">
		{@render children?.()}
	</div>
</article>
