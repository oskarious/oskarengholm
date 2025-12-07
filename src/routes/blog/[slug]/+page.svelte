<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	let Content = $derived(data.content);
</script>

<Content />