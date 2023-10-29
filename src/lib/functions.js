export function generateKey() {
	return `AA${Math.floor(Math.random() * 1000000)}`;
}

/**
 * @param {[{
 *          x: number,
 *          y: number
 *      }]} Points
 * @returns {string}
 */
export function generatePenPath(Points) {
	let d = 'M';
	for (let i = 0; i < Points.length; i++) {
		if (i == 0) {
			d += Points[i].x + ' ' + Points[i].y + ' ';
		} else {
			d += 'L';
			d += Points[i].x + ' ' + Points[i].y + ' ';
		}
	}
	// console.log(d.trim(), d);
	return d.trim() + 'z';
}

/**
 * @param {[{
 *          x: number,
 *          y: number
 *      }]} Points
 * @returns {string}
 */
export function generateSquarePath(Points) {
	let d = '';

	if (Points.length > 0) {
		// @ts-ignore
		d = `M ${Points[0].x} ${Points[0].y} L${Points[1].x} ${Points[0].y} L${Points[1].x} ${Points[1].y} L${Points[0].x} ${Points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}

/**
 * @param {[
 * 			{
 *          	x: number,
 *          	y: number
 *      	}
 * 		]} Points
 * @returns {string}
 */
export function generateTrianglePath(Points) {
	let d = '';

	if (Points.length > 0) {
		// @ts-ignore
		d = `M ${(Points[0].x + Points[1].x)/2} ${Points[0].y} L${Points[1].x} ${Points[1].y} L${Points[0].x} ${Points[1].y}`;
		return d.trim() + 'z';
	}
	return '';
}

/**
 * @returns {string}
 */
export function generateColor() {
	return `rgb(${randomNumber_255()},${randomNumber_255()},${randomNumber_255()})`;
}

/**
 *
 * @returns {number}
 */
function randomNumber_255() {
	return Math.floor(Math.random() * 255);
}
