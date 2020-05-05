import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Page, Sizechart } from '@components';
import {
	BrandCreateForm,
	CollectionCreateForm,
} from '@forms';
import { 
	createBrand,
	createCollection,
} from '@state/actions';
import { useSelector, useSubmit } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function reduceSizechart(sizchart, [attributeName, store]) {
	return {
		...sizchart,
		[attributeName]: Object.values(store),
	};
}

function addSizechartSelector({
	brands: {
		brands,
		created: createdBrand,
	},
	collections: {
		collections,
	},
}) {
	const brand = brands[createdBrand];
	const sizechart = Object.entries({
		collections,
	}).reduce(reduceSizechart, brand);
	return { sizechart };
}

export default function AddSizechartPage() {
	const [{
		selectedAttribute,
		selectedObject,
	}, setState] = useState(EMPTY_OBJECT);
	const [
		submitBrand,
		submitCollection,
	] = useSubmit(
		createBrand,
		createCollection,
	);
	const { sizechart } = useSelector(
		addSizechartSelector,
	);
	return (
		<Page title="Add sizechart">
			{(!selectedAttribute || selectedAttribute === 'brand') && (
				<Form
					component={BrandCreateForm}
					onSubmit={submitBrand}
				/>
			)}

			{selectedAttribute === 'collection' && (
				<Form
					component={CollectionCreateForm}
					onSubmit={submitCollection}
					// initialValues={{ brandId: selectedObject.id }}
				/>
			)}

			{sizechart && (
				<Sizechart
					sizechart={sizechart}
					onChange={setState}
				/>
			)}
		</Page>
	);
}
