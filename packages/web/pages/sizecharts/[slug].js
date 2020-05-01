import React, { useState } from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import {
	GarmentComparisonView,
	InteractiveImageViewer,
	Page,
	SizesBrowser,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';
import sizechart from './_json.json';

function formatMeasurementSetEntry([name, measurements]) {
	return {
		name,
		measurements,
	};
}

function sizechartPageSelector({
	sizecharts: {
		sizecharts
	},
}) {
	return { sizecharts };
}

function SizechartPage({ slug }) {
	const [state, setState] = useState(EMPTY_OBJECT);

	const viewMeasurementSet = ({
		displayName,
		selectedObject: { measurements },
	}) => measurements && setState({
		[displayName]: measurements,
	});

	const { sizecharts } = useSelector(
		sizechartPageSelector,
	);
	// const sizechart = sizecharts[slug];

	if (!sizechart) {
		return <Page error="Sizechart not found" />;
	}

	const measurementSets = Object.entries(state)
		.map(formatMeasurementSetEntry);

	return (
		<Page title={slug}>
			<InteractiveImageViewer
				textHeader="Sizechart"
				svgHeader="Compare"
				svg={
					<GarmentComparisonView
						builder={TShirt}
						measurementSets={measurementSets}
					/>
				}
				textModule={
					<SizesBrowser
						measurementSets={measurementSets}
						sizechart={sizechart}
						viewMeasurementSet={viewMeasurementSet}
					/>
				}
			/>
		</Page>
	);
}

SizechartPage.populate = [getSizechart];

export default SizechartPage;