import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { BrandCreateForm, SearchForm } from '@forms';
import { createBrand, searchBrands } from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function sizechartsPageSelector({
	brands: { brands, created },
}) {
	return { brands, created };
}

function navigate({ name }) {
	Router.push(
		'/sizecharts/[slug]',
		`/sizecharts/${name}`,
	);
}

export default function SizechartsPage() {
	const [state, setState] = useState(EMPTY_OBJECT);
	const [dispatchSearch] = useActionCreators(
		searchBrands,
	);
	const [submitBrand] = useSubmit(
		createBrand,
	);
	const { brands, created } = useSelector(
		sizechartsPageSelector,
	);
	useEffect(() => {
		if (created) {
			Router.push(
				'/sizecharts/[slug]/edit',
				`/sizecharts/${created}/edit`,
			);
		}
	}, [created]);
	return (
		<Page title="Sizecharts">
			<Form
				component={SearchForm}
				onSubmit={navigate}
				search={dispatchSearch}
				brands={brands}
				addSizechart={setState}
			/>
			
			{state.name && (
				<Form
					component={BrandCreateForm}
					onSubmit={submitBrand}
					initialValues={state}
				/>
			)}
		</Page>
	);
}
