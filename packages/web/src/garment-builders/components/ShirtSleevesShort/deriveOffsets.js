import {
	derive,
	endOfLineSegment,
	pythagoreanTheoremSolver,
} from "@utils";
import { MAGIC_RATIO } from '@constants';

function deriveShoulderElbowOuterOffset({ _sleeveLengthOuter }) {
	return endOfLineSegment({
		point: { x: 0, y: 0 },
		distance: _sleeveLengthOuter,
		slope: MAGIC_RATIO / 2,
		options: { inverseY: true },
	});
}

function deriveSleeveWidthElbow({
	sleeveWidthShoulder,
	armpitShoulderOffset,
}) {
	if (sleeveWidthShoulder) {
		return (MAGIC_RATIO * sleeveWidthShoulder) / 2;
	}
	const { c } = pythagoreanTheoremSolver({
		a: armpitShoulderOffset.x,
		b: armpitShoulderOffset.y,
	});
	return c * MAGIC_RATIO / 2;
}

function deriveElbowOuterInnerOffset({ _sleeveWidthElbow }) {
	return endOfLineSegment({
		point: { x: 0, y: 0 },
		distance: _sleeveWidthElbow,
		slope: MAGIC_RATIO * (MAGIC_RATIO / 2),
		options: { inverseX: true, inverseY: true },
	});
}


/**
 * Derive coordinate offsets based on provided measurements
 * @param {props} param
 */
export function deriveOffsets({
	measurements: {
		sleeveWidthElbow,
		sleeveWidthShoulder,
		_sleeveLengthOuter,
	},
	offsets: {
		armpitShoulderOffset,
	},
}) {
	// derive sleeve end width if needed
	const _sleeveWidthElbow = derive(
		deriveSleeveWidthElbow,
		{
			sleeveWidthShoulder,
			armpitShoulderOffset,
		},
		sleeveWidthElbow,
	);
	// offsets
	const shoulderElbowOuterOffset = derive(
		deriveShoulderElbowOuterOffset,
		{ _sleeveLengthOuter },
	);
	const elbowOuterInnerOffset = derive(
		deriveElbowOuterInnerOffset,
		{
			_sleeveWidthElbow
		},
	);
	return {
		shoulderElbowOuterOffset,
		elbowOuterInnerOffset,
	};
}
