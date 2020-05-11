import { errorActionReducer, derive  } from '@utils';

function deriveSleeveLengthOuter({ _chestWidth }) {
	return _chestWidth / 2;
}

export function deriveMeasurements({
	sleeveLengthOuter,
	_chestWidth
}) {
	const _sleeveLengthOuter = derive(
		deriveSleeveLengthOuter,
		{ _chestWidth },
		sleeveLengthOuter,
	);
	return { _sleeveLengthOuter };
}
