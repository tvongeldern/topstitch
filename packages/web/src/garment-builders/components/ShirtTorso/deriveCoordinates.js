import { symmetricalCoordinates } from '@utils';

export function deriveCoordinates({
	offsets: {
		startHipOffset,
		hipWaistOffset,
		waistArmpitOffset,
		armpitShoulderOffset,
		shoulderNeckOffset,
	},
	bounds: {
		maxHeight,
		size,
	},
}) {
	const middle = size / 2;
	const start = {
		x: middle,
		y: middle + (maxHeight / 2),
	};

	const hipLeft = {
		x: start.x - startHipOffset.x,
		y: start.y - startHipOffset.y,
	};
	const hipRight = {
		x: start.x + startHipOffset.x,
		y: start.y - startHipOffset.y,
	};

	const [waistLeft, waistRight] = symmetricalCoordinates(
		hipLeft,
		hipRight,
		hipWaistOffset,
	);

	const [armpitLeft, armpitRight] = symmetricalCoordinates(
		waistLeft,
		waistRight,
		waistArmpitOffset,
	);

	const [shoulderLeft, shoulderRight] = symmetricalCoordinates(
		armpitLeft,
		armpitRight,
		armpitShoulderOffset,
	);

	const [neckLeft, neckRight] = symmetricalCoordinates(
		shoulderLeft,
		shoulderRight,
		shoulderNeckOffset,
	);

	return {
		start,
		hipLeft,
		hipRight,
		waistLeft,
		waistRight,
		armpitLeft,
		armpitRight,
		shoulderLeft,
		shoulderRight,
		neckLeft,
		neckRight,
	};
}
