import React, { useEffect } from 'react';
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

function sizechartsPageSelector({
	brands: { brands, created },
}) {
	return { brands, created };
}

function navigate({ q }) {
	Router.push(
		'/sizecharts/[slug]',
		`/sizecharts/${q}`,
	);
}

export default function SizechartsPage() {
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
			/>
			
			<Form
				component={BrandCreateForm}
				onSubmit={submitBrand}
			/>
		</Page>
	);
}
