import React, { useState } from 'react';
import { string } from 'prop-types';
import {
	FixedWrapContainer,
	GarmentComparisonView,
	Loading,
	Page,
	Sizechart,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';

function updateState({
	defaultSelected,
	selectedObject,
	state,
}) {
	const selected = defaultSelected.join(Sizechart.DIVIDER);
	if (selectedObject.measurements) {
		const [brandId] = defaultSelected;
		return {
			...state,
			selected,
			[brandId]: selectedObject,
		};
	}
	return {
		...state,
		selected,
	};
}

function wrapState([state, setState]) {
	return [
		state,
		({
			defaultSelected,
			selectedObject,
		}) => setState(
			updateState({
				defaultSelected,
				selectedObject,
				state,
			}),
		),
	];
}

function sizechartPageSelector({
	auth: {
		units,
	},
	sizecharts: {
		sizecharts
	},
}) {
	return {
		sizecharts,
		units,
	};
}

function SizechartPage({ slug }) {
	const { sizecharts, units } = useSelector(
		sizechartPageSelector,
	);
	const sizechart = sizecharts[slug];

	if (!sizechart) {
		return <Page error="Sizechart not found" />;
	}

	const [
		{
			selected,
			...measurementSets
		},
		updateState,
	] = wrapState(
		useState({ selected: sizechart.id }),
	);

	const measurementSetsArray = Object.values(measurementSets);

	return (
		<Page title={sizechart.name}>
			<FixedWrapContainer>
				{measurementSetsArray.length ? (
					<GarmentComparisonView
						builder={TShirt}
						measurementSets={measurementSetsArray}
					/>
				) : (
					<Loading size="240" />
				)}

				<Sizechart
					sizechart={sizechart}
					onChange={updateState}
					units={units}
					initialValues={{ selected }}
					header={sizechart.name}
					browseMode
				/>
			</FixedWrapContainer>
		</Page>
	);
}

SizechartPage.populate = [getSizechart];

SizechartPage.propTypes = {
	slug: string.isRequired,
};

export default SizechartPage;
