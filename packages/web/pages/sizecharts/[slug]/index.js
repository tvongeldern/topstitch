import React, { useState } from 'react';
import { string } from 'prop-types';
import {
	FixedWrapContainer,
	GarmentComparisonView,
	Page,
	Sizechart,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@constants';
// import savedSizes from '../../../dev/mocks/_mysavedsizes.json';
// import sizechart from '../../../dev/mocks/_sizechart.json';

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
		savedSizes,
		units,
	},
	sizecharts: {
		sizecharts
	},
}) {
	return {
		savedSizes,
		sizecharts,
		units,
	};
}

function SizechartPage({ slug }) {
	const { savedSizes, sizecharts, units } = useSelector(
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

	return (
		<Page title={slug}>
			<FixedWrapContainer>
				<GarmentComparisonView
					builder={TShirt}
					measurementSets={Object.values(measurementSets)}
				/>

				<Sizechart
					sizechart={sizechart}
					onChange={updateState}
					units={units}
					initialValues={{ selected }}
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
