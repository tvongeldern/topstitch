import { EMPTY_OBJECT } from '@constants';

export function shiftCoordinates({ shift, coordinates }) {
	return Object.entries(coordinates).reduce(
		(shiftedCoords, [key, { x, y }]) => ({
			...shiftedCoords,
			[key]: {
				x: x + shift.x,
				y: y + shift.y,
			},
		}),
		EMPTY_OBJECT,
	);
}
