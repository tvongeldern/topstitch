export function deriveCoordinates({
	coordinates: {
		neckLeft,
		neckRight,
	},
	offsets: {
		necklineFrontOffset,
		necklineBackOffset,
	},
	bounds: {
		middle,
	},
}) {
	const neckFront = {
		x: middle,
		y: neckLeft.y + necklineFrontOffset.y,
	};

	const neckBack = {
		x: middle,
		y: neckLeft.y + necklineBackOffset.y,
	};

	return {
		neckLeft,
		neckRight,
		neckFront,
		neckBack,
	};
}
