import React, { useState } from 'react';
import { arrayOf, string } from 'prop-types';
import {
	Column,
	FixedWrapContainer,
	GarmentComparisonView,
	Page,
	Sizechart,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizecharts } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function wrapState([state, setState]) {
	return [
		state,
		({
			defaultSelected: [brandId],
			selectedObject,
		}) => selectedObject.measurements && setState({
			...state,
			[brandId]: selectedObject,
		}),
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
	const [state, setState] = wrapState(
		useState(EMPTY_OBJECT),
	);
	const sizechartsArray = slugs.map((slug) => sizecharts[slug]);
	return (
		<Page title="Compare">
			<FixedWrapContainer>
				<GarmentComparisonView
					measurementSets={Object.values(state)}
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
