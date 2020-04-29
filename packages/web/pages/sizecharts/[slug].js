import React, { useState } from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import {
	GarmentComparisonView,
	InteractiveImageViewer,
	Page,
	Sizechart,
} from '@components';
import { TShirt } from '@garment-builders';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

const sizechart = {
	id: "c6112d01-de5b-41df-bfb6-2cd0b952c632",
	name: "Nike",
	collections: [
		{
			id: "fa97b922-a8a1-4a13-a3c0-d296940be6c4",
			name: "Mens",
			garments: [
				{
					id: "7e9fb310-f2c7-437d-bc54-7bce9f165aa7",
					name: "T Shirt",
					fits: [
						{
							id: "46c59622-1f6f-444d-a9c5-51aa423c7a68",
							name: "Slim",
							sizes: [
								{
									id: "0d1a775d-564f-4af6-9f6c-2ddc3ee999a6",
									name: "Medium",
									measurements: [
										{
											average: 39,
											id: "3e237533-8664-44c9-aaf0-e950ac315458",
											segment: {
												id: "694b5e0d-5079-4390-b7a3-9f8de2fa484a",
												name: "Hip",
												propName: "hipWidth",
											}
										},
										{
											average: 48,
											id: "abc37533-8664-44c9-aaf0-e950ac3abcde",
											segment: {
												id: "123b5e0d-5079-4390-b7a3-9f8de2fa1abc",
												name: "Chest",
												propName: "chestWidth",
											},
										},
									]
								},
								{
									id: "0d1a775d-564f-4af6-9f6c-2ddc3ee666a6",
									name: "Small",
									measurements: [
										{
											average: 32,
											id: "3e237533-8664-44c9-aaf0-e950ac315499",
											segment: {
												id: "694b5e0d-5079-4390-b7a3-9f8de2fa484a",
												name: "Hip",
												propName: "hipWidth",
											}
										},
										{
											average: 42,
											id: "abc37533-8664-44c9-aaf0-e950ac3abc69",
											segment: {
												id: "123b5e0d-5079-4390-b7a3-9f8de2fa1abc",
												name: "Chest",
												propName: "chestWidth",
											},
										},
									]
								}
							]
						}
					]
				}
			]
		},
		{
			id: "fa97b922-a8a1-4a13-a3c0-d2969408bcc4",
			name: "Womens",
		}
	]
};

function sizechartPageSelector({
	sizecharts: {
		sizecharts
	},
}) {
	return { sizecharts };
}

function SizechartPage({ slug }) {
	const [state, setState] = useState(EMPTY_OBJECT);
	const addMeasurementSet = ({ displayName, measurements }) => setState({
		...state,
		[displayName]: measurements,
	});
	const { sizecharts } = useSelector(
		sizechartPageSelector,
	);
	// const sizechart = sizecharts[slug];
	if (!sizechart) {
		return <Page error="Sizechart not found" />;
	}
	const measurementSets = Object.entries(state).map(([name, measurements]) => ({
		measurements,
		name,
	}));
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
					<Sizechart
						onChange={addMeasurementSet}
						sizechart={sizechart}
						browseMode
					/>
				}
			/>
		</Page>
	);
}

SizechartPage.populate = [getSizechart];

export default SizechartPage;