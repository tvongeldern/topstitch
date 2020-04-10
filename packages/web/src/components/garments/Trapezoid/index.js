import React from 'react';
import { remainingTrapezoidCoords } from '@utils/geometry';
import styles from './styles.scss';

export function Trapezoid({
	measurements: {
		A,
		B,
		C,
		D,
		L1,
		L2,
		L3,
		L4,
	},
}) {
	const solvedTrapezoidCoords = remainingTrapezoidCoords({
		A,
		B,
		C,
		D,
		L1,
		L2,
		L3,
		L4,
	});
	// console.log(solvedTrapezoidCoords)
	const strokes = [
		`M ${A.x},${A.y} L ${B.x},${B.y}`,
	];
	return (
		<svg
			version="1.1"
			viewBox={`0 0 100 100`}
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
					key={stroke}
					fill="none"
					stroke="red"
					d={stroke}
				/>
			))}
			</svg>
	);
}

Trapezoid.propTypes = {};