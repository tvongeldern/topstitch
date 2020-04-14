import React from 'react';
import { number } from 'prop-types';
import { circleIntersections, endOfLineSegment, pythagoreanTheoremSolver } from '@utils/geometry';
import { deriveMeasurements } from './deriveMeasurements';
import styles from './styles.scss';

const xDesc = (a, b) => a.x - b.x;
const xAsc = (a, b) => b.x - a.x;

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
		hipToShoulderHeight,
		sleeveLengthOuter,
		sleeveWidthElbow,
		sleeveWidthShoulder,
		neckToShoulderLength,
	} = measurements;
	const {
		_hipWidth,
		_waistWidth,
		_chestWidth,
		_hipToArmpitHeight,
		_hipToNeckHeightFront,
		_hipToNeckHeightBack,
		_hipToNeckHeightSide,
	} = deriveMeasurements(measurements);

	// Setting container size
	const maxHeight = Math.max(
		_hipToArmpitHeight,
		_hipToNeckHeightFront,
		_hipToNeckHeightSide,
		hipToShoulderHeight,
	);
	const containerSize = Math.max(maxHeight, 90) + 10;
	// Container points
	const middle = (containerSize / 2)
	const bottom = middle + (maxHeight / 2);
	
	// Initial calculations
	const halfHipWidth = _hipWidth / 2;
	const halfWaistWidth = _waistWidth / 2;
	const halfChestWidth = _chestWidth / 2;

	// Garment points
	const hipLeft = {
		x: middle - halfHipWidth,
		y: bottom,
	};
	const hipRight = {
		x: middle + halfHipWidth,
		y: bottom,
	};
	const waistLeft = {
		x: middle - halfWaistWidth,
		y: bottom - (_hipToArmpitHeight / 2),
	};
	const waistRight = {
		x: middle + halfWaistWidth,
		y: bottom - (_hipToArmpitHeight / 2),
	};
	const armpitLeft = {
		x: middle - halfChestWidth,
		y: bottom - _hipToArmpitHeight,
	};
	const armpitRight = {
		x: middle + halfChestWidth,
		y: bottom - _hipToArmpitHeight,
	};
	const { b: shoulderVertical } = pythagoreanTheoremSolver({
		a: (shoulderWidth - chestWidth) / 2,
		c: sleeveWidthShoulder,
	});
	const shoulderY = armpitLeft.y - shoulderVertical;
	const shoulderLeft = {
		x: middle - (shoulderWidth / 2),
		y: shoulderY,
	};
	const shoulderRight = {
		x: middle + (shoulderWidth / 2),
		y: shoulderY,
	};
	const elbowLeftTop = endOfLineSegment({
		point: shoulderLeft,
		distance: sleeveLengthOuter,
		slope: 1,
		options: { inverseX: true },
	});
	const elbowLeftBottom = endOfLineSegment({
		point: elbowLeftTop,
		distance: sleeveWidthElbow,
		slope: 1,
	});
	const elbowRightTop = endOfLineSegment({
		point: shoulderRight,
		distance: sleeveLengthOuter,
		slope: 1,
	});
	const elbowRightBottom = endOfLineSegment({
		point: elbowRightTop,
		distance: sleeveWidthElbow,
		slope: 1,
		options: { inverseX: true },
	});
	const neckLeft = {
		x: middle - (neckWidth / 2),
		y: bottom - _hipToNeckHeightSide,
	};
	const neckRight = {
		x: middle + (neckWidth / 2),
		y: bottom - _hipToNeckHeightSide,
	};
	const neckCenter = {
		x: middle,
		y: bottom - _hipToNeckHeightFront,
	};
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
		{ // inferred
			d: `M ${elbowLeftBottom.x},${elbowLeftBottom.y} L ${armpitLeft.x},${armpitLeft.y}`,
		},
		// Right sleeve
		{
			d: `M ${shoulderRight.x},${shoulderRight.y} L ${elbowRightTop.x},${elbowRightTop.y}`,
		},
		{
			d: `M ${elbowRightTop.x},${elbowRightTop.y} L ${elbowRightBottom.x},${elbowRightBottom.y}`,
		},
		{ // inferred
			d: `M ${elbowRightBottom.x},${elbowRightBottom.y} L ${armpitRight.x},${armpitRight.y}`,
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
	hipToShoulderHeight: number,
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
	hipToShoulderHeight: 0,
	sleeveLengthOuter: 0,
	sleeveWidthElbow: 0,
	sleeveWidthShoulder: 0,
	neckToShoulderLength: 0,
};
