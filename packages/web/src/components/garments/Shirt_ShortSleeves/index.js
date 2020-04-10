import React from 'react';
import { object } from 'prop-types';
import { circleIntersection, endOfHypotenuse } from '@utils/geometry';
import styles from './styles.scss';

const xDesc = (a, b) => a.x - b.x;
const xAsc = (a, b) => b.x - a.x;

const DOTTED = {
	strokeDasharray: 2,
	strokeDashoffset: 1,
};

// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Path_commands

export function Shirt_ShortSleeves({
	measurements: {
		hipWidth = 0,
		waistWidth = 0,
		armpitWidth = 0,
		shoulderWidth = 0,
		neckWidth = 0,
		hipToArmpitHeightLeft = 0,
		hipToArmpitHeightRight = 0,
		hipToNeckHeightCenter = 0,
		hipToNeckHeightLeft = 0,
		hipToNeckHeightRight = 0,
		hipToShoulderHeightLeft = 0,
		hipToShoulderHeightRight = 0,
		innerSleeveLengthLeft = 0,
		innerSleeveLengthRight = 0,
		outerSleeveLengthLeft = 0,
		outerSleeveLengthRight = 0,
		sleeveWidthElbowLeft = 0,
		sleeveWidthElbowRight = 0,
		sleeveWidthShoulderLeft = 0,
		sleeveWidthShoulderRight = 0,
		neckToShoulderLengthLeft = 0,
		neckToShoulderLengthRight = 0,
		collarThickness = 0,
	},
}) {
	// Setting container size
	const maxHeight = Math.max(
		hipToArmpitHeightLeft,
		hipToArmpitHeightRight,
		hipToNeckHeightCenter,
		hipToNeckHeightLeft,
		hipToNeckHeightRight,
		hipToShoulderHeightLeft,
		hipToShoulderHeightRight,
	);
	const maxWidth = Math.max(
		hipWidth + outerSleeveLengthLeft + outerSleeveLengthRight,
		waistWidth + outerSleeveLengthLeft + outerSleeveLengthRight,
		armpitWidth + outerSleeveLengthLeft + outerSleeveLengthRight,
		shoulderWidth + outerSleeveLengthLeft + outerSleeveLengthRight,
		neckWidth + neckToShoulderLengthLeft + neckToShoulderLengthRight + outerSleeveLengthLeft + outerSleeveLengthRight,
	);
	const maxSleeve = Math.max(
		innerSleeveLengthLeft,
		innerSleeveLengthRight,
		outerSleeveLengthLeft,
		outerSleeveLengthRight,
	);
	const containerSize = Math.max(maxHeight, maxWidth + maxSleeve, 90) + 10;
	// Container points
	const middle = (containerSize / 2)
	const bottom = middle + (maxHeight / 2);
	// Garment points
	const hipLeft = {
		x: middle - (hipWidth / 2),
		y: bottom,
	};
	const hipRight = {
		x: middle + (hipWidth / 2),
		y: bottom,
	};
	const waistLeft = {
		x: middle - (waistWidth / 2),
		y: bottom - (hipToArmpitHeightLeft / 2),
	};
	const waistRight = {
		x: middle + (waistWidth / 2),
		y: bottom - (hipToArmpitHeightRight / 2),
	};
	const armpitLeft = {
		x: middle - (armpitWidth / 2),
		y: bottom - hipToArmpitHeightLeft,
	};
	const armpitRight = {
		x: middle + (armpitWidth / 2),
		y: bottom - hipToArmpitHeightRight,
	};
	const neckLeft = {
		x: middle - (neckWidth / 2),
		y: bottom - hipToNeckHeightLeft,
	};
	const neckRight = {
		x: middle + (neckWidth / 2),
		y: bottom - hipToNeckHeightRight,
	};
	const neckCenter = {
		x: middle,
		y: bottom - hipToNeckHeightCenter,
	};
	const shoulderLeft = circleIntersection(
		[neckLeft, neckToShoulderLengthLeft],
		[armpitLeft, sleeveWidthShoulderLeft],
	).sort(xDesc)[0];
	const shoulderRight = circleIntersection(
		[neckRight, neckToShoulderLengthRight],
		[armpitRight, sleeveWidthShoulderRight],
	).sort(xAsc)[0];
	const elbowLeftTop = endOfHypotenuse({
		point: shoulderLeft,
		distance: outerSleeveLengthLeft,
		slope: 1,
		options: { inverseX: true },
	});
	const elbowLeftBottom = endOfHypotenuse({
		point: elbowLeftTop,
		distance: sleeveWidthElbowLeft,
		slope: 1,
	});
	const elbowRightTop = endOfHypotenuse({
		point: shoulderRight,
		distance: outerSleeveLengthRight,
		slope: 1,
	});
	const elbowRightBottom = endOfHypotenuse({
		point: elbowRightTop,
		distance: sleeveWidthElbowRight,
		slope: 1,
		options: { inverseX: true },
	});
	// const elbowRightBottom;
	// const elbowRightTop;
	const strokes = [
		// Bottom/hip
		{ d: `M ${hipLeft.x},${hipLeft.y} L ${hipRight.x},${hipRight.y}` },
		// Right hip to waist
		{ d: `M ${hipRight.x},${hipRight.y} L ${waistRight.x},${waistRight.y}` },
		// Right waist to armpit
		{ d: `M ${waistRight.x},${waistRight.y} L ${armpitRight.x},${armpitRight.y}` },
		// Left hip to waist
		{ d: `M ${hipLeft.x},${hipLeft.y} L ${waistLeft.x},${waistLeft.y}` },
		// Left waist to armpit
		{ d: `M ${waistLeft.x},${waistLeft.y} L ${armpitLeft.x},${armpitLeft.y}` },
		// Collar
		{ d: `M ${neckLeft.x},${neckLeft.y} S ${neckCenter.x},${neckCenter.y} ${neckRight.x},${neckRight.y} ${neckRight.x},${neckRight.y}` },
		// Left shoulder seam
		{ d: `M ${neckLeft.x},${neckLeft.y} L ${shoulderLeft.x},${shoulderLeft.y}` },
		// Right shoulder seam
		{ d: `M ${neckRight.x},${neckRight.y} L ${shoulderRight.x},${shoulderRight.y}` },
		// Left sleeve
		{
			d: `M ${shoulderLeft.x},${shoulderLeft.y} L ${elbowLeftTop.x},${elbowLeftTop.y}`,
		},
		{
			d: `M ${elbowLeftTop.x},${elbowLeftTop.y} L ${elbowLeftBottom.x},${elbowLeftBottom.y}`,
		},
		// Right sleeve
		{
			d: `M ${shoulderRight.x},${shoulderRight.y} L ${elbowRightTop.x},${elbowRightTop.y}`,
		},
		{
			d: `M ${elbowRightTop.x},${elbowRightTop.y} L ${elbowRightBottom.x},${elbowRightBottom.y}`,
		},
		
	];
	return (
		<svg
			version="1.1"
			viewBox={`0 0 ${containerSize} ${containerSize}`}
			fill="none"
			stroke="none"
			strokeLinecap="round"
			strokeMiterlimit="10"
			xlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
			className={styles.svg}
		>
			{strokes.map((stroke) => (
				<path
					key={stroke.d}
					fill="none"
					stroke="red"
					{...stroke}
				/>
			))}
		</svg>
	);
}

Shirt_ShortSleeves.propTypes = {
	measurements: object,
};

Shirt_ShortSleeves.defaultProps = {
	measurements: {},
};
