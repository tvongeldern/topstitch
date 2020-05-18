import React, { useState } from 'react';
import { arrayOf, string } from 'prop-types';
import {
	Column,
	FixedWrapContainer,
	SizeComparisonView,
	Page,
	Sizechart,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizecharts } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

const INITIAL_STATE = {
	formValues: {},
	measurementSets: {},
};

function wrapState([state, setState]) {
	return [
		state,
		({
			defaultSelected,
			selectedObject,
		}) => {
			const [brandId] = defaultSelected;
			if (selectedObject.measurements) {
				setState({
					...state,
					measurementSets: {
						...state.measurementSets,
						[brandId]: selectedObject,
					},
				});
			} else {
				setState({
					...state,
					formValues: {
						...state.formValues,
						[brandId]: defaultSelected.join(Sizechart.DIVIDER),
					},
				});
			}
		},
	];
}

function comparePageSelector({
	auth: { units },
	sizecharts: { sizecharts },
}) {
	return { sizecharts, units };
}

function CompareSizechartsPage({ slugs }) {
	const { sizecharts, units } = useSelector(
		comparePageSelector,
	);
	const [
		{ formValues, measurementSets },
		setState,
	] = wrapState(
		useState(INITIAL_STATE),
	);
	const sizechartsArray = slugs.map((slug) => sizecharts[slug]);
	return (
		<Page title="Compare">
			<FixedWrapContainer>
				<SizeComparisonView
					measurementSets={Object.values(measurementSets)}
					builder={TShirt}
				/>
				<Column>
					{sizechartsArray.map((sizechart) => (
						<Sizechart
							key={sizechart.id}
							header={sizechart.name}
							sizechart={sizechart}
							onChange={setState}
							units={units}
							initialValues={{ selected: formValues[sizechart.id] || sizechart.id }}
							browseMode
						/>
					))}
				</Column>
			</FixedWrapContainer>
		</Page>
	);
}

CompareSizechartsPage.populate = [
	getSizecharts,
];

CompareSizechartsPage.propTypes = {
	slugs: arrayOf(string).isRequired,
};

export default CompareSizechartsPage;
