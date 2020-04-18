import styles from '@constants/styles/garments.scss';

export function drawMeasurements({
	measurements: {
		chestWidth,
	},
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
	const chestWidthMeasurement = chestWidth
	? {
		d: `M ${armpitLeft.x},${armpitLeft.y} l ${chestWidth},0`,
		className: styles.measured,
	}
	: {
			d: `M ${armpitLeft.x},${armpitLeft.y} L ${armpitRight.x},${armpitRight.y}`,
	};
	return [
		// chestWidthMeasurement,
	];
}
