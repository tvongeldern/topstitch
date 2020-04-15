import {
	derive,
	endOfLineSegment,
	pythagoreanTheoremSolver,
} from "@utils";
import { MAGIC_RATIO } from '@constants';

const defaultShoulderNeckYOffset = ({ _chestWidth }) => Math.round(0.05 * _chestWidth);
const defaultShoulderArmpitXOffset = ({ _chestWidth }) => Math.round(0.1 * _chestWidth);
const defaultNecklineFrontDip = ({ _chestWidth }) => Math.round(0.1 * _chestWidth);
const defaultNecklineBackDip = ({ _chestWidth }) => Math.round(0.05 * _chestWidth);

function deriveChestWidth({ waistWidth, hipWidth, shoulderWidth }) {
	return hipWidth || shoulderWidth || waistWidth;
}

function deriveHipWidth({ _chestWidth }) {
	return _chestWidth;
}

function deriveWaistWidth({ _hipWidth }) {
	return _hipWidth;
}

function deriveArmpitHeight({ _chestWidth, _hipToNeckHeightBack }) {
	if (_hipToNeckHeightBack) {
		return _hipToNeckHeightBack / MAGIC_RATIO;
	}
	return Math.round((_chestWidth * MAGIC_RATIO) / 2);
}

function deriveSleeveLengthOuter({ _chestWidth }) {
	return _chestWidth / 2;
}

function deriveHipToNeckHeightFront({
	hipToNeckHeightBack,
	hipToNeckHeightSide,
	_chestWidth
}) {
	if (hipToNeckHeightBack) {
		return hipToNeckHeightBack - defaultNecklineBackDip({ _chestWidth });
	}
	if (hipToNeckHeightSide) {
		return hipToNeckHeightSide - defaultNecklineFrontDip({ _chestWidth });
	}
}

function deriveHipToNeckHeightBack({
	hipToNeckHeightSide,
	hipToNeckHeightFront,
	_chestWidth,
}) {
	if (hipToNeckHeightSide) {
		return hipToNeckHeightSide - defaultNecklineBackDip({ _chestWidth });
	}
	if (hipToNeckHeightFront) {
		return hipToNeckHeightFront + defaultNecklineBackDip({ _chestWidth });
	}
}

function deriveHipToNeckHeightSide({
	hipToNeckHeightBack,
	hipToNeckHeightFront,
	_chestWidth,
}) {
	if (hipToNeckHeightBack) {
		return hipToNeckHeightBack + defaultNecklineBackDip({ _chestWidth });
	}
	if (hipToNeckHeightFront) {
		return hipToNeckHeightFront + defaultNecklineFrontDip({ _chestWidth });
	}
}

/**
 * Offsets
 */

function deriveArmpitShoulderOffset({
	shoulderWidth,
	sleeveWidthShoulder,
	_chestWidth,
	_armpitHeight,
	_hipToNeckHeightBack,
}) {
	if (shoulderWidth && sleeveWidthShoulder) {
		const x = (shoulderWidth - _chestWidth) / 2;
		const { b: y } = pythagoreanTheoremSolver({
			a: x,
			c: sleeveWidthShoulder,
		});
		return { x, y };
	}
	const neckHeight = _hipToNeckHeightBack || (_armpitHeight * MAGIC_RATIO);
	const y = neckHeight - _armpitHeight - defaultShoulderNeckYOffset({ _chestWidth });
	if (shoulderWidth) {
		const x = (shoulderWidth - _chestWidth) / 2;
		return { x, y };
	}
	if (sleeveWidthShoulder) {
		const { a: x } = pythagoreanTheoremSolver({
			b: y,
			c: sleeveWidthShoulder,
		});
		return { x, y };
	}
	const _shoulderWidth = _chestWidth + defaultShoulderArmpitXOffset({ _chestWidth });
	const x = (_shoulderWidth - _chestWidth) / 2;
	return { x, y };
}

function deriveShoulderNeckOffset({
	neckWidth,
	neckToShoulderLength,
	_hipToNeckHeightSide,
	_armpitHeight,
	_chestWidth,
	armpitShoulderOffset,
}) {
	const shoulderXfromMiddle = (_chestWidth / 2) + armpitShoulderOffset.x;
	if (neckWidth && _hipToNeckHeightSide) {
		const shoulderYfromBottom = _armpitHeight + armpitShoulderOffset.y;
		return {
			x: (neckWidth / 2) - shoulderXfromMiddle,
			y: _hipToNeckHeightSide - shoulderYfromBottom,
		};
	}
	if (neckToShoulderLength && _hipToNeckHeightSide) {
		const x = (neckWidth / 2) - shoulderXfromMiddle;
		const { b: y } = pythagoreanTheoremSolver({
			a: x,
			c: neckToShoulderLength,
		});
		return { x, y };
	}
	if (neckWidth && neckToShoulderLength) {
		const neckXfromMiddle = neckWidth / 2;
		const x = neckXfromMiddle - shoulderXfromMiddle;
		const { b: y } = pythagoreanTheoremSolver({
			a: x,
			c: neckToShoulderLength,
		});
		return { x, y };
	}
	if (neckWidth) {
		const x = (neckWidth / 2) - shoulderXfromMiddle;
		const y = defaultShoulderNeckYOffset({ _chestWidth });
		return { x, y };
	}
	const defaultNeckWidth = (_chestWidth / 2);
	const neckXfromMiddle = defaultNeckWidth / 2;
	const x = neckXfromMiddle - shoulderXfromMiddle;
	if (neckToShoulderLength) {
		const { b: y } = pythagoreanTheoremSolver({
			a: x,
			c: neckToShoulderLength,
		});
		return { x, y };
	}
	if (_hipToNeckHeightSide) {
		const shoulderYfromBottom = _armpitHeight + armpitShoulderOffset.y;
		return {
			x,
			y: _hipToNeckHeightSide - shoulderYfromBottom,
		};
	}
	return { x, y: defaultShoulderNeckYOffset({ _chestWidth }) };
}

