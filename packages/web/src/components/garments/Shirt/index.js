import React from 'react';
import { number } from 'prop-types';
import { circleIntersections, endOfLineSegment, pythagoreanTheoremSolver } from '@utils/geometry';
import { deriveOffsets } from './deriveOffsets';
import styles from './styles.scss';

function deriveCoordinates(leftSide, rightSide, offset) {
	return [
		{ // left
			x: leftSide.x - offset.x,
			y: leftSide.y - offset.y,
		},
		{ // right
			x: rightSide.x + offset.x,
			y: rightSide.y - offset.y,
		},
	];
}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Path_commands

export function Shirt({
	...measurements
}) {
	const {
		hipWidth,
		waistWidth,
		chestWidth,
		shoulderWidth,
		neckWidth,
		hipToArmpitHeight,
		hipToNeckHeightFront,
		hipToNeckHeightBack,
		hipToNeckHeightSide,
		sleeveLengthOuter,
		sleeveWidthElbow,
		sleeveWidthShoulder,
		neckToShoulderLength,
	} = measurements;
	const {
		startHipOffset,
		hipWaistOffset,
		waistArmpitOffset,
		armpitShoulderOffset,
		shoulderNeckOffset,
		necklineFrontOffset,
		necklineBackOffset,
		shoulderElbowOuterOffset,
		elbowOuterInnerOffset,
	} = deriveOffsets(measurements);

	const containerSize = 100;
	const middle = containerSize / 2;
	const start = {
		x: middle,
		y: middle + (middle/2),
	};

	const hipLeft = {
		x: start.x - startHipOffset.x,
		y: start.y - startHipOffset.y,
	};
	const hipRight = {
		x: start.x + startHipOffset.x,
		y: start.y - startHipOffset.y,
	};

	const [waistLeft, waistRight] = deriveCoordinates(
		hipLeft,
		hipRight,
		hipWaistOffset,
	);

	const [armpitLeft, armpitRight] = deriveCoordinates(
		waistLeft,
		waistRight,
		waistArmpitOffset,
	);

	const [shoulderLeft, shoulderRight] = deriveCoordinates(
		armpitLeft,
		armpitRight,
		armpitShoulderOffset,
	);

	const [neckLeft, neckRight] = deriveCoordinates(
		shoulderLeft,
		shoulderRight,
		shoulderNeckOffset,
	);

	const neckFront = {
		x: middle,
		y: neckLeft.y + necklineFrontOffset.y,
	};

	const neckBack = {
		x: middle,
		y: neckLeft.y + necklineBackOffset.y,
	};

	const [elbowOuterLeft, elbowOuterRight] = deriveCoordinates(
		shoulderLeft,
		shoulderRight,
		shoulderElbowOuterOffset,
	);

	const [elbowInnerLeft, elbowInnerRight] = deriveCoordinates(
		elbowOuterLeft,
		elbowOuterRight,
		elbowOuterInnerOffset,
	);

	const strokes = [
		// hips
		{ d: `M ${hipLeft.x},${hipLeft.y} L ${hipRight.x},${hipRight.y}` },
		//waist
		{ d: `M ${hipLeft.x},${hipLeft.y} L ${waistLeft.x},${waistLeft.y}` },
		{ d: `M ${hipRight.x},${hipRight.y} L ${waistRight.x},${waistRight.y}` },
		// armpits
		{ d: `M ${waistLeft.x},${waistLeft.y} L ${armpitLeft.x},${armpitLeft.y}` },
		{ d: `M ${waistRight.x},${waistRight.y} L ${armpitRight.x},${armpitRight.y}` },
		// shoulders
		{ d: `M ${shoulderLeft.x},${shoulderLeft.y} L ${neckLeft.x},${neckLeft.y}`},
		{ d: `M ${shoulderRight.x},${shoulderRight.y} L ${neckRight.x},${neckRight.y}` },
		// collar / neck
		{ d: `M ${neckLeft.x},${neckLeft.y} L ${neckFront.x},${neckFront.y} L ${neckRight.x},${neckRight.y}` },
		{ d: `M ${neckLeft.x},${neckLeft.y} L ${neckBack.x},${neckBack.y} L ${neckRight.x},${neckRight.y}` },
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
					strokeWidth={0.5}
					fill="none"
					stroke="red"
					{...stroke}
				/>
			))}
		</svg>
	);
}

Shirt.propTypes = {
	chestWidth: number,
	hipWidth: number,
	waistWidth: number,
	shoulderWidth: number,
	neckWidth: number,
	hipToArmpitHeight: number,
	hipToNeckHeightFront: number,
	hipToNeckHeightBack: number,
	hipToNeckHeightSide: number,
	sleeveLengthOuter: number,
	sleeveWidthElbow: number,
	sleeveWidthShoulder: number,
	neckToShoulderLength: number,
};

Shirt.defaultProps = {
	chestWidth: 0,
	hipWidth: 0,
	waistWidth: 0,
	shoulderWidth: 0,
	neckWidth: 0,
	hipToArmpitHeight: 0,
	hipToNeckHeightFront: 0,
	hipToNeckHeightBack: 0,
	hipToNeckHeightSide: 0,
	sleeveLengthOuter: 0,
	sleeveWidthElbow: 0,
	sleeveWidthShoulder: 0,
	neckToShoulderLength: 0,
};
