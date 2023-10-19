<script>
	import CursorSelect from '../icons/cursor-select.svelte';
	import PenNib from '../icons/pen-nib.svelte';
	import PolygonThin from '../icons/polygon-thin.svelte';
	import Square from '../icons/square.svelte';
	import TextIcon from '../icons/text-icon.svelte';
	import Triangle from '../icons/triangle.svelte';
	import IconSlot from './IconSlot.svelte';

	import { selectedCursor } from '$lib/stores';
	import Cursor from '../icons/cursor.svelte';

	/**
	 * @type {string | undefined}
	 */
	let _selectedCursor;

	selectedCursor.subscribe((value) => {
		_selectedCursor = value;
	});
	/**
	 *
	 * @param Cursor {string}
	 */
	function updateSelectedCursor(Cursor) {
		selectedCursor.set(Cursor);
	}

</script>

<aside class="h-full bg border-r b-color w-fit">
	<!-- Cursors and shapes -->
	<div class="cursors">
		<IconSlot on:select={() => updateSelectedCursor('Pointer')} _class={_selectedCursor == "Pointer"? _selectedCursor: ""}>
			<CursorSelect />
		</IconSlot>
		<IconSlot on:select={() => updateSelectedCursor('Pen')} _class={_selectedCursor == "Pen"? _selectedCursor: ""}>
			<PenNib />
		</IconSlot>
		<IconSlot on:select={() => updateSelectedCursor('Square')} _class={_selectedCursor == "Square"? _selectedCursor: ""}>
			<Square />
		</IconSlot>
		<IconSlot on:select={() => updateSelectedCursor('Triangle')} _class={_selectedCursor == "Triangle"? _selectedCursor: ""}>
			<Triangle />
		</IconSlot>
		<IconSlot on:select={() => updateSelectedCursor('Polygon')} _class={_selectedCursor == "Polygon"? _selectedCursor: ""}>
			<PolygonThin />
		</IconSlot>
		<IconSlot on:select={() => updateSelectedCursor('Text')} _class={_selectedCursor == "Text"? _selectedCursor: ""}>
			<TextIcon />
		</IconSlot>
	</div>
</aside>
