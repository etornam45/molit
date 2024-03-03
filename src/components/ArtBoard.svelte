<script lang="ts">
	import { onMount } from 'svelte';
	import { cursorPosition, selectedCursor, selectedShape } from '$lib/stores';
	import { generateColor, generateKey, generateSquarePath } from '$lib';
	import { generatePenPath } from '$lib';
	import { generateTrianglePath } from '$lib/functions';

	const cursor_pointer = { x: Number(), y: Number() };

	let mouse_cliked: boolean;
	let mse_clk_temp: boolean;
	let art_board_cursor: Point = { x: 0, y: 0 };
	let current_shape_id: string;
	// let otheer_cursor = { x: 0, y: 0 };

	let art_board_properties: DOMRect;

	interface Point {
		x: number;
		y: number;
	}
	interface Shape {
		type: string;
		points: Point[];
	}

	let shapes: Map<string, Shape> = new Map();
	let shapesDraw: any = [];

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
	}

	$: {
		shapesDraw = [];
		shapes.forEach(function (value, key) {
			shapesDraw.push({
				id: key != undefined ? key : generateKey(),
				...value
			});
		});
		console.log(shapes);
	}
	const handle_mouse_down = (event: MouseEvent) => {
		// Check if the mouse mouse button is left
		console.log('clicked', event.button, event.buttons);
		if (event.button == 0) {
			if (mouse_cliked == false) {
				current_shape_id = generateKey();
			}
			mouse_cliked = true;
			mse_clk_temp = true;
			set_art_board_cursor(event.pageX, event.pageY);

			switch ($selectedCursor) {
				case 'Pen':
					if (!shapes.has(current_shape_id)) {
						current_shape_id = current_shape_id == undefined ? generateKey() : current_shape_id;
						shapes.set(current_shape_id, {
							type: 'Pen',
							points: [{ x: art_board_cursor.x, y: art_board_cursor.y }]
						});
					} else {
						let _shape = shapes.get(current_shape_id) as Shape;
						_shape?.points.push({ x: art_board_cursor.x, y: art_board_cursor.y });
						shapes.set(current_shape_id, _shape);
						shapes = shapes;
					}
					console.log(shapes.size);
					break;
				case 'Pointer':
					//@ts-ignore
					if (shapes.has(event.target?.getAttribute('id'))) {
						//@ts-ignore
						selectedShape.set(event.target?.getAttribute('id'));
					}
					break;
				case 'Triangle':
					if (!shapes.has(current_shape_id)) {
						shapes.set(current_shape_id, {
							type: 'Triangle',
							points: [{ x: art_board_cursor.x, y: art_board_cursor.y }]
						});
					}
					break;
				case 'Square':
					if (!shapes.has(current_shape_id)) {
						shapes.set(current_shape_id, {
							type: 'Square',
							points: [{ x: art_board_cursor.x, y: art_board_cursor.y }]
						});
					}
					break;
				default:
					// Do nothing
					break;
			}
		}
	};

	const handle_mouse_move = (event: MouseEvent) => {
		// console.log(event);

		// Set user cursor position
		set_user_cursor_position(event.pageX, event.pageY);

		if (mouse_cliked) {
			set_art_board_cursor(event.pageX, event.pageY);

			switch ($selectedCursor) {
				case 'Pen':
					// Handle the bezier move here.
					break;
				case 'Pointer':
					break;
				case 'Triangle':
					if (mse_clk_temp && mouse_cliked) {
						let _shape = shapes.get(current_shape_id) as Shape;
						if (event.ctrlKey /**Do Snaping to pefect square*/) {
							let x_len = Math.sqrt((_shape.points[0].x - art_board_cursor.x) ** 2);
							let y_len = Math.sqrt((_shape.points[0].y - art_board_cursor.y) ** 2);

							if (x_len < y_len) {
								// Snap to pefect square on X axis
								_shape.points[1] = {
									x: art_board_cursor.x,
									y: art_board_cursor.y - (y_len - x_len)
								};
							} else {
								// Snap to pefect square on Y axis
								_shape.points[1] = {
									x: art_board_cursor.x - (x_len - y_len),
									y: art_board_cursor.y
								};
							}
						} else {
							// Don't snap
							_shape.points[1] = { x: art_board_cursor.x, y: art_board_cursor.y };
						}
						shapes.set(current_shape_id, _shape);
						shapes = shapes;
					}
					break;
				case 'Square':
					if (mse_clk_temp && mouse_cliked) {
						let _shape = shapes.get(current_shape_id) as Shape;
						if (event.ctrlKey /**Do Snaping to pefect square*/) {
							let x_len = Math.sqrt((_shape.points[0].x - art_board_cursor.x) ** 2);
							let y_len = Math.sqrt((_shape.points[0].y - art_board_cursor.y) ** 2);

							if (x_len < y_len) {
								// Snap to pefect square on X axis
								_shape.points[1] = {
									x: art_board_cursor.x,
									y: art_board_cursor.y - (y_len - x_len)
								};
							} else {
								// Snap to pefect square on Y axis
								_shape.points[1] = {
									x: art_board_cursor.x - (x_len - y_len),
									y: art_board_cursor.y
								};
							}
						} else {
							// Don't snap
							_shape.points[1] = { x: art_board_cursor.x, y: art_board_cursor.y };
						}

						shapes.set(current_shape_id, _shape);
						shapes = shapes;
					}
					break;
				default:
					// Do nothing
					break;
			}
			// console.log(shapes);
		}
	};

	const handle_mouse_up = (event: MouseEvent) => {
		mse_clk_temp = false;
		console.log(event);

		switch ($selectedCursor) {
			case 'Pen':
				if (event.ctrlKey) {
					event.preventDefault();
					// Release pen when mouse wheel is clicked
					console.log('Pen mode selected');
					mouse_cliked = false;
				} else {
					console.log(event.button);
				}
				break;
			case 'Pointer':
				mouse_cliked = false;
				break;
			case 'Triangle':
				mouse_cliked = false;
				break;
			case 'Square':
				mouse_cliked = false;
				break;
			default:
				// Do nothing
				break;
		}
	};

	const set_art_board_cursor = (pageX: number, pageY: number) => {
		(art_board_cursor.x = pageX - art_board_properties.x + main_board.scrollLeft),
			(art_board_cursor.y = pageY - art_board_properties.y + main_board.scrollTop);
	};
	const set_user_cursor_position = (pageX: number, pageY: number) => {
		(cursor_pointer.x = pageX), (cursor_pointer.y = pageY);
		cursorPosition.set({ x: cursor_pointer.x, y: cursor_pointer.y });
	};

	const handle_escape = (event: KeyboardEvent) => {
		console.log(event);
	};

	onMount(() => {
		window.addEventListener('keyup', (event: KeyboardEvent) => {
			if(event.code == "Escape"){
				mouse_cliked = false
			}
		});
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main
	on:mousedown={handle_mouse_down}
	on:mouseup={handle_mouse_up}
	on:mousemove={handle_mouse_move}
	class="art-board cursor-crosshair w-full h-full overflow-scroll relative flex-1 p-10"
>
	<svg
		id="ArtBoard"
		class="bg-white h-[800px] w-[1300px] relative top-[50%] translate-y-[-50%]"
		style="margin: 0 auto;"
	>
		<circle cx={art_board_cursor.x} cy={art_board_cursor.y} r="15" fill="none" stroke="indigo" />
		{#each shapesDraw as { id, type, points } (id)}
			{#if type == 'Pen'}
				<path
					{id}
					d={generatePenPath(points)}
					stroke="black"
					fill={generateColor()}
					class={$selectedShape == id ? 'outline-1 outline-fuchsia-600 outline-dashed' : ''}
				/>
			{/if}

			{#if type == 'Square' && (points.length > 1 || points.length == 2)}
				<path
					{id}
					d={generateSquarePath(points)}
					stroke="black"
					fill={generateColor()}
					class={$selectedShape == id ? 'outline-1 outline-fuchsia-600 outline-dashed' : ''}
				/>
			{/if}

			{#if type == 'Triangle' && (points.length > 1 || points.length == 2)}
				<path
					{id}
					d={generateTrianglePath(points)}
					stroke="black"
					fill={generateColor()}
					class={$selectedShape == id ? 'outline-1 outline-fuchsia-600 outline-dashed' : ''}
				/>
			{/if}
		{/each}
	</svg>
</main>

<style>
	.art-board::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background: rgb(35, 35, 37);
		appearance: none;
	}

	.art-board::-webkit-scrollbar-thumb {
		background: grey;
		cursor: grab;
	}

	.art-board::-webkit-scrollbar-track {
		width: 10px;
		height: 10px;
		/* background: red; */
	}
</style>
