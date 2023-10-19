<script lang="ts">
	import { socket } from '$lib/websocket';
	import { onMount } from 'svelte';
	import Cursor from '../icons/cursor.svelte';
	import { cursorPosition } from '$lib/stores';


	const cursor_pointer = {
		x: Number(),
		y: Number()
	};

	let mouse_cliked = false;
	let art_board_cursor = {
		x: 0,
		y: 0
	};

	let otheer_cursor = {
		x: 0,
		y: 0
	};

	let art_board_properties: DOMRect;
	let shapes = [];

	let art_board: HTMLElement;
	let main_board: HTMLElement;
	onMount(() => {
		main_board = document.querySelector('.art-board') as HTMLElement;
		art_board = document.getElementById('ArtBoard') as HTMLElement;
		window.onresize = () => {
			art_board = document.getElementById('ArtBoard') as HTMLElement;
			main_board = document.querySelector('.art-board') as HTMLElement;
		};
	});
	$: if (art_board) {
		art_board_properties = art_board.getBoundingClientRect();
		console.log(art_board_properties);
	}
	$: if (main_board) {
		console.log(main_board.scrollHeight, main_board.scrollTop);
	}

	const hundle_mouse_up = (event: MouseEvent) => {
		mouse_cliked = false;
	};

	const hundle_mouse_down = (event: MouseEvent) => {
		mouse_cliked = true;
		set_art_board_cursor(event.pageX, event.pageY);
	};

	const hundle_mouse_move = (event: MouseEvent) => {
		// console.log(event);

		// Set user cursor position
		set_user_cursor_position(event.pageX, event.pageY);

		if (mouse_cliked) {
			set_art_board_cursor(event.pageX, event.pageY);
		}
	};

	const set_art_board_cursor = (pageX: number, pageY: number) => {
		art_board_cursor.x = pageX - art_board_properties.x + main_board.scrollLeft;
		art_board_cursor.y = pageY - art_board_properties.y + main_board.scrollTop;
	};

	const set_user_cursor_position = (pageX: number, pageY: number) => {
		cursor_pointer.x = pageX;
		cursor_pointer.y = pageY;

		cursorPosition.set({x: cursor_pointer.x, y: cursor_pointer.y});
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main
	on:mousedown={hundle_mouse_down}
	on:mouseup={hundle_mouse_up}
	on:mousemove={hundle_mouse_move}
	class="art-board cursor-crosshair w-full h-full overflow-scroll relative flex-1 p-10"
>
	<svg
		id="ArtBoard"
		class="bg-white h-[800px] w-[1300px] relative top-[50%] translate-y-[-50%]"
		style="margin: 0 auto;"
	>
		<circle cx={art_board_cursor.x} cy={art_board_cursor.y} r="15" fill="none" stroke="indigo"/>
	</svg>
</main>

<style>
	.art-board::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		background: rgb(35, 35, 37);
		appearance: none;
	}

	.art-board::-webkit-scrollbar-thumb {
		background: grey;
		cursor: grab;
	}

	.art-board::-webkit-scrollbar-track{
		width: 10px;height: 10px;
		/* background: red; */
	}
</style>
