/**
 * Given starting points and offset,
 * provides coordinates of (horizontally) symmetrical
 * application of the offset
 * @param {{ x, y }} leftSide
 * @param {{ x, y }} rightSide
 * @param {{ x, y }} offset
 */
export function symmetricalCoordinates(leftSide, rightSide, offset) {
	return [
		{ // left
			x: leftSide.x - offset.x,
			y: leftSide.y - offset.y,
		},
		{ // right
			x: rightSide.x + offset.x,
			y: rightSide.y - offset.y,
		},
	];
}
