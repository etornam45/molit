<script lang="ts">
	import { onMount } from 'svelte';
	// import Cursor from '../icons/cursor.svelte';

	const cursor_pointer = {
		x: Number(),
		y: Number()
	};

	let mouse_cliked = false;
	let art_board_cursor = {
		x: 0,
		y: 0
	};

	let art_board_properties: DOMRect;
	let shapes = [];

	let art_board: HTMLElement;


	onMount(() => {
		art_board = document.getElementById('ArtBoard') as HTMLElement;
		art_board_properties = art_board.getBoundingClientRect();
	});

	const hundle_mouse_up = (event: MouseEvent) => {
		mouse_cliked = false;
	};

	const hundle_mouse_down = (event: MouseEvent) => {
		mouse_cliked = true;
		set_art_board_cursor(event.pageX, event.pageY);
	};

	const hundle_mouse_move = (event: MouseEvent) => {

		// Set user cursor position
		set_user_cursor_position(event.pageX, event.pageY);

		if (mouse_cliked) {
			set_art_board_cursor(event.pageX, event.pageY);
		}
	};

	const set_art_board_cursor = (pageX: number, pageY: number) => {
		art_board_cursor.x = pageX - art_board_properties.x;
		art_board_cursor.y = pageY - art_board_properties.y;
	};

	const set_user_cursor_position = (pageX: number, pageY: number) => {
		cursor_pointer.x = pageX;
		cursor_pointer.y = pageY;
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main
	on:mousedown={hundle_mouse_down}
	on:mouseup={hundle_mouse_up}
	on:mousemove={hundle_mouse_move}
	class="art-board cursor-crosshair w-full h-full overflow-scroll relative flex-1"
>
	<!-- <Cursor {cursor_pointer}/> -->
	<svg
		id="ArtBoard"
		class="bg-white h-[800px] w-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scroll-m-4"
	>
		<rect x={art_board_cursor.x} y={art_board_cursor.y} width="140" height="140" />
	</svg>
</main>

<style>
	.art-board::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		/* background: rgb(127, 127, 138); */
	}

	.art-board::-webkit-scrollbar-thumb {
		background: grey;
	}
</style>
