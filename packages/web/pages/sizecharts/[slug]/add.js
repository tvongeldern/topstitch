import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import Router from 'next/router';
import {
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
	deleteCollection,
	deleteFit,
	deleteSize,
	deleteMeasurement,
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
	auth: { units },
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
		units,
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
		units,
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
		dispatchDeleteCollection,
		dispatchDeleteFit,
		dispatchDeleteSize,
		dispatchDeleteMeasurement,
		dispatchGetSizechart,
		dispatchGetGarmentSegments,
	] = useActionCreators(
		deleteBrand,
		deleteCollection,
		deleteFit,
		deleteSize,
		deleteMeasurement,
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
					deleteCollection={dispatchDeleteCollection}
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
					deleteFit={dispatchDeleteFit}
					existing={selectedObject.sizes}
					initialValues={{ fit: selectedObject }}
				/>
			)}

			{selectedAttribute === 'size' && (
				<Form
					component={MeasurementCreateForm}
					onSubmit={submitMeasurement}
					deleteSize={dispatchDeleteSize}
					segments={Object.values(segments)}
					garment={garments[state.garment]}
					initialValues={{ size: selectedObject, units }}
				/>
			)}

			{selectedAttribute === 'measurement' && (
				<form>
					{selectedObject?.segment && (
						<a onClick={() => dispatchDeleteMeasurement(selectedObject)}>
							{`Delete ${selectedObject.segment.name} measurement`}
						</a>
					)}
				</form>
			)}

			<Sizechart
				sizechart={sizechart}
				onChange={updateState}
				initialValues={{ selected }}
				units={units}
			/>
		</Page>
	);
}

AddSizechartPage.populate = [
	getAllGarments,
	getSizechart,
];
