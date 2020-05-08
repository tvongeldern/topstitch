import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Page, Sizechart } from '@components';
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
	getAllGarments,
	getSizechart,
	getGarmentSegments,
} from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

const getId = ({ id }) => id;

function GarmentFilter({ garments = [] } = {}) {
	const garmentIds = garments.map(getId);
	return function filterGarment(garment) {
		return !garmentIds.includes(garment.id);
	}
}

function addSizechartSelector({
	collections: { collections },
	garments: { garments },
	fits: { fits },
	sizes: { sizes },
	measurements: { measurements },
	segments: { segments },
	sizecharts: { sizecharts },
}) {
	return {
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
		function updateState({ selectedAttribute, selectedObject }) {
			setState({
				...state,
				selectedAttribute,
				selectedObject,
				[selectedAttribute]: selectedObject.id,
			});
		}
	];
}

export default function AddSizechartPage({ slug }) {
	const [
		{
			selectedAttribute,
			selectedObject,
			...state
		},
		updateState,
	] = stateUpdater(
		useState(EMPTY_OBJECT),
	);

	const [
		dispatchGetSizechart,
		dispatchGetGarmentSegments,
	] = useActionCreators(
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

	const {
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

	useEffect(() => {
		dispatchGetSizechart({ slug });
	}, [collections, fits, garments, sizes, measurements, segments]);

	useEffect(() => {
		if (selectedAttribute === 'garment') {
			const { slug } = garments[state.garment];
			dispatchGetGarmentSegments({ slug });
		}
	}, [selectedAttribute]);

	return (
		<Page title="Add sizechart">

			{selectedAttribute === 'brand' && (
				<Form
					component={CollectionCreateForm}
					onSubmit={submitCollection}
					initialValues={{ brand: selectedObject }}
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
					initialValues={{ fitId: selectedObject.id }}
				/>
			)}

			{selectedAttribute === 'size' && (
				<Form
					component={MeasurementCreateForm}
					onSubmit={submitMeasurement}
					segments={Object.values(segments)}
					initialValues={{ sizeId: selectedObject.id }}
				/>
			)}

			{sizechart && (
				<Sizechart
					sizechart={sizechart}
					onChange={updateState}
					initialValues={{ selected: sizechart.id }}
					hideRows={['brands']}
				/>
			)}

		</Page>
	);
}

AddSizechartPage.populate = [getAllGarments];
