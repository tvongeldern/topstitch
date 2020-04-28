import React from 'react';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { Page, Sizechart } from '@components';
import { SearchForm } from '@forms';
import { searchBrands } from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';

function sizechartsPageSelector({
	brands: { brands },
}) {
	return { brands };
}

function navigate({ q }) {
	Router.push(
		'/sizecharts/[slug]',
		`/sizecharts/${q}`,
	);
}

export default function SizechartsPage() {
	const [dispatchSearch] = useActionCreators(
		searchBrands
	);
	const { brands } = useSelector(
		sizechartsPageSelector,
	);
	return (
		<Page title="Sizecharts">
			<Form
				component={SearchForm}
				onSubmit={navigate}
				search={dispatchSearch}
				brands={brands}
			/>
			{/* <Sizechart onChange={console.log} sizechart={sizechart} /> */}
		</Page>
	);
}
