<script>
	import CursorSelect from "../icons/cursor-select.svelte";
	import PenNib from "../icons/pen-nib.svelte";
    import PolygonThin from "../icons/polygon-thin.svelte";
	import Square from "../icons/square.svelte";
	import TextIcon from "../icons/text-icon.svelte";
	import Triangle from "../icons/triangle.svelte";

</script>
<aside class="h-full bg border-r b-color w-[48px]">

    <!-- Cursors and shapes -->
    <div class="cursors">
        <div class="icons bg-slate-700  hover:bg-emerald-500 hover:shadow-md cursor-pointer flex items-center justify-center py-2 m-2 rounded">
            <CursorSelect />
        </div>
        <div class="icons bg-slate-700  hover:bg-emerald-500 hover:shadow-md cursor-pointer flex items-center justify-center py-2 m-2 rounded">
            <PenNib />
        </div>
        <div class="icons bg-slate-700  hover:bg-emerald-500 hover:shadow-md cursor-pointer flex items-center justify-center py-2 m-2 rounded">
            <Square />
        </div>
        <div class="icons bg-slate-700  hover:bg-emerald-500 hover:shadow-md cursor-pointer flex items-center justify-center py-2 m-2 rounded">
            <Triangle />
        </div>
        
        <div class="icons bg-slate-700  hover:bg-emerald-500 hover:shadow-md cursor-pointer flex items-center justify-center py-2 m-2 rounded">
            <PolygonThin />
        </div>
        <div class="icons bg-slate-700  hover:bg-emerald-500 hover:shadow-md cursor-pointer flex items-center justify-center py-2 m-2 rounded">
            <TextIcon />
        </div>
    </div>

</aside>