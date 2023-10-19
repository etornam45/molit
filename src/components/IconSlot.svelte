<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    /**
	 * @type {string}
	 */
     export let _class

	function sayHello() {
		dispatch('select');
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={sayHello}
	class="{_class != ""? "bg-slate-600 border border-gray-400 selected": "bg-[transparent]"} icons hover:border hover:border-gray-400 cursor-pointer flex items-center justify-center w-8 h-8 rounded m-2"
>
	<slot />
</div>
