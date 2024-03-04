import { writable } from "svelte/store";
import type { Shape, ShapesDrawn } from "./types";



export const selectedCursor = writable<string>("Pointer");

export const cursorPosition = writable({x: 0, y: 0})

export const selectedShape = writable<string>();

export const selectedLayer = writable();

export const shapes = writable<Map<string, Shape>>(new Map());

export const shapesDrawn = writable<ShapesDrawn[]>()