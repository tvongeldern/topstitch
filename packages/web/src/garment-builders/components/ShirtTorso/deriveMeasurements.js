import { derive } from "@utils";
import { MAGIC_RATIO } from '@constants';

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

export function deriveMeasurements({
	hipToArmpitHeight,
	hipToNeckHeightFront,
	hipToNeckHeightBack,
	hipToNeckHeightSide,
	hipWidth,
	waistWidth,
	chestWidth,
	shoulderWidth,
}) {
	// Derive measurements
	const _chestWidth = derive(deriveChestWidth, { waistWidth, hipWidth, shoulderWidth }, chestWidth);
	const _hipWidth = derive(deriveHipWidth, { _chestWidth }, hipWidth);
	const _waistWidth = derive(deriveWaistWidth, { _hipWidth }, waistWidth);
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
	return {
		_chestWidth,
		_hipWidth,
		_waistWidth,
		_hipToNeckHeightFront,
		_hipToNeckHeightSide,
		_hipToNeckHeightBack,
		_armpitHeight,
	};
}
