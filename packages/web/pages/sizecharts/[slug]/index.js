import React, { useState } from 'react';
import { string } from 'prop-types';
import {
	GarmentComparisonView,
	InteractiveImageViewer,
	Page,
	SizechartSizesComparisonView,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@constants';
// import savedSizes from '../../../dev/mocks/_mysavedsizes.json';
// import sizechart from '../../../dev/mocks/_sizechart.json';

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

	const [state, setState] = useState(EMPTY_OBJECT);
	const {
		sizechartSizesView = EMPTY_ARRAY,
		savedSizesView = EMPTY_ARRAY,
		defaultSelected = [sizechart.id],
	} = state;

	const sizechartChangeHandler = ({
		defaultSelected,
		displayName,
		selectedObject: { id, measurements },
	}) => setState({
		...state,
		defaultSelected,
		sizechartSizesView: measurements
		? [
				{
					id,
					measurements,
					name: displayName,
				},
			]
		: state.sizechartSizesView,
	});

	const sizeChangeHandler = ({
		id,
		name,
		measurements,
	}) => setState({
		...state,
		savedSizesView: savedSizesView[0]?.name === name
			? []
			: [{ id, measurements, name }],
	});

	return (
		<Page title={slug}>
			<InteractiveImageViewer
				svg={
					<GarmentComparisonView
						builder={TShirt}
						measurementSets={[
							...sizechartSizesView,
							...savedSizesView,
						]}
					/>
				}
				textModule={
					<SizechartSizesComparisonView
						sizesHeader="My saved sizes"
						sizechart={sizechart}
						sizes={savedSizes}
						onSizechartChange={sizechartChangeHandler}
						onSizesChange={sizeChangeHandler}
						defaultSelected={defaultSelected}
						//
						selectedSavedSize={savedSizesView[0]}
						selectedSizechartSize={sizechartSizesView[0]}
						units={units}
					/>
				}
			/>
		</Page>
	);
}

SizechartPage.populate = [getSizechart];

SizechartPage.propTypes = {
	slug: string.isRequired,
};

export default SizechartPage;
