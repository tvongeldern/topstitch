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
		{ draw: `M ${shoulderLeft.x},${shoulderLeft.y} L ${elbowOuterLeft.x},${elbowOuterLeft.y}` },
		{ draw: `M ${shoulderRight.x},${shoulderRight.y} L ${elbowOuterRight.x},${elbowOuterRight.y}` },
		// cross sleeves
		{ draw: `M ${elbowOuterLeft.x},${elbowOuterLeft.y} L ${elbowInnerLeft.x},${elbowInnerLeft.y}` },
		{ draw: `M ${elbowOuterRight.x},${elbowOuterRight.y} L ${elbowInnerRight.x},${elbowInnerRight.y}` },
		// back to armpits
		{ draw: `M ${elbowInnerLeft.x},${elbowInnerLeft.y} L ${armpitLeft.x},${armpitLeft.y}` },
		{ draw: `M ${elbowInnerRight.x},${elbowInnerRight.y} L ${armpitRight.x},${armpitRight.y}` },
	];
}