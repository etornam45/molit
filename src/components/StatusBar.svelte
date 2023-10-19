<script>
    import { cursorPosition, selectedCursor } from "$lib/stores";

    /**
	 * @type {any}
	 */
    let cursorValue;
    /**
	 * @type {{ x: number; y: number; }}
	 */
    let _cursor_position;

    selectedCursor.subscribe(value => {
        cursorValue = value;
    })

    cursorPosition.subscribe(value => {
        _cursor_position = value;
    })

</script>

<footer class="bg-emerald-400 text-sm border-t b-color  flex gap-3 px-2">
    <!-- Selected shape -->
    <div class="">
        <b>Cursor:</b> {cursorValue}
    </div>

    <div class=" bg-emerald-800 px-2 text-white/70">
        <b>X:</b> {_cursor_position.x}
        <b>, Y:</b> {_cursor_position.y} 
    </div>
</footer>