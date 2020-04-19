import React, { useState } from 'react';
import { arrayOf, func, object } from 'prop-types';
import cn from 'classnames';
import { GarmentViewer } from '@components/layout';
import styles from './styles.scss';

export function GarmentSegmentsView({
	builder: Builder,
	garment,
	segments,
}) {
	const builder = new Builder();
	const [{ propName: defaultSelected }] = segments;
	const [selectedSegment, setSelectedSegment] = useState(defaultSelected);
	const garmentStrokes = builder.draw();
	const { viewBox, size } = builder.getBounds();
	const measurementStrokeMap = builder.drawMeasurements();
	const measurementStrokes = Object.entries(measurementStrokeMap);
	const strokeWidth = (size / 100);
	const segmentHoverHandler = (event = {}) => {
		const {
			target: {
				dataset: { propname } = {},
			} = {},
		} = event;
		setSelectedSegment(propname);
		event.stopPropagation();
	};
	return (
		<GarmentViewer
			svgHeader={garment.name}
			textHeader="Measurements"
			svg={
				<svg
					version="1.1"
					className={styles.wrapper}
					viewBox={viewBox}
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
								key={stroke.draw}
								strokeWidth={strokeWidth}
								d={stroke.draw}
								className={cn({ [styles.shaded]: stroke.filled })}
							/>
						))}
					</g>
					<g className={styles.measurements}>
						{measurementStrokes.map(([propName, { demo: { draw } }]) => (
							<path
								key={draw}
								strokeWidth={strokeWidth}
								className={cn({ [styles.selected]: propName === selectedSegment })}
								d={draw}
							/>
						))}
					</g>
				</svg>
			}
			textModule={
				<>
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
				</>
			}
		/>
	);
}

GarmentSegmentsView.propTypes = {
	builder: func.isRequired,
	garment: object.isRequired,
	segments: arrayOf(object).isRequired
};
