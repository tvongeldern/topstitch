import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { BrandCreateForm, SearchForm } from '@forms';
import {
	clearCreatedBrand,
	createBrand,
	getMe,
	searchBrands,
} from '@state/actions';
import {
	useActionCreators,
	useSelector,
	useSubmit,
} from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function sizechartsPageSelector({
	auth: { me },
	brands: { brands, created },
}) {
	return { brands, created, me };
}

function navigate({ name }) {
	Router.push(
		'/sizecharts/[slug]',
		`/sizecharts/${name}`,
	);
}

export default function SizechartsPage() {
	const [state, setState] = useState(EMPTY_OBJECT);
	const [dispatchClearCreated, dispatchSearch] = useActionCreators(
		clearCreatedBrand,
		searchBrands,
	);
	const [submitBrand] = useSubmit(
		createBrand,
	);
	const { brands, created, me } = useSelector(
		sizechartsPageSelector,
	);
	useEffect(() => {
		if (created) {
			Router.push(
				'/sizecharts/[slug]/add',
				`/sizecharts/${created}/add`,
			);
			dispatchClearCreated();
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
				me={me}
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
