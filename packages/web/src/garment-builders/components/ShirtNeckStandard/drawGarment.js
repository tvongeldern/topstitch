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
				Q ${neckLeft.x},${neckFront.y} ${neckFront.x},${neckFront.y}
				Q ${neckRight.x},${neckFront.y} ${neckRight.x},${neckRight.y}
				Q ${neckRight.x},${neckBack.y} ${neckBack.x},${neckBack.y}
				Q ${neckLeft.x},${neckBack.y} ${neckLeft.x},${neckLeft.y}
			`,
			filled: true,
		},
	];
}