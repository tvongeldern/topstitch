import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Page, Sizechart } from '@components';
import {
	BrandCreateForm,
	CollectionCreateForm,
	CollectionGarmentForm,
	FitCreateForm,
	SizeCreateForm,
	MeasurementCreateForm,
} from '@forms';
import { 
	addGarmentToCollection,
	createBrand,
	createCollection,
	createFit,
	createSize,
	createMeasurement,
	getAllGarments,
	getSizechart,
} from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function addSizechartSelector({
	brands: {
		brands,
		created: createdBrand,
	},
	collections: { collections },
	garments: { garments },
	sizecharts: { sizecharts },
}) {
	return {
		brands,
		collections,
		garments,
		//
		createdBrand,
		sizechart: sizecharts[createdBrand] || brands[createdBrand],
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

export default function AddSizechartPage() {
	const [
		{ selectedAttribute, selectedObject },
		updateState,
	] = stateUpdater(
		useState(EMPTY_OBJECT),
	);
	const [dispatchGetSizechart] = useActionCreators(getSizechart);
	const [
		submitBrand,
		submitCollection,
		submitGarment,
		submitFit,
		submitSize,
		submitMeasurement,
	] = useSubmit(
		createBrand,
		createCollection,
		addGarmentToCollection,
		createFit,
		createSize,
		createMeasurement,
	);
	const {
		brands,
		collections,
		garments,
		sizechart,
		createdBrand,
	} = useSelector(
		addSizechartSelector,
	);
	useEffect(() => {
		if (createdBrand) {
			dispatchGetSizechart({ id: createdBrand });
		}
	},[brands, collections, garments]);
	return (
		<Page title="Add sizechart">
			{(!selectedAttribute) && (
				<Form
					component={BrandCreateForm}
					onSubmit={submitBrand}
				/>
			)}

			{selectedAttribute === 'brand' && (
				<Form
					component={CollectionCreateForm}
					onSubmit={submitCollection}
					initialValues={{ brandId: selectedObject.id }}
				/>
			)}

			{selectedAttribute === 'collection' && (
				<Form
					component={CollectionGarmentForm}
					onSubmit={submitGarment}
					garments={Object.values(garments)}
					initialValues={{ id: selectedObject.id }}
				/>
			)}

			{selectedAttribute === 'garment' && (
				<Form
					component={FitCreateForm}
					onSubmit={submitFit}
				/>
			)}

			{selectedAttribute === 'fit' && (
				<Form
					component={SizeCreateForm}
					onSubmit={submitSize}
				/>
			)}

			{selectedAttribute === 'size' && (
				<Form
					component={MeasurementCreateForm}
					onSubmit={submitMeasurement}
				/>
			)}

			{sizechart && (
				<Sizechart
					sizechart={sizechart}
					onChange={updateState}
				/>
			)}
		</Page>
	);
}

AddSizechartPage.populate = [getAllGarments];