function deriveNecklineOffsets({
	_hipToNeckHeightBack,
	_hipToNeckHeightFront,
	_hipToNeckHeightSide,
	_chestWidth
}) {
	return [
		{
			y: _hipToNeckHeightSide - _hipToNeckHeightFront || defaultNecklineFrontDip({ _chestWidth }),
		},
		{
			y: _hipToNeckHeightSide - _hipToNeckHeightBack || defaultNecklineBackDip({ _chestWidth }),
		},
	];
}

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
	hipWidth,
	waistWidth,
	chestWidth,
	shoulderWidth,
	neckWidth,
	hipToArmpitHeight,
	hipToNeckHeightFront,
	hipToNeckHeightBack,
	hipToNeckHeightSide,
	sleeveLengthOuter,
	sleeveWidthElbow,
	sleeveWidthShoulder,
	neckToShoulderLength,
}) {
	// Derive measurements
	const _chestWidth = derive(deriveChestWidth, { waistWidth, hipWidth, shoulderWidth }, chestWidth);
	const _hipWidth = derive(deriveHipWidth, { _chestWidth }, hipWidth);
	const _waistWidth = derive(deriveWaistWidth, { _hipWidth }, waistWidth);
	const _sleeveLengthOuter = derive(deriveSleeveLengthOuter, { _chestWidth }, sleeveLengthOuter);
	const _hipToNeckHeightFront = derive(
		deriveHipToNeckHeightFront,
		{
			hipToNeckHeightBack,
			hipToNeckHeightSide,
			_chestWidth,
		},
		hipToNeckHeightFront,
	);
	const _hipToNeckHeightBack = derive(
		deriveHipToNeckHeightBack,
		{
			hipToNeckHeightSide,
			hipToNeckHeightFront,
			_chestWidth,
		},
		hipToNeckHeightBack,
	);
	const _hipToNeckHeightSide = derive(
		deriveHipToNeckHeightSide,
		{
			hipToNeckHeightBack,
			hipToNeckHeightFront,
			_chestWidth,
		},
		hipToNeckHeightSide,
	);
	const _armpitHeight = derive(
		deriveArmpitHeight,
		{
			_chestWidth,
			_hipToNeckHeightBack,
		},
		hipToArmpitHeight,
	);
	// offsets
	const startHipOffset = {
		x: _hipWidth / 2,
		y: 0,
	};
	const hipWaistOffset = {
		x: (_waistWidth - _hipWidth) / 2,
		y: _armpitHeight / 2,
	};
	const waistArmpitOffset = {
		x: (_chestWidth - _waistWidth) / 2,
		y: _armpitHeight / 2,
	};
	const armpitShoulderOffset = derive(
		deriveArmpitShoulderOffset,
		{
			shoulderWidth,
			sleeveWidthShoulder,
			_chestWidth,
			_armpitHeight,
			_hipToNeckHeightBack,
		},
	);
	const shoulderNeckOffset = derive(
		deriveShoulderNeckOffset,
		{
			neckWidth,
			neckToShoulderLength,
			_hipToNeckHeightSide,
			_armpitHeight,
			_chestWidth,
			armpitShoulderOffset,
		},
	);
	const [necklineFrontOffset, necklineBackOffset] = derive(
		deriveNecklineOffsets,
		{
			_hipToNeckHeightBack,
			_hipToNeckHeightFront,
			_hipToNeckHeightSide,
			_chestWidth,
		},
	);
	const shoulderElbowOuterOffset = derive(
		deriveShoulderElbowOuterOffset,
		{ _sleeveLengthOuter },
	);
	const _sleeveWidthElbow = derive(
		deriveSleeveWidthElbow,
		{
			sleeveWidthShoulder,
			armpitShoulderOffset,
		},
		sleeveWidthElbow,
	);
	const elbowOuterInnerOffset = derive(
		deriveElbowOuterInnerOffset,
		{
			_sleeveWidthElbow
		},
	);
	return {
		startHipOffset,
		hipWaistOffset,
		waistArmpitOffset,
		armpitShoulderOffset,
		shoulderNeckOffset,
		necklineFrontOffset,
		necklineBackOffset,
		shoulderElbowOuterOffset,
		elbowOuterInnerOffset,
	};
}
