import { writable } from "svelte/store";



export const selectedCursor = writable("Pointer");

export const cursorPosition = writable({x: 0, y: 0})

export const selectedShape = writable();

export const selectedLayer = writable();

export const shapes = writable();