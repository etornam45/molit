import type { Point } from "./types";

export function generateKey(): string {
	return `AA${Math.floor(Math.random() * 1000000)}`;
}


export function generatePenPath(points: Point[]): string {
	let d = 'M';
	for (let i = 0; i < points.length; i++) {
		if (i == 0) {
			d += points[i].x + ' ' + points[i].y + ' ';
		} else {
			d += 'L';
			d += points[i].x + ' ' + points[i].y + ' ';
		}
	}
	// console.log(d.trim(), d);
	return d.trim() + 'z';
}

export function generateSquarePath(points: Point[]): string {
	let d = '';

	if (points.length > 0) {
		// @ts-ignore
		d = `M ${points[0].x} ${points[0].y} L${points[1].x} ${points[0].y} L${points[1].x} ${points[1].y} L${points[0].x} ${points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}

export function generateTrianglePath(points: Point[]): string {
	let d = '';

	if (points.length > 0) {
		// @ts-ignore
		d = `M ${(points[0].x + points[1].x)/2} ${points[0].y} L${points[1].x} ${points[1].y} L${points[0].x} ${points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}


export function generateColor(): string {
	const color =  `rgb(${randomNumber_255()},${randomNumber_255()},${randomNumber_255()})`;
	return color
}


function randomNumber_255(): number {
	return Math.floor(Math.random() * 255);
}
