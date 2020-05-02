import React, { useState } from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import {
	GarmentComparisonView,
	InteractiveImageViewer,
	Page,
	SizechartSizesComparisonView,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';
import sizechart from './_sizechart.json';
import savedSizes from './_mysavedsizes.json';

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
	const [state, setState] = useState(EMPTY_OBJECT);
	const {
		sizechartSizesView = [],
		savedSizesView = [],
	} = state;

	const viewSizechartSize = ({
		displayName,
		selectedObject: { measurements },
	}) => measurements && setState({
		...state,
		sizechartSizesView: [
			{
				name: displayName,
				measurements,
			}
		],
	});

	const toggleSavedSize = ({
		name,
		measurements,
	}) => setState({
		...state,
		savedSizesView: savedSizesView[0]?.name === name
			? []
			: [{ name, measurements }],
	});

	// const { savedSizes, sizecharts } = useSelector(
	// 	sizechartPageSelector,
	// );
	// const sizechart = sizecharts[slug];

	if (!sizechart) {
		return <Page error="Sizechart not found" />;
	}

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
						onSizechartChange={viewSizechartSize}
						sizechart={sizechart}
						sizes={savedSizes}
						sizesHeader="Saved sizes"
						onSizesChange={toggleSavedSize}
					/>
				}
			/>
		</Page>
	);
}

SizechartPage.populate = [getSizechart];

export default SizechartPage;