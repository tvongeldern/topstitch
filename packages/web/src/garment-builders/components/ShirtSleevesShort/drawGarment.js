export function drawGarment({
	coordinates: {
		armpitLeft,
		armpitRight,
		shoulderLeft,
		shoulderRight,
		elbowOuterLeft,
		elbowOuterRight,
		elbowInnerLeft,
		elbowInnerRight,
	},
}) {
	return [
		// sleeves from shoulder
		{ d: `M ${shoulderLeft.x},${shoulderLeft.y} L ${elbowOuterLeft.x},${elbowOuterLeft.y}` },
		{ d: `M ${shoulderRight.x},${shoulderRight.y} L ${elbowOuterRight.x},${elbowOuterRight.y}` },
		// cross sleeves
		{ d: `M ${elbowOuterLeft.x},${elbowOuterLeft.y} L ${elbowInnerLeft.x},${elbowInnerLeft.y}` },
		{ d: `M ${elbowOuterRight.x},${elbowOuterRight.y} L ${elbowInnerRight.x},${elbowInnerRight.y}` },
		// back to armpits
		{ d: `M ${elbowInnerLeft.x},${elbowInnerLeft.y} L ${armpitLeft.x},${armpitLeft.y}` },
		{ d: `M ${elbowInnerRight.x},${elbowInnerRight.y} L ${armpitRight.x},${armpitRight.y}` },
	];
}