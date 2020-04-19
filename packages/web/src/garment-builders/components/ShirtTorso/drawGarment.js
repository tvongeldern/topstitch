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
		{ d: `M ${hipLeft.x},${hipLeft.y} L ${hipRight.x},${hipRight.y}` },
		//waist
		{ d: `M ${hipLeft.x},${hipLeft.y} L ${waistLeft.x},${waistLeft.y}` },
		{ d: `M ${hipRight.x},${hipRight.y} L ${waistRight.x},${waistRight.y}` },
		// armpits
		{ d: `M ${waistLeft.x},${waistLeft.y} L ${armpitLeft.x},${armpitLeft.y}` },
		{ d: `M ${waistRight.x},${waistRight.y} L ${armpitRight.x},${armpitRight.y}` },
		// shoulders
		{ d: `M ${shoulderLeft.x},${shoulderLeft.y} L ${neckLeft.x},${neckLeft.y}` },
		{ d: `M ${shoulderRight.x},${shoulderRight.y} L ${neckRight.x},${neckRight.y}` },
	];
}