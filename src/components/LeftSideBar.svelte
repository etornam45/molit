<script lang="ts">
	import CursorSelect from './icons/LeftSideBar/cursor-select.svelte';
	import PenNib from './icons/LeftSideBar/pen-nib.svelte';
	import PentagonThin from './icons/LeftSideBar/polygon-thin.svelte';
	import Square from './icons/LeftSideBar/square.svelte';
	import TextIcon from './icons/LeftSideBar/text-icon.svelte';
	import Triangle from './icons/LeftSideBar/triangle.svelte';
	import IconSlot from './LeftSideBar/IconSlot.svelte';
	import Delete from './icons/LeftSideBar/delete.svelte';
	import Hexagon from "./icons/LeftSideBar/hexagon.svelte"
	import Heptagon from "./icons/LeftSideBar/heptagon.svelte"
	import CircleIcon from "./icons/LeftSideBar/circle-icon.svelte"
	// @ts-ignore
	import { selectedCursor, selectedShape, shapes } from '$lib/stores';
	import type { Cursors } from '$lib/types';

	let _selectedCursor: Cursors;

	selectedCursor.subscribe((value: Cursors) => {
		_selectedCursor = value;
	});

	function updateSelectedCursor(cursor: Cursors) {
		selectedCursor.set(cursor);
	}

	function deleteSelectedShape() {
		shapes.update((value) => {
			value.delete($selectedShape);
			return value; 
		});
	}

</script>

<aside class="h-full bg border-r b-color w-fit flex flex-col justify-between">
	<!-- Cursors and shapes -->
	<div class="cursors">
		<IconSlot title="Pointer" on:select={() => updateSelectedCursor('Pointer')} _class={_selectedCursor == "Pointer"? _selectedCursor: ""}>
			<CursorSelect />
		</IconSlot>
		<IconSlot title="Pen" on:select={() => updateSelectedCursor('Pen')} _class={_selectedCursor == "Pen"? _selectedCursor: ""}>
			<PenNib />
		</IconSlot>
		<IconSlot title="Square" on:select={() => updateSelectedCursor('Square')} _class={_selectedCursor == "Square"? _selectedCursor: ""}>
			<Square />
		</IconSlot>
		<IconSlot title={"Triangle"} on:select={() => updateSelectedCursor('Triangle')} _class={_selectedCursor == "Triangle"? _selectedCursor: ""}>
			<Triangle />
		</IconSlot>
		<IconSlot title="Pentagon" on:select={() => updateSelectedCursor('Pentagon')} _class={_selectedCursor == "Pentagon"? _selectedCursor: ""}>
			<PentagonThin />
		</IconSlot>
		<IconSlot title="Hexagon" on:select={() => updateSelectedCursor('Hexagon')} _class={_selectedCursor == "Hexagon"? _selectedCursor: ""}>
			<Hexagon />
		</IconSlot>
		<IconSlot title="Hepatgon" on:select={() => updateSelectedCursor('Hepatgon')} _class={_selectedCursor == "Hepatgon"? _selectedCursor: ""}>
			<Heptagon />
		</IconSlot>
		<IconSlot title="Circle" on:select={() => updateSelectedCursor('Circle')} _class={_selectedCursor == "Circle"? _selectedCursor: ""}>
			<CircleIcon />
		</IconSlot>
		<!-- <IconSlot title="Text" on:select={() => updateSelectedCursor('Text')} _class={_selectedCursor == "Text"? _selectedCursor: ""}>
			<TextIcon />
		</IconSlot> -->
	</div>

	<div>
		<IconSlot title="Delete" _class="Delete" on:select={deleteSelectedShape}>
			<Delete />
		</IconSlot>
	</div>
</aside>
