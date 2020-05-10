import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import Router from 'next/router';
import {
	FormSizechartContainer,
	Loading,
	Page,
	Sizechart,
} from '@components';
import {
	CollectionCreateForm,
	CollectionGarmentForm,
	FitCreateForm,
	SizeCreateForm,
	MeasurementCreateForm,
} from '@forms';
import { 
	addGarmentToCollection,
	createCollection,
	createFit,
	createSize,
	createMeasurement,
	deleteBrand,
	getAllGarments,
	getSizechart,
	getGarmentSegments,
} from '@state/actions';
import {
	RETURN_ID,
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils';

function GarmentFilter({ garments = [] } = {}) {
	const garmentIds = garments.map(RETURN_ID);
	return function filterGarment(garment) {
		return !garmentIds.includes(garment.id);
	}
}

function addSizechartSelector({
	brands: { brands },
	collections: { collections },
	garments: { garments },
	fits: { fits },
	sizes: { sizes },
	measurements: { measurements },
	segments: { segments },
	sizecharts: { sizecharts },
}) {
	return {
		brands,
		collections,
		garments,
		fits,
		sizes,
		measurements,
		segments,
		sizecharts,
	};
}

function stateUpdater([state, setState]) {
	return [
		state,
		function updateState({
			defaultSelected,
			parents: [brand, collection, garment, fit, size],
			selectedAttribute,
			selectedObject,
		}) {
			setState({
				brand,
				collection,
				garment,
				fit,
				size,
				selectedAttribute,
				selectedObject,
				[selectedAttribute]: selectedObject.id,
				selected: defaultSelected.join(Sizechart.DIVIDER),
			});
		}
	];
}

export default function AddSizechartPage({ slug }) {
	const {
		brands,
		collections,
		garments,
		fits,
		sizes,
		measurements,
		segments,
		//
		sizecharts,
	} = useSelector(
		addSizechartSelector,
	);
	const sizechart = sizecharts[slug];

	const [
		{
			selectedAttribute,
			selectedObject,
			selected,
			...state
		},
		updateState,
	] = stateUpdater(
		useState({ selected: sizechart?.id, }),
	);

	const [
		dispatchDeleteBrand,
		dispatchGetSizechart,
		dispatchGetGarmentSegments,
	] = useActionCreators(
		deleteBrand,
		getSizechart,
		getGarmentSegments,
	);
	const [
		submitCollection,
		submitGarment,
		submitFit,
		submitSize,
		submitMeasurement,
	] = useSubmit(
		createCollection,
		addGarmentToCollection,
		createFit,
		createSize,
		createMeasurement,
	);

	// Refresh sizechart whenever a store is updated
	useEffect(() => {
		dispatchGetSizechart({ slug });
	}, [brands, collections, fits, garments, sizes, measurements, segments]);

	// Go back to sizecharts browser if no sizechart is present
	useEffect(() => {
		if (!sizechart) {
			Router.push('/sizecharts');
		}
	}, [sizechart]);

	// Fetch all garment segments when it is time to do so
	useEffect(() => {
		if (selectedAttribute === 'size') {
			dispatchGetGarmentSegments(
				garments[state.garment],
			);
		}
	}, [selectedAttribute]);

	if (!sizechart) {
		return (
			<Page title="Loading">
				<Loading size={200} />
			</Page>
		);
	}

	return (
		<Page title="Add sizechart">
			<FormSizechartContainer>
				<>
					{!selectedAttribute && <form />}

					{selectedAttribute === 'brand' && (
						<Form
							component={CollectionCreateForm}
							onSubmit={submitCollection}
							initialValues={{ brand: selectedObject }}
							deleteBrand={dispatchDeleteBrand}
						/>
					)}

					{selectedAttribute === 'collection' && (
						<Form
							component={CollectionGarmentForm}
							onSubmit={submitGarment}
							initialValues={{ collection: selectedObject }}
							garments={Object.values(garments)
								.filter(
									GarmentFilter(
										selectedObject,
									),
								)}
						/>
					)}

					{selectedAttribute === 'garment' && (
						<Form
							component={FitCreateForm}
							onSubmit={submitFit}
							collections={collections}
							initialValues={{
								garment: selectedObject,
								collectionId: state.collection,
							}}
						/>
					)}

					{selectedAttribute === 'fit' && (
						<Form
							component={SizeCreateForm}
							onSubmit={submitSize}
							existing={selectedObject.sizes}
							initialValues={{ fitId: selectedObject.id }}
						/>
					)}

					{selectedAttribute === 'size' && (
						<Form
							component={MeasurementCreateForm}
							onSubmit={submitMeasurement}
							segments={Object.values(segments)}
							garment={garments[state.garment]}
							initialValues={{ sizeId: selectedObject.id }}
						/>
					)}

					<Sizechart
						sizechart={sizechart}
						onChange={updateState}
						initialValues={{ selected }}
					/>
				</>
			</FormSizechartContainer>
		</Page>
	);
}

AddSizechartPage.populate = [
	getAllGarments,
	getSizechart,
];
