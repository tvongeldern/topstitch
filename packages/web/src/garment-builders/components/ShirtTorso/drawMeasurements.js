function measurementInstructions({
	top,
	bottom,
	left,
	right,
	distance,
	start = top || left,
	end = bottom || right,
}) {
	const vertical = top && bottom;
	const horizontal = left && right;
	const diagonal = !top && !bottom && !left && !right;
	const startPoint = `${start.x},${start.y}`;
	const demoY = horizontal ? start.y : end.y;
	const demoX = vertical ? start.x : end.x;
	const demo = { d: `M ${startPoint} L ${demoX},${demoY}` };
	return {
		demo,
		// provided: {
		// 	d: `M ${start.x},${start.y} l ${providedLine}`,
		// },
	};
}

function mapBounds(measurements, boundsMap) {
	return Object.entries(boundsMap).reduce((mapped, [key, value]) => ({
		...mapped,
		[key]: measurementInstructions({
			...value,
			distance: measurements[key],
		}),
	}), {});
}

export function drawMeasurements({
	measurements,
	coordinates: {
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
		neckFront,
		neckBack,
		elbowOuterLeft,
		elbowOuterRight,
		elbowInnerLeft,
		elbowInnerRight,
	},
}) {
	return mapBounds(measurements, {
		hipWidth: {
			left: hipLeft,
			right: hipRight,
		},
		waistWidth: {
			left: waistLeft,
			right: waistRight,
		},
		chestWidth: {
			left: armpitLeft,
			right: armpitRight,
		},
		shoulderWidth: {
			left: shoulderLeft,
			right: shoulderRight,
		},
		neckWidth: {
			left: neckLeft,
			right: neckRight,
		},
		hipToArmpitHeight: {
			top: armpitLeft,
			bottom: hipLeft,
		},
		hipToNeckHeightFront: {
			top: neckFront,
			bottom: hipLeft,
		},
		hipToNeckHeightBack: {
			top: neckBack,
			bottom: hipLeft,
		},
		hipToNeckHeightSide: {
			top: neckLeft,
			bottom: hipLeft,
		},
		sleeveLengthOuter: {
			start: shoulderLeft,
			end: elbowOuterLeft,
		},
		sleeveWidthElbow: {
			start: elbowOuterLeft,
			end: elbowInnerLeft,
		},
		sleeveWidthShoulder: {
			start: shoulderLeft,
			end: armpitLeft,
		},
		neckToShoulderLength: {
			start: shoulderLeft,
			end: neckLeft,
		},
	});
}
