import { endOfLineSegment, slopeFromTwoPoints } from '../geometry';

function getDiagonalProvidedLine({ start, end, distance }) {
	const endCoords = endOfLineSegment({
		distance,
		point: start,
		slope: slopeFromTwoPoints(start, end),
	});
	return `L ${endCoords.x},${endCoords.y}`;
}

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
	const providedLine = diagonal
		? getDiagonalProvidedLine({ start, end, distance })
		: `${horizontal ? 'h' : 'v'} ${distance}`;

	const demo = {
		draw: `M ${startPoint} L ${demoX},${demoY}`,
	};
	const provided = {
		draw: `M ${start.x},${start.y} ${providedLine}`,
	};

	return {
		demo,
		provided,
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
