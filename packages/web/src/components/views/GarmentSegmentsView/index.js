import React, { useState } from 'react';
import { arrayOf, func, object } from 'prop-types';
import cn from 'classnames';
import { GarmentViewer } from '@components/layout';
import { SVG } from '@components/ui';
import { getViewBox } from '@utils/drawing';
import styles from './styles.scss';

export function GarmentSegmentsView({
	builder: Builder,
	garment,
	segments,
}) {
	const builder = new Builder();
	// first segment in list is default selected
	const [{ propName: defaultSelected }] = segments;
	const [selectedSegment, setSelectedSegment] = useState(defaultSelected);
	const { height, width } = builder.size();
	const viewBox = getViewBox({ height, width });
	const garmentStrokes = builder.draw();
	const measurementStrokeMap = builder.drawMeasurements();
	const measurementStrokes = Object.entries(measurementStrokeMap);
	const strokeWidth = height / 100; // @TODO
	const segmentHoverHandler = (event = {}) => {
		setSelectedSegment(event?.target?.dataset?.propname);
		event.stopPropagation();
	};
	return (
		<GarmentViewer
			svgHeader={garment.name}
			textHeader="Measurements"
			svg={
				<SVG
					className={styles.wrapper}
					viewBox={viewBox}
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
				</SVG>
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
