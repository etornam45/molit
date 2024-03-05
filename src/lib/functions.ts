import type { Point } from "./types";

export function generateKey(): string {
	return `AA${Math.floor(Math.random() * 1000000)}`;
}

export function generateColor(): string {
	const color = `rgb(${randomNumber_255()},${randomNumber_255()},${randomNumber_255()})`;
	return color
}


function randomNumber_255(): number {
	return Math.floor(Math.random() * 255);
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
		d = `M ${points[0].x} ${points[0].y} L${points[1].x} ${points[0].y} L${points[1].x} ${points[1].y} L${points[0].x} ${points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}

export function generateTrianglePath(points: Point[]): string {
	let d = '';

	if (points.length > 0) {
		d = `M ${(points[0].x + points[1].x) / 2} ${points[0].y} L${points[1].x} ${points[1].y} L${points[0].x} ${points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}


export function generatePentagonPath(points: Point[]): string {
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2; // Radius of the circumscribed circle
	const angle = (2 * Math.PI) / 5; // Angle between each side of the pentagon

	if (points.length > 0) {
		let d = `M ${points[0].x + radius * Math.cos(0)} ${points[0].y + radius * Math.sin(0)}`;
		for (let i = 1; i <= 5; i++) {
			const x = points[0].x + radius * Math.cos(i * angle);
			const y = points[0].y + radius * Math.sin(i * angle);
			d += ` L${x} ${y}`;
		}
		return d.trim() + "z";
	}
	return "";
}


export function generateHexagonPath(points: Point[]): string {
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2; // Radius of the circumscribed circle
	const angle = (2 * Math.PI) / 6; // Angle between each side of the hexagon

	if (points.length > 0) {
		let d = `M ${points[0].x + radius * Math.cos(0)} ${points[0].y + radius * Math.sin(0)}`;
		for (let i = 1; i <= 6; i++) {
			const x = points[0].x + radius * Math.cos(i * angle);
			const y = points[0].y + radius * Math.sin(i * angle);
			d += ` L${x} ${y}`;
		}
		return d.trim() + "z";
	}
	return "";
}

export function generateHeptagonPath(points: Point[]): string {
	const angle = (2 * Math.PI) / 7; // Angle between each side of the heptagon
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2; // Radius of the circumscribed circle

	if (points.length > 0) {
		let d = `M ${points[0].x + radius * Math.cos(0)} ${points[0].y + radius * Math.sin(0)}`;
		for (let i = 1; i <= 7; i++) {
			const x = points[0].x + radius * Math.cos(i * angle);
			const y = points[0].y + radius * Math.sin(i * angle);
			d += ` L${x} ${y}`;
		}
		return d.trim() + "z";
	}
	return "";
}

export function generateCirclePath(points: Point[]): string {
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2; // Radius of the circumscribed circle
	if (points.length > 0) {
		const d = `M ${points[0].x + radius} ${points[0].y} A${radius} ${radius} 0 1 0 ${points[0].x - radius} ${points[0].y} A${radius} ${radius} 0 1 0 ${points[0].x + radius} ${points[0].y}`;
		return d.trim() + "z";
	}
	return "";
}