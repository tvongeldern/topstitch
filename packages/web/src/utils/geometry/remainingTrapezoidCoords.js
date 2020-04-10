// https://stackoverflow.com/questions/61140525/how-to-infer-the-possible-values-for-the-final-two-coordinates-of-a-trapezoid-wh/61144029#61144029

//        L3
//    D  ____ C
//      /    \
//  L4 /      \ L2
//     --------
//  	A    L1    B

const square = (num) => Math.pow(num, 2);

/**
 * This is for a vertical trapezoid, gotta reverse axes for a sideways one
 * @param {[{ x, y }, { x, y }, knownCoordsBaseLength, unknownCoordsBaseLength, side1length, side2length]} param
 */
export function remainingTrapezoidCoords({
	A,
	B,
	L1,
	L2,
	L3,
	L4,
}) {
	const sidesDiffSqrd = square(L4) - square(L2);
	const baseDiffs = L3 - L1;
	const diffsRatio = sidesDiffSqrd / baseDiffs;
	const a = (baseDiffs + diffsRatio) / 2;
	const b = (baseDiffs - diffsRatio) / 2;

	const height = Math.sqrt(square(L4) - square(a));

	return [
		{
			A, B, L1, L2, L3, L4,
			C: { x: a, y: h }, // => expressed as diff from original
			D: { x: L1 - b, y: h}, // => expressed as diff from original
		},
		{
			A, B, L1, L2, L3, L4,
			C: { x: a, y: -h }, // => expressed as diff from original
			D: { x: L1 - b, y: -h }, // => expressed as diff from original
		},
	];
}
