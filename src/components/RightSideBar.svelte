<script>
	import { selectedShape, shapes, shapesDrawn } from '$lib/stores';
	import SegmentSlote from './RightSideBar/SegmentSlote.svelte';
	$: activeShape = $shapes.get($selectedShape);
	$: console.log($selectedShape);
</script>

<aside class="w-[300px] bg h-full border-l b-color">
	{#if $selectedShape}
		<SegmentSlote title="Properties">
			<div class="h-[500px]">
				{activeShape?.preferences.background}
			</div>
		</SegmentSlote>
	{/if}
	<SegmentSlote title="Layers">
		{#each $shapesDrawn as shapes}
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
