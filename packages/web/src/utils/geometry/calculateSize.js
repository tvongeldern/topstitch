import { EMPTY_ARRAY } from '@constants';

function getSize({ bottom, left, right, top }, { x, y }) {
	return {
		bottom: Math.min(bottom, y),
		left: Math.min(left, x),
		right: Math.max(right, x),
		top: Math.max(top, y),
	};
}

export function calculateSize(...coordinateSets) {
	const coordinates = coordinateSets.reduce((coords, set) => [
		...coords,
		...Object.values(set),
	], EMPTY_ARRAY);
	const [{ x, y }] = coordinates;
	const { bottom, left, right, top } = coordinates.reduce(getSize, {
		bottom: y,
		left: x,
		right: x,
		top: y,
	});
	return {
		width: right - left,
		height: top - bottom,
	};
}
