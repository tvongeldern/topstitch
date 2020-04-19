export function drawGarment({
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
	},
}) {
	return [
		// hips
		{ draw: `M ${hipLeft.x},${hipLeft.y} L ${hipRight.x},${hipRight.y}` },
		//waist
		{ draw: `M ${hipLeft.x},${hipLeft.y} L ${waistLeft.x},${waistLeft.y}` },
		{ draw: `M ${hipRight.x},${hipRight.y} L ${waistRight.x},${waistRight.y}` },
		// armpits
		{ draw: `M ${waistLeft.x},${waistLeft.y} L ${armpitLeft.x},${armpitLeft.y}` },
		{ draw: `M ${waistRight.x},${waistRight.y} L ${armpitRight.x},${armpitRight.y}` },
		// shoulders
		{ draw: `M ${shoulderLeft.x},${shoulderLeft.y} L ${neckLeft.x},${neckLeft.y}` },
		{ draw: `M ${shoulderRight.x},${shoulderRight.y} L ${neckRight.x},${neckRight.y}` },
	];
}