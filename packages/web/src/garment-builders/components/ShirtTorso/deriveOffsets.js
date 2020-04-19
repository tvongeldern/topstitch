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

/**
 * Derive coordinate offsets based on provided measurements
 * @param {props} param
 */
export function deriveOffsets({
	measurements: {
		shoulderWidth,
		neckWidth,
		sleeveWidthShoulder,
		neckToShoulderLength,
		_chestWidth,
		_hipWidth,
		_waistWidth,
		_hipToNeckHeightFront,
		_hipToNeckHeightSide,
		_hipToNeckHeightBack,
		_armpitHeight,
	},
}) {
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
	return {
		startHipOffset,
		hipWaistOffset,
		waistArmpitOffset,
		armpitShoulderOffset,
		shoulderNeckOffset,
		necklineFrontOffset,
		necklineBackOffset,
	};
}
