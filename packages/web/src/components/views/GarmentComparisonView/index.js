import React from 'react';
import { } from 'prop-types';
import { GarmentViewer } from '@components/layout';
import { greatestAbsoluteValue } from '@utils/simpleFunctions';
import styles from './styles.scss';

function getCombinedViewBox(garments) {
	return garments.reduce((viewBoxItems, garment) => {
		const { viewBox } = garment.getBounds();
		const items = viewBox.split(' ');
		return items.map((item, index) => greatestAbsoluteValue(
			item,
			viewBoxItems[index],
		));
	}, []).join(' ');
}

const DRAW = (garment) => garment.draw();

export function GarmentComparisonView({
	builder: Builder,
	segments,
	garment,
	measurementSets,
}) {
	const garments = measurementSets.map((measurments) => new Builder(measurments));
	const viewBox = getCombinedViewBox(garments);
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
			{garmentDrawingInstructions.map((strokes) => (
				<g>
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