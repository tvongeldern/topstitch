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
		neckFront,
		neckBack,
		elbowOuterLeft,
		elbowOuterRight,
		elbowInnerLeft,
		elbowInnerRight,
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
		// collar / neck
		{
			d: `
				M ${neckLeft.x},${neckLeft.y}
				Q ${neckLeft.x},${neckFront.y} ${neckFront.x},${neckFront.y}
				Q ${neckRight.x},${neckFront.y} ${neckRight.x},${neckRight.y}
				Q ${neckRight.x},${neckBack.y} ${neckBack.x},${neckBack.y}
				Q ${neckLeft.x},${neckBack.y} ${neckLeft.x},${neckLeft.y}
			`,
		},
		// { d: `M ${neckLeft.x},${neckLeft.y} Q ${neckLeft.x},${neckBack.y} ${neckBack.x},${neckBack.y} Q ${neckRight.x},${neckBack.y} ${neckRight.x},${neckRight.y}` },
		// { d: `M ${neckLeft.x},${neckLeft.y} Q ${neckFront.x},${neckFront.y} ${neckRight.x},${neckRight.y}` },
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