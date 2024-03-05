<script lang="ts">
	import type { Cursors } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    /**
	 * @type {string}
	 */
     export let _class: Cursors | string
	 export let title: Cursors

	function sayHello() {
		dispatch('select');
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={sayHello}
	title="{title}"
	class="{_class != ""? "bg-slate-600 border border-gray-400 selected": "bg-[transparent]"} icons hover:border hover:border-gray-400 cursor-pointer flex items-center justify-center w-9 h-9"
>
	<slot />
</div>
