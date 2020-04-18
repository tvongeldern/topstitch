import React, { useState } from 'react';
import cn from 'classnames';
import { arrayOf, func, object } from 'prop-types';
import styles from './styles.scss';

export function GarmentView({
	component: Garment,
	garment,
	segments,
}) {
	const measurements = Garment.defaultMeasurements;
	const [defaultSelected] = Object.keys(measurements);
	const [selectedSegment, setSelectedSegment] = useState(defaultSelected);
	const offsets = Garment.deriveOffsets({ measurements });
	const viewBox = Garment.deriveViewBox({ offsets });
	const coordinates = Garment.deriveCoordinates({ offsets, viewBox });
	const garmentStrokes = Garment.drawGarment({ coordinates });
	const measurementStrokeMap = Garment.drawMeasurements({ coordinates, measurements });
	const measurementStrokes = Object.entries(measurementStrokeMap);
	const strokeWidth = (viewBox.size / 100);
	const segmentHoverHandler = (event = {}) => {
		const {
			target: {
				dataset: { propname } = {},
			} = {},
		} = event;
		setSelectedSegment(propname);
		event.stopPropagation();
	}
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h2>{garment.name}</h2>
				<svg
					version="1.1"
					viewBox={viewBox.svgProp}
					fill="none"
					stroke="none"
					strokeLinecap="round"
					strokeMiterlimit="10"
					xlink="http://www.w3.org/1999/xlink"
					xmlns="http://www.w3.org/2000/svg"
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
			</div>

			<div className={styles.segments}>
				<h2>Measurements</h2>
				{segments.map((segment) => (
					<div
						key={segment.id}
						data-propname={segment.propName}
						name={segment.propName}
						className={cn(
							styles.segment,
							{ [styles.selected]: selectedSegment === segment.propName },
						)}
						onMouseOver={segmentHoverHandler}
					>
						<h5 data-propname={segment.propName}>{segment.name}</h5>
						<p data-propname={segment.propName}>{segment.description}</p>
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
