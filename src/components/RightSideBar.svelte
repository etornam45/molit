<script lang="ts">
	import { selectedShape, shapes, shapesDrawn } from '$lib/stores';
	import SegmentSlote from './RightSideBar/SegmentSlote.svelte';
	$: activeShape = $shapes.get($selectedShape);
	$: console.log($selectedShape);

	$: background = activeShape?.preferences.background
</script>

<aside class="w-[300px] bg h-full border-l b-color">
	<!-- {#if $selectedShape}
		<SegmentSlote title="Properties">
			<div class="h-[500px]">
				<input type="color" bind:value={background}>
			</div>
		</SegmentSlote>
	{/if} -->
	<SegmentSlote title="Layers">
		{#each $shapesDrawn as shapes}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<p  class="cursor-pointer user-select-none"
				on:click={() => {
					selectedShape.set(shapes.id);
				}}
			>
				{shapes.type}
			</p>
		{/each}
	</SegmentSlote>
</aside>
