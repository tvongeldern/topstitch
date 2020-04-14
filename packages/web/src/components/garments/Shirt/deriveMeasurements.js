function derive(deriver, basis, defaultValue) {
	if (defaultValue) {
		return defaultValue;
	}
	return deriver(basis);
}

function deriveHipWidth({ waistWidth, chestWidth, shoulderWidth }) {
	return chestWidth || shoulderWidth || waistWidth;
}

function deriveWaistWidth({ _hipWidth }) {
	return _hipWidth;
}

function deriveChestWidth({ _hipWidth }) {
	return _hipWidth;
}

function deriveHipToArmpitHeight({ _chestWidth }) {
	return Math.round(0.8 * _chestWidth);
}

function deriveHipToNeckHeightSide({ _hipToNeckHeightFront }) {
	if (_hipToNeckHeightFront) {
		return _hipToNeckHeightFront + 4;
	}
}

function deriveHipToNeckHeightFront({
	hipToNeckHeightBack,
	hipToNeckHeightSide,
}) {
	if (hipToNeckHeightBack){
		return hipToNeckHeightBack - 2;
	}
	if (hipToNeckHeightSide) {
		return hipToNeckHeightSide - 4;
	}
}

function deriveHipToNeckHeightBack({
	hipToNeckHeightFront,
	hipToNeckHeightSide,
}) {
	if (hipToNeckHeightFront) {
		return hipToNeckHeightFront + 2;
	}
	if (hipToNeckHeightSide) {
		return hipToNeckHeightSide - 2;
	}
}

export function deriveMeasurements({
	hipWidth,
	waistWidth,
	chestWidth,
	shoulderWidth,
	neckWidth,
	hipToArmpitHeight,
	hipToNeckHeightFront,
	hipToNeckHeightBack,
	hipToNeckHeightSide,
	hipToShoulderHeight,
	sleeveLengthOuter,
	sleeveWidthElbow,
	sleeveWidthShoulder,
	neckToShoulderLength,
}) {
	const _hipWidth = derive(deriveHipWidth, { waistWidth, chestWidth, shoulderWidth }, hipWidth);
	const _waistWidth = derive(deriveWaistWidth, { _hipWidth }, waistWidth);
	const _chestWidth = derive(deriveChestWidth, { _hipWidth }, chestWidth);
	const _hipToArmpitHeight = derive(deriveHipToArmpitHeight, { _chestWidth }, hipToArmpitHeight);
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
			hipToNeckHeightFront,
			hipToNeckHeightSide,
		},
		hipToNeckHeightBack,
	);
	const _hipToNeckHeightSide = derive(
		deriveHipToNeckHeightSide,
		{ 
			_hipToNeckHeightFront,
		},
		hipToNeckHeightSide,
	);
	
	return {
		_hipWidth,
		_waistWidth,
		_chestWidth,
		_hipToArmpitHeight,
		_hipToNeckHeightFront,
		_hipToNeckHeightBack,
		_hipToNeckHeightSide,
	};
}
