import { pythagoreanTheoremSolver } from "@utils";

const MAGIC_RATIO = 1.6180339887;
const DEFAULT_SHOULDER_NECK_Y_OFFSET = 2;
const DEFAULT_SHOULDER_ARMPIT_X_OFFSET = 4;
const DEFAULT_NECK_WIDTH_SHOULDER_STRIP_OFFSET = 4;

function derive(deriver, basis, defaultValue) {
	if (defaultValue) {
		return defaultValue;
	}
	return deriver(basis);
}

function deriveChestWidth({ waistWidth, hipWidth, shoulderWidth }) {
	return hipWidth || shoulderWidth || waistWidth;
}

function deriveHipWidth({ _chestWidth }) {
	return _chestWidth;
}

function deriveWaistWidth({ _hipWidth }) {
	return _hipWidth;
}

function deriveArmpitHeight({ _chestWidth }) {
	return Math.round((_chestWidth * MAGIC_RATIO) / 2);
}

function deriveHipToNeckHeightFront({
	hipToNeckHeightBack,
	hipToNeckHeightSide,
}) {
	if (hipToNeckHeightBack) {
		return hipToNeckHeightBack - 2;
	}
	if (hipToNeckHeightSide) {
		return hipToNeckHeightSide - 4;
	}
}

function deriveHipToNeckHeightBack({
	hipToNeckHeightSide,
	hipToNeckHeightFront,
}) {
	if (hipToNeckHeightSide) {
		return hipToNeckHeightSide - 2;
	}
	if (hipToNeckHeightFront) {
		return hipToNeckHeightFront + 2;
	}
}

function deriveHipToNeckHeightSide({
	hipToNeckHeightBack,
	hipToNeckHeightFront,
}) {
	if (hipToNeckHeightBack) {
		return hipToNeckHeightBack + 2;
	}
	if (hipToNeckHeightFront) {
		return hipToNeckHeightFront + 4;
	}
}

function deriveNeckWidth({
	neckToShoulderLength,
	_chestWidth,
}) {
	if (neckToShoulderLength) {
		return neckToShoulderLength + DEFAULT_SHOULDER_NECK_Y_OFFSET;
	}
	return _chestWidth / 2;
}


function deriveArmpitShoulderOffset({
	shoulderWidth,
	sleeveWidthShoulder,
	neckWidth,
	neckToShoulderLength,
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
	const y = neckHeight - _armpitHeight - DEFAULT_SHOULDER_NECK_Y_OFFSET;
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
	const _shoulderWidth = _chestWidth + DEFAULT_SHOULDER_ARMPIT_X_OFFSET;
	const x = (_shoulderWidth - _chestWidth) / 2;
	return { x, y };
}

// function deriveShoulderNeckOffset({
// 	neckWidth,
// 	neckToShoulderLength,
// 	_hipToNeckHeightSide,
// 	_armpitHeight,
// 	_chestWidth,
// 	_neckWidth,
// 	armpitShoulderOffset,
// }) {
// 	const shoulderXfromMiddle = (_chestWidth / 2) + armpitShoulderOffset.x;
// 	if (neckWidth && neckToShoulderLength) {
// 		const x = shoulderXfromMiddle - (neckWidth / 2);
// 		const { b: y } = pythagoreanTheoremSolver({
// 			a: x,
// 			c: neckToShoulderLength,
// 		})
// 		return { x, y };
// 	}
// 	if (neckWidth && _hipToNeckHeightSide) {
// 		const x = shoulderXfromMiddle - (neckWidth / 2);
// 		const y = _hipToNeckHeightSide - _armpitHeight - armpitShoulderOffset.y;
// 		return { x, y };
// 	}
// 	if (neckToShoulderLength && _hipToNeckHeightSide) {
// 		const y = _hipToNeckHeightSide - _armpitHeight - armpitShoulderOffset.y;
// 		const { b: x } = pythagoreanTheoremSolver({
// 			a: y,
// 			c: neckToShoulderLength,
// 		});
// 		return { x, y };
// 	}
// 	if (neckWidth) {

// 	}
// }

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
	const _armpitHeight = derive(deriveArmpitHeight, { _chestWidth }, hipToArmpitHeight);
	const _hipToNeckHeightFront = derive(
		deriveHipToNeckHeightFront,
		{
			hipToNeckHeightBack,
			hipToNeckHeightSide,
		},
		hipToNeckHeightFront,
	);
	const _hipToNeckHeightBack = derive(
		deriveHipToNeckHeightBack,
		{
			hipToNeckHeightSide,
			hipToNeckHeightFront,
		},
		hipToNeckHeightBack,
	);
	const _hipToNeckHeightSide = derive(
		deriveHipToNeckHeightSide,
		{
			hipToNeckHeightBack,
			hipToNeckHeightFront,
		},
		hipToNeckHeightSide,
	);
	const _neckWidth = derive(
		deriveNeckWidth,
		{
			neckToShoulderLength,
			_chestWidth,
		},
		neckWidth,
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
	// const shoulderNeckOffset = derive(
	// 	deriveShoulderNeckOffset,
	// 	{}
	// );
	return {
		startHipOffset,
		hipWaistOffset,
		waistArmpitOffset,
		armpitShoulderOffset,
	};
}
