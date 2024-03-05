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

/**
 * Generates a pen path based on the given points.
 * 
 * @param points - An array of points representing the path of the pen.
 * @returns A string representing the SVG path of the pen.
 */
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

/**
 * Generates a square path based on the given points.
 * 
 * @param points - An array of points representing the top-left and bottom-right corners of the square.
 * @returns A string representing the SVG path of the square.
 */
export function generateSquarePath(points: Point[]): string {
	let d = '';

	if (points.length > 0) {
		d = `M ${points[0].x} ${points[0].y} L${points[1].x} ${points[0].y} L${points[1].x} ${points[1].y} L${points[0].x} ${points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}

/**
 * Generates a triangle path based on the given points.
 * 
 * @param points - An array of points representing the center and two points on the base of the triangle.
 * @returns A string representing the SVG path of the triangle.
 */
export function generateTrianglePath(points: Point[]): string {
	let d = '';

	if (points.length > 0) {
		d = `M ${(points[0].x + points[1].x) / 2} ${points[0].y} L${points[1].x} ${points[1].y} L${points[0].x} ${points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}


// Generates a pentagon path based on the given points.
// 
// @param points - An array of points representing the center and a point on the circumference of the pentagon.
// @returns A string representing the SVG path of the pentagon.
export function generatePentagonPath(points: Point[]): string {
	// Calculate the radius of the circumscribed circle
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2;

	// Calculate the angle between each side of the pentagon
	const angle = (2 * Math.PI) / 5;

	if (points.length > 0) {
		// Start the path at the first point on the circumference of the pentagon
		let d = `M ${points[0].x + radius * Math.cos(0)} ${points[0].y + radius * Math.sin(0)}`;

		// Generate the remaining points on the circumference of the pentagon
		for (let i = 1; i <= 5; i++) {
			const x = points[0].x + radius * Math.cos(i * angle);
			const y = points[0].y + radius * Math.sin(i * angle);
			d += ` L${x} ${y}`;
		}

		// Close the path
		return d.trim() + "z";
	}

	return "";
}


/**
 * Generates a hexagon path based on the given points.
 * 
 * @param points - An array of points representing the center and a point on the circumference of the hexagon.
 * @returns A string representing the SVG path of the hexagon.
 */
export function generateHexagonPath(points: Point[]): string {
	// Calculate the radius of the circumscribed circle
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2;

	// Calculate the angle between each side of the hexagon
	const angle = (2 * Math.PI) / 6;

	if (points.length > 0) {
		// Start the path at the first point on the circumference of the hexagon
		let d = `M ${points[0].x + radius * Math.cos(0)} ${points[0].y + radius * Math.sin(0)}`;

		// Generate the remaining points on the circumference of the hexagon
		for (let i = 1; i <= 6; i++) {
			const x = points[0].x + radius * Math.cos(i * angle);
			const y = points[0].y + radius * Math.sin(i * angle);
			d += ` L${x} ${y}`;
		}

		// Close the path
		return d.trim() + "z";
	}

	return "";
}


/**
 * Generates a heptagon path based on the given points.
 * 
 * @param points - An array of points representing the center and a point on the circumference of the heptagon.
 * @returns A string representing the SVG path of the heptagon.
 */
export function generateHeptagonPath(points: Point[]): string {
	// Calculate the angle between each side of the heptagon
	const angle = (2 * Math.PI) / 7;

	// Calculate the radius of the circumscribed circle
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2;

	if (points.length > 0) {
		// Start the path at the first point on the circumference of the heptagon
		let d = `M ${points[0].x + radius * Math.cos(0)} ${points[0].y + radius * Math.sin(0)}`;

		// Generate the remaining points on the circumference of the heptagon
		for (let i = 1; i <= 7; i++) {
			const x = points[0].x + radius * Math.cos(i * angle);
			const y = points[0].y + radius * Math.sin(i * angle);
			d += ` L${x} ${y}`;
		}

		// Close the path
		return d.trim() + "z";
	}

	return "";
}


/**
 * Generates a circular path based on the given points.
 * 
 * @param points - An array of points representing the center and a point on the circumference of the circle.
 * @returns A string representing the SVG path of the circle.
 */
export function generateCirclePath(points: Point[]): string {
	// Calculate the radius of the circle
	const radius = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)) / 2;

	if (points.length > 0) {
		// Generate the SVG path using the center point and the radius
		const d = `M ${points[0].x + radius} ${points[0].y} A${radius} ${radius} 0 1 0 ${points[0].x - radius} ${points[0].y} A${radius} ${radius} 0 1 0 ${points[0].x + radius} ${points[0].y}`;
		return d.trim() + "z";
	}

	return "";
}