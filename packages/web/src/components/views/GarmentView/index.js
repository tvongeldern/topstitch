import React from 'react';
import { func, object } from 'prop-types';
import cn from 'classnames';
import styles from '@constants/styles/garments.scss';

export function GarmentView({
	garment: Garment,
	measurements,
}) {
	const offsets = Garment.deriveOffsets({ measurements });
	const viewBox = Garment.deriveViewBox({ offsets });
	const coordinates = Garment.deriveCoordinates({ offsets, viewBox });
	const garmentStrokes = Garment.drawGarment({ coordinates });
	const measurementStrokes = Garment.drawMeasurements({ coordinates, measurements });
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
			className={styles.garment}
		>
			{garmentStrokes.map((stroke) => (
				<path
					key={stroke.d}
					strokeWidth={strokeWidth}
					{...stroke}
				/>
			))}
			{measurementStrokes.map(({ className, ...stroke }) => (
				<g className={cn(styles.measurement, className)}>
					<path
						key={stroke.d}
						strokeWidth={strokeWidth}
						{...stroke}
					/>
				</g>
			))}
		</svg>
	);
}

GarmentView.propTypes = {
	garment: func.isRequired,
	measurements: object.isRequired
};
