<script lang="ts">
	import { onMount } from 'svelte';
	import {
		cursorPosition,
		selectedCursor,
		selectedShape,
		shapesDrawn,
		penPointsActiveNumber
	} from '$lib/stores';
	import { generateColor, generateKey, generateSquarePath, generatePenPath } from '$lib';
	import { generateTrianglePath } from '$lib/functions';

	import { shapes } from '$lib/stores';
	import type { Point, Shape } from '$lib/types';
	import { CONSTANTS } from '$lib/constants';

	const cursor_pointer = { x: Number(), y: Number() };

	let mouse_cliked: boolean;
	let mse_clk_temp: boolean;
	let art_board_cursor: Point = { x: 0, y: 0 };
	let current_shape_id: string;

	let art_board_properties: DOMRect;

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
		shapesDrawn.set([]);
		$shapes.forEach(function (value, key) {
			const data = {
				id: key != undefined ? key : generateKey(),
				...value
			};

			shapesDrawn.update((shape) => {
				shape.push(data);
				return shape;
			});
		});
		console.log($shapes, $shapesDrawn);
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
					if (!$shapes.has(current_shape_id)) {
						current_shape_id = current_shape_id == undefined ? generateKey() : current_shape_id;
						shapes.update((shape) => {
							return shape.set(current_shape_id, {
								type: 'Pen',
								points: [{ x: art_board_cursor.x, y: art_board_cursor.y }],
								preferences: CONSTANTS.defaultPreferences
							});
						});
					} else {
						let _shape = $shapes.get(current_shape_id) as Shape;
						_shape?.points.push({ x: art_board_cursor.x, y: art_board_cursor.y });
						penPointsActiveNumber.set(_shape.points.length); // Off-by-one error expected

						shapes.update((shape) => {
							return shape.set(current_shape_id, _shape);
						});
					}
					console.log($shapes.size);
					break;
				case 'Pointer':
					//@ts-ignore
					if ($shapes.has(event.target?.getAttribute('id'))) {
						//@ts-ignore
						selectedShape.set(event.target?.getAttribute('id'));
					}
					break;
				case 'Triangle':
					if (!$shapes.has(current_shape_id)) {
						shapes.update((shape) => {
							return shape.set(current_shape_id, {
								type: 'Triangle',
								points: [{ x: art_board_cursor.x, y: art_board_cursor.y }],
								preferences: CONSTANTS.defaultPreferences
							});
						});
					}
					break;
				case 'Square':
					if (!$shapes.has(current_shape_id)) {
						shapes.update((shape) => {
							return shape.set(current_shape_id, {
								type: 'Square',
								points: [{ x: art_board_cursor.x, y: art_board_cursor.y }],
								preferences: CONSTANTS.defaultPreferences
							});
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
		// Set user cursor position
		set_user_cursor_position(event.pageX, event.pageY);

		if (mouse_cliked) {
			set_art_board_cursor(event.pageX, event.pageY);

			switch ($selectedCursor) {
				case 'Pen':
					const activeShape = $shapes.get(current_shape_id) as Shape;
					let points = activeShape.points;
					points[$penPointsActiveNumber] = { ...art_board_cursor };
					points = points // This is done to update it reactively. 
					shapes.update((shape) => {
						shape.set(current_shape_id, {
							type: activeShape.type,
							preferences: activeShape.preferences,
							points: points
						});
						return shape;
					});
					break;
				case 'Pointer':
					break;
				case 'Triangle':
					if (mse_clk_temp && mouse_cliked) {
						let _shape = $shapes.get(current_shape_id) as Shape;
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
						shapes.update((shape) => {
							return shape.set(current_shape_id, _shape);
						});
					}
					break;
				case 'Square':
					if (mse_clk_temp && mouse_cliked) {
						let _shape = $shapes.get(current_shape_id) as Shape;
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
							_shape.points[1] = { x: art_board_cursor.x, y: art_board_cursor.y };
						}

						shapes.update((shape) => {
							return shape.set(current_shape_id, _shape);
						});
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

	onMount(() => {
		window.addEventListener('keyup', (event: KeyboardEvent) => {
			if (event.code == 'Escape') {
				mouse_cliked = false;
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
		{#each $shapesDrawn as { id, type, preferences, points } (id)}
			{#if type == 'Pen'}
				<path
					{id}
					d={generatePenPath(points)}
					stroke={preferences.stroke.color}
					stroke-width={preferences.stroke.width}
					fill={preferences.background}
					class={$selectedShape == id ? 'outline-1 outline-fuchsia-600 outline-dashed' : ''}
				/>
			{/if}

			{#if type == 'Square' && (points.length > 1 || points.length == 2)}
				<path
					{id}
					d={generateSquarePath(points)}
					stroke={preferences.stroke.color}
					stroke-width={preferences.stroke.width}
					fill={preferences.background}
					class={$selectedShape == id ? 'outline-1 outline-fuchsia-600 outline-dashed' : ''}
				/>
			{/if}

			{#if type == 'Triangle' && (points.length > 1 || points.length == 2)}
				<path
					{id}
					d={generateTrianglePath(points)}
					stroke={preferences.stroke.color}
					stroke-width={preferences.stroke.width}
					fill={preferences.background}
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
