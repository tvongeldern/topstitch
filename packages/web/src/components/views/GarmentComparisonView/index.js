import React from 'react';
import { } from 'prop-types';
import { SVG } from '@components/ui';
import { getViewBox } from '@utils/drawing';
import styles from './styles.scss';

const HEIGHT = ({ height }) => height;
const WIDTH = ({ width }) => width;

const getGarmentStrokes = ({ garment }) => garment.draw();

function getSizes({ garment, ...rest }) {
	const { width, height } = garment.size();
	return {
		...rest,
		garment,
		height,
		width,
	};
}

export function GarmentComparisonView({
	builder: Builder,
	measurementSets,
}) {
	if (!measurementSets.length) {
		return <SVG className={styles.wrapper} />;
	}
	const garments = measurementSets.map(({ measurements, ...rest }) => ({
		garment: new Builder(measurements),
		...rest,
	})).map(getSizes);
	const heights = garments.map(HEIGHT);
	const widths = garments.map(WIDTH);
	const tallestGarmentHeight = Math.max(...heights);
	const widestGarmentWidth = Math.max(...widths);
	const viewBox = getViewBox({
		width: widestGarmentWidth,
		height: tallestGarmentHeight,
	});
	const strokeWidth = tallestGarmentHeight / 100;
	// center garments
	garments.forEach(({ garment, height }) => garment.shift({
		y: 0 - (tallestGarmentHeight - height) / 2,
	}));
	//
	const garmentDrawingInstructions = garments.map(getGarmentStrokes);
	return (
		<SVG
			className={styles.wrapper}
			viewBox={viewBox}
			strokeWidth={strokeWidth}
		>
			{garmentDrawingInstructions.map((strokes, index) => (
				<g key={index}>
					{strokes.map(({ draw }) => (
						<path d={draw} key={draw} />
					))}
				</g>
			))}
		</SVG>
	);
}

GarmentComparisonView.propTypes = {};