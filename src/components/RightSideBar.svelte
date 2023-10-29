<script>
	import SegmentSlote from "./RightSideBar/SegmentSlote.svelte";
    import {selectedShape} from "$lib/stores"
</script>
<aside class="w-[300px] bg h-full border-l b-color">
    <SegmentSlote title="Properties">
        <div class="h-[500px]">

        </div>
    </SegmentSlote>
    <SegmentSlote title="Layers">
        {$selectedShape}
    </SegmentSlote>
</aside>