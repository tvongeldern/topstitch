import React, { useState } from 'react';
import cn from 'classnames';
import { arrayOf, func, object } from 'prop-types';
import styles from './styles.scss';

export function GarmentView({
	component: Garment,
	garment,
	segments,
}) {
	const [selectedSegment, setSelectedSegment] = useState();
	console.log(selectedSegment);
	const measurements = Garment.defaultMeasurements;
	const offsets = Garment.deriveOffsets({ measurements });
	const viewBox = Garment.deriveViewBox({ offsets });
	const coordinates = Garment.deriveCoordinates({ offsets, viewBox });
	const garmentStrokes = Garment.drawGarment({ coordinates });
	const measurementStrokeMap = Garment.drawMeasurements({ coordinates, measurements });
	const measurementStrokes = Object.entries(measurementStrokeMap);
	const strokeWidth = (viewBox.size / 100);
	return (
		<div className={styles.container}>
			<svg
				version="1.1"
				viewBox={viewBox.svgProp}
				fill="none"
				stroke="none"
				strokeLinecap="round"
				strokeMiterlimit="10"
				xlink="http://www.w3.org/1999/xlink"
				xmlns="http://www.w3.org/2000/svg"
				className={styles.wrapper}
			>
				<g className={styles.garment}>
					{garmentStrokes.map((stroke) => (
						<path
							key={stroke.d}
							strokeWidth={strokeWidth}
							{...stroke}
						/>
					))}
				</g>
				<g className={styles.measurements}>
					{measurementStrokes.map(([propName, { demo }]) => (
							<path
								key={demo.d}
								strokeWidth={strokeWidth}
								className={cn({ [styles.selected]: propName === selectedSegment })}
								{...demo}
							/>
					))}
				</g>
			</svg>
			<div className={styles.segments}>
				{segments.map((segment) => (
					<div
						key={segment.id}
						data-poop={segment.id}
						name={segment.propName}
						className={styles.segment}
						onMouseOver={() => setSelectedSegment(segment.propName)}
					>
						<p>{segment.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

GarmentView.propTypes = {
	component: func.isRequired,
	garment: object.isRequired,
	segments: arrayOf(object).isRequired
};
