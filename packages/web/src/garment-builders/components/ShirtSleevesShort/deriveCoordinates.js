import { errorActionReducer, symmetricalCoordinates  } from '@utils';

export function deriveCoordinates({
	coordinates: {
		shoulderLeft,
		shoulderRight,
	},
	offsets: {
		shoulderElbowOuterOffset,
		elbowOuterInnerOffset,
	},
}) {
	const [elbowOuterLeft, elbowOuterRight] = symmetricalCoordinates(
		shoulderLeft,
		shoulderRight,
		shoulderElbowOuterOffset,
	);

	const [elbowInnerLeft, elbowInnerRight] = symmetricalCoordinates(
		elbowOuterLeft,
		elbowOuterRight,
		elbowOuterInnerOffset,
	);
	return {
		elbowOuterLeft,
		elbowOuterRight,
		elbowInnerLeft,
		elbowInnerRight,
	};
}
