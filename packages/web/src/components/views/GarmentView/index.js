import React from 'react';
import { func, object } from 'prop-types';
import styles from './styles.scss';

export function GarmentView({
	garment: Garment,
	measurements,
}) {
	const offsets = Garment.deriveOffsets(measurements);
	const viewBox = Garment.deriveViewBox(offsets);
	const strokes = Garment.drawGarment({ offsets, viewBox });
	const strokeWidth = viewBox.size / 161;
	return (
		<svg
			version="1.1"
			viewBox={viewBox.svgProp}
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
					strokeWidth={strokeWidth}
					fill="none"
					stroke="red"
					{...stroke}
				/>
			))}
		</svg>
	);
}

GarmentView.propTypes = {
	garment: func.isRequired,
	measurements: object.isRequired
};
