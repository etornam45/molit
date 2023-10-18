<script>
	import CursorSelect from "../icons/cursor-select.svelte";
	import PenNib from "../icons/pen-nib.svelte";
    import PolygonThin from "../icons/polygon-thin.svelte";
	import Square from "../icons/square.svelte";
	import TextIcon from "../icons/text-icon.svelte";
	import Triangle from "../icons/triangle.svelte";
	import IconSlot from "./IconSlot.svelte";

</script>
<aside class="h-full bg border-r b-color w-fit ">

    <!-- Cursors and shapes -->
    <div class="cursors">
        <IconSlot >
            <CursorSelect />
        </IconSlot>
        <IconSlot>
            <PenNib />
        </IconSlot>
        <IconSlot>
            <Square/>
        </IconSlot>
        <IconSlot>
            <Triangle />
        </IconSlot>
        <IconSlot> 
            <PolygonThin />
        </IconSlot>
        <IconSlot>
            <TextIcon />
        </IconSlot>
    </div>

</aside>