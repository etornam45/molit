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


