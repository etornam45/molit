<script>
	import BlackHoleEmoji from "../icons/black-hole-emoji.svelte";
import Intersect from "../icons/intersect.svelte";
	import Play from "../icons/play.svelte";
	import Unoin from "../icons/unoin.svelte";


</script>

<header class="w-full bg border-b b-color">
    <nav class="w-full py-1 px-1 flex justify-between items-center">
        <!-- Logo -->
        <div class="h-8 flex items-center gap-1 cursor-pointer">
            <BlackHoleEmoji/>
            <p class=" text-center font-bold">Molit</p>
        </div>
        <!-- Special Actions -->
        <div class="h-full flex rounded overflow-hidden gap-0">
            <div class="h-8 w-8 bg-slate-500/60 flex items-center justify-center cursor-pointer hover:bg-slate-400">
                <Intersect />
            </div>
            <div class="h-8 w-8 bg-slate-500/60 flex items-center justify-center cursor-pointer hover:bg-slate-400">
                <Unoin />
            </div>
        </div>
        <!-- Control -->
        <div class="bg-slate-500 hover:bg-emerald-600 cursor-pointer mr-3 rounded-full w-8 h-8 flex items-center justify-center gap-2">
            <Play />
        </div>
    </nav>
</header>