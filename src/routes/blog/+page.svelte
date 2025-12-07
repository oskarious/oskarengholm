<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const getVisibleTags = (post: (typeof data.posts)[number]) => {
		return (post.metadata.visibleTags ?? '')
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);
	};
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold">Blog</h1>

	{#if data.posts.length === 0}
		<p class="text-gray-600">No posts yet.</p>
	{:else}
		<ul class="grid gap-6">
			{#each data.posts as post (post.slug)}
				<li>
					<a href="/blog/{post.slug}" class="group block">
						<article
							class="relative h-72 overflow-hidden rounded-lg bg-gray-200 bg-cover bg-center"
							style="background-image: url('{post.metadata.thumbnail}')"
						>
							<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
							<div class="absolute bottom-0 left-0 p-4 text-white group-hover:underline">
								<h2 class="text-xl font-semibold">{post.metadata.title}</h2>
								<p>{post.metadata.description}</p>
								{#if getVisibleTags(post).length > 0}
									<div>
										{#each getVisibleTags(post) as tag (tag)}
											<span
												class="inline-block bg-blue-100 text-blue-800 text-xs px-1 py-0.5 rounded mr-2"
												>{tag}</span
											>
										{/each}
									</div>
								{/if}
								<time class="text-sm text-white/80" datetime={post.metadata.date}>
									{new Date(post.metadata.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							</div>
						</article>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>
