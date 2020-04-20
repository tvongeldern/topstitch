export function deriveCoordinates({
	coordinates: {
		neckLeft,
		neckRight,
	},
	offsets: {
		necklineFrontOffset,
		necklineBackOffset,
	},
}) {
	const neckFront = {
		x: 0,
		y: neckLeft.y + necklineFrontOffset.y,
	};

	const neckBack = {
		x: 0,
		y: neckLeft.y + necklineBackOffset.y,
	};

	return {
		neckLeft,
		neckRight,
		neckFront,
		neckBack,
	};
}
