<script>
    import { cursorPosition, selectedCursor } from "$lib/stores";
</script>

<footer class="bg-emerald-400 text-sm border-t b-color  flex gap-3 px-2">
    <!-- Selected shape -->
    <div class="w-[120px]">
        <b>Cursor : </b> {$selectedCursor}
    </div>

    <div class=" bg-emerald-800 px-2 text-white/70">
        <b>X : </b> {$cursorPosition.x}
        <b>, Y : </b> {$cursorPosition.y} 
    </div>
</footer>