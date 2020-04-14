// copied from https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci

/**
 * Find the intersection points of two circles
 * @param {[{ x, y }, length ]} circle1
 * @param {[{ x, y }, length ]} circle2
 */
export function circleIntersections(circle1, circle2) {
	const [{ x: x0, y: y0 }, r0] = circle1;
	const [{ x: x1, y: y1 }, r1] = circle2;

	/* dx and dy are the vertical and horizontal distances between
	 * the circle centers.
	 */
	const dx = x1 - x0;
	const dy = y1 - y0;

	/* Determine the straight-line distance between the centers. */
	const d = Math.sqrt((dy * dy) + (dx * dx));

	/* Check for solvability. */
	if (d > (r0 + r1)) {
		/* no solution. circles do not intersect. */
		return []; // returns empty array for safer typing
	}
	if (d < Math.abs(r0 - r1)) {
		/* no solution. one circle is contained in the other */
		return []; // returns empty array for safer typing
	}

	/* 'point 2' is the point where the line through the circle
	 * intersection points crosses the line between the circle
	 * centers.  
	 */

	/* Determine the distance from point 0 to point 2. */
	const a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

	/* Determine the coordinates of point 2. */
	const x2 = x0 + (dx * a / d);
	const y2 = y0 + (dy * a / d);

	/* Determine the distance from point 2 to either of the
	 * intersection points.
	 */
	const h = Math.sqrt((r0 * r0) - (a * a));

	/* Now determine the offsets of the intersection points from
	 * point 2.
	 */
	const rx = -dy * (h / d);
	const ry = dx * (h / d);

	/* Determine the absolute intersection points. */
	const xi = x2 + rx;
	const xi_prime = x2 - rx;
	const yi = y2 + ry;
	const yi_prime = y2 - ry;

	return [
		{
			x: xi,
			y: yi,
		},
		{
			x: xi_prime,
			y: yi_prime,
		},
	];
}
