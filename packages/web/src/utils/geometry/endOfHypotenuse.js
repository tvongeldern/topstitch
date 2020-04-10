const square = (num) => Math.pow(num, 2);

// https://www.geeksforgeeks.org/find-points-at-a-given-distance-on-a-line-of-given-slope/

export function endOfHypotenuse({
	point: { x, y },
	distance,
	slope,
	options: { inverseX, inverseY } = {},
}) {
	const distanceX = (distance / Math.sqrt(1 + (slope * slope)));
	const distanceY = slope * distanceX;
	return {
		y: inverseY ? y - distanceY : y + distanceY,
		x: inverseX ? x - distanceX : x + distanceX,
	};
}
