import { writable } from "svelte/store";


export const selectedCursor = writable("Triangle");

export const cursorPosition = writable({x: 0, y: 0})