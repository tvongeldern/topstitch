// https://www.geeksforgeeks.org/find-points-at-a-given-distance-on-a-line-of-given-slope/

/**
 * Provided with a starting point, length, and slope
 * Returns coordinates of the end of a line segment
 * @param {point { x, y }, distance, slope, options {inverseX, inverseY }} param
 */
export function endOfLineSegment({
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
