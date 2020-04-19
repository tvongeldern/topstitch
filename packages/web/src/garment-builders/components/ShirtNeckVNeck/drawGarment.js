export function drawGarment({
	coordinates: {
		neckLeft,
		neckRight,
		neckFront,
		neckBack,
	},
}) {
	return [
		// collar / neck
		{
			draw: `
				M ${neckLeft.x},${neckLeft.y}
				L ${neckFront.x},${neckFront.y}
				L ${neckRight.x},${neckRight.y}
				Q ${neckBack.x},${neckBack.y} ${neckLeft.x},${neckLeft.y}
			`,
		},
	];
}