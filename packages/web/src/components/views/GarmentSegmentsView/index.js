import React from 'react';
import { func, string } from 'prop-types';
import cn from 'classnames';
import { SVG } from '@components/ui';
import { getViewBox } from '@utils/drawing';
import styles from './styles.scss';

export function GarmentSegmentsView({
	builder: Builder,
	selectedSegment,
}) {
	const builder = new Builder();
	const { height, width } = builder.size();
	const viewBox = getViewBox({ height, width });
	const garmentStrokes = builder.draw();
	const measurementStrokeMap = builder.drawMeasurements();
	const measurementStrokes = Object.entries(measurementStrokeMap);
	const strokeWidth = height / 100; // @TODO
	return (
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
	);
}

GarmentSegmentsView.propTypes = {
	builder: func.isRequired,
	selectedSegment: string,
};
