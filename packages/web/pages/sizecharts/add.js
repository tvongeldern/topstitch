import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import { Page, Sizechart } from '@components';
import { BrandCreateForm } from '@forms';
import { 
	createBrand,
} from '@state/actions';
import { useSelector, useSubmit } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

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
	const [{ selectedAttribute }, setState] = useState(EMPTY_OBJECT);
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
			{(!selectedAttribute || selectedAttribute === 'brand') && (
				<Form
					component={BrandCreateForm}
					onSubmit={submitBrand}
				/>
			)}

			{brand && (
				<Sizechart
					sizechart={brand}
					onChange={setState}
				/>
			)}
		</Page>
	);
}
