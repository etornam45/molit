<script>
	import CursorSelect from './icons/LeftSideBar/cursor-select.svelte';
	import PenNib from './icons/LeftSideBar/pen-nib.svelte';
	import PolygonThin from './icons/LeftSideBar/polygon-thin.svelte';
	import Square from './icons/LeftSideBar/square.svelte';
	import TextIcon from './icons/LeftSideBar/text-icon.svelte';
	import Triangle from './icons/LeftSideBar/triangle.svelte';
	import IconSlot from './LeftSideBar/IconSlot.svelte';

	import { selectedCursor } from '$lib/stores';
	import Cursor from './icons/cursor.svelte';

	/**
	 * @type {string | undefined}
	 */
	let _selectedCursor;

	selectedCursor.subscribe((value) => {
		_selectedCursor = value;
	});
	/**
	 * @param Cursor {string}
	 */
	function updateSelectedCursor(Cursor) {
		selectedCursor.set(Cursor);
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
		<IconSlot title="Polygon" on:select={() => updateSelectedCursor('Polygon')} _class={_selectedCursor == "Polygon"? _selectedCursor: ""}>
			<PolygonThin />
		</IconSlot>
		<IconSlot title="Text" on:select={() => updateSelectedCursor('Text')} _class={_selectedCursor == "Text"? _selectedCursor: ""}>
			<TextIcon />
		</IconSlot>
	</div>

	<div>
		<IconSlot title="Delete" _class="Delete" on:select={() => {}}>
			Del
		</IconSlot>
	</div>
</aside>
