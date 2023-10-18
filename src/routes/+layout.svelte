<script lang="ts">
	import { writable } from 'svelte/store';
	import '../app.css';
	import { getContext, setContext } from 'svelte';

	/** @type {import('./$types').LayoutData} */
	// export let data;
	
	let user_cursor = writable()
	$: user_cursor.set({
		x: 0,
		y: 0
	})

	setContext('user_cursor', user_cursor);
</script>

<slot />
