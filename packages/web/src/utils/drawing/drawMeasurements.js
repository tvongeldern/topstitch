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

export function drawMeasurements(measurements, coordinatesMap) {
	return Object.entries(coordinatesMap).reduce((mapped, [key, value]) => ({
		...mapped,
		[key]: measurementInstructions({
			...value,
			distance: measurements[key],
		}),
	}), {});
}
