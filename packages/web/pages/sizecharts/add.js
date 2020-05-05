import React, { useState } from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import { Page, Sizechart } from '@components';
import { BrandCreateForm } from '@forms';
import { useSelector, useSubmit } from '@utils/hooks';
import { 
	createBrand,
} from '@state/actions';

function addSizechartSelector({
	brands: {
		brands,
		created: createdBrand,
	},
}) {
	return {
		brand: brands[createdBrand],
	};
}

export default function AddSizechartPage() {
	const [
		submitBrand,
	] = useSubmit(
		createBrand,
	);
	const { brand } = useSelector(
		addSizechartSelector,
	);
	return (
		<Page title="Add sizechart">
			<Form
				component={BrandCreateForm}
				onSubmit={submitBrand}
			/>

			{brand && (
				<Sizechart
					sizechart={brand}
					onChange={console.log}
				/>
			)}
		</Page>
	);
}
