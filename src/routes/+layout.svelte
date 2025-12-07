<script lang="ts">
	
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../Navbar.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar></Navbar>
{@render children()}
