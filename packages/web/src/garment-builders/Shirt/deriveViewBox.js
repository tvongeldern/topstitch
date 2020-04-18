import { ADD_ABS } from '@utils';

export function deriveViewBox({
	offsets: {
		startHipOffset,
		hipWaistOffset,
		waistArmpitOffset,
		armpitShoulderOffset,
		shoulderNeckOffset,
		necklineFrontOffset,
		necklineBackOffset,
		shoulderElbowOuterOffset,
		elbowOuterInnerOffset,
	},
}) {
	const maxWidth = ADD_ABS(
		startHipOffset.x,
		hipWaistOffset.x,
		waistArmpitOffset.x,
		armpitShoulderOffset.x,
		shoulderElbowOuterOffset.x,
	) * 2;
	const maxHeight = ADD_ABS(
		startHipOffset.y,
		hipWaistOffset.y,
		waistArmpitOffset.y,
		armpitShoulderOffset.y,
		shoulderNeckOffset.y,
	);
	const size = Math.ceil(
		Math.max(maxWidth, maxHeight)
	) + 24;
	return {
		maxWidth,
		maxHeight,
		size,
		svgProp: [0, 0, size, size].join(' '),
	};
}
