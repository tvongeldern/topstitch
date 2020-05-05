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
import savedSizes from '../../dev/mocks/_mysavedsizes.json';
import sizechart from '../../dev/mocks/_sizechart.json';

function sizechartPageSelector({
	auth: {
		savedSizes,
	},
	sizecharts: {
		sizecharts
	},
}) {
	return {
		savedSizes,
		sizecharts,
	};
}

function SizechartPage({ slug }) {
	// const { savedSizes, sizecharts } = useSelector(
	// 	sizechartPageSelector,
	// );
	// const sizechart = sizecharts[slug];

	if (!sizechart) {
		return <Page error="Sizechart not found" />;
	}

	const [state, setState] = useState(EMPTY_OBJECT);
	const {
		sizechartSizesView = EMPTY_ARRAY,
		savedSizesView = EMPTY_ARRAY,
	} = state;

	const sizechartChangeHandler = ({
		displayName,
		selectedObject: { id, measurements },
	}) => measurements && setState({
		...state,
		sizechartSizesView: [
			{
				id,
				measurements,
				name: displayName,
			},
		],
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
						//
						selectedSavedSize={savedSizesView[0]}
						selectedSizechartSize={sizechartSizesView[0]}
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
