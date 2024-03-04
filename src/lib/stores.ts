import { writable } from "svelte/store";
import type { Cursors, Shape, ShapesDrawn } from "./types";



export const selectedCursor = writable<Cursors>("Pointer");

export const cursorPosition = writable({x: 0, y: 0})

export const selectedShape = writable<string>();

export const selectedLayer = writable();

export const shapes = writable<Map<string, Shape>>(new Map());

export const shapesDrawn = writable<ShapesDrawn[]>()



// ArtBoard Stores 
export const penPointsActiveNumber = writable<number>()