import React from 'react';
import { } from 'prop-types';
import { GarmentViewer } from '@components/layout';
import { getViewBox } from '@utils/drawing';
import styles from './styles.scss';

const DRAW = (garment) => garment.draw();
const SIZE = (garment) => garment.size();
const HEIGHT = ({ height }) => height;
const WIDTH = ({ width }) => width;


export function GarmentComparisonView({
	builder: Builder,
	segments,
	garment,
	measurementSets,
}) {
	const garments = measurementSets.map((measurments) => new Builder(measurments));
	const sizes = garments.map(SIZE);
	const heights = sizes.map(HEIGHT);
	const widths = sizes.map(WIDTH);
	const maxHeight = Math.max(...heights);
	const maxWidth = Math.max(...widths);
	const viewBox = getViewBox({
		width: maxWidth,
		height: maxHeight,
	});
	const garmentDrawingInstructions = garments.map(DRAW);
	const svg = (
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
			{garmentDrawingInstructions.map((strokes, index) => (
				<g key={index}>
					{strokes.map(({ draw }) => (
						<path d={draw} key={draw} />
					))}
				</g>
			))}
		</svg>
	);
	return (
		<GarmentViewer
			svgHeader="Compare"
			textHeader="Compare"
			svg={svg}
			textModule={<div/>}
		/>
	);
}

GarmentComparisonView.propTypes = {};