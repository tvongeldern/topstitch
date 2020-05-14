import React, { useState } from 'react';
import { } from 'prop-types';
import { TShirt } from '@garment-builders';
import { EMPTY_OBJECT } from '@constants';
import { Sizechart } from '../Sizechart';
import { GarmentComparisonView } from '../GarmentComparisonView';
import styles from './styles.scss';

function wrapState([state, setState]) {
	return [
		state,
		() => ({
			defaultSelected: [brandId],
			selectedObject,
		}) => selectedObject.measurements && setState({
			...state,
			[brandId]: selectedObject,
		}),
	];
}

export function SizechartComparisonView({
	sizecharts,
	units,
}) {
	const [state, ChangeHandler] = wrapState(
		useState(EMPTY_OBJECT),
	);
	return (
		<div className={styles.container}>
			<GarmentComparisonView
				builder={TShirt}
				measurementSets={Object.values(state)}
			/>
			{sizecharts.map((sizechart) => (
				<Sizechart
					key={sizechart.id}
					sizechart={sizechart}
					header={sizechart.name}
					units={units}
					onChange={ChangeHandler(sizechart)}
					browseMode
				/>
			))}
		</div>
	);
}

SizechartComparisonView.propTypes = {};