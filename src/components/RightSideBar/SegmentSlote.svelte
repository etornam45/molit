<script>
	import ArrowDown from "../icons/RightSideBar/arrow-down.svelte";
	import ArrowUp from "../icons/RightSideBar/arrow-up.svelte";

	/**
	 * @type {string}
	 */
	export let title;

	let toggled = true;
</script>

<div class=" w-full">
	<div class="title border border-slate-500/60 px-2 bg-white/10 w-full flex items-center justify-between">
		<span class="text-sm font-medium"> {title.toUpperCase()}</span>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="" on:click={() => toggled = !toggled}>
            {#if toggled}
                <ArrowDown />
            {:else}
                <ArrowUp />
            {/if}
        </span>
	</div>

	{#if toggled}
		<div class="content px-2">
			<slot />
		</div>
	{/if}
</div>


<style>
    .title{
        user-select: none;
    }
</style>