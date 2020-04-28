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

const sizechart = {
	id: "c6112d01-de5b-41df-bfb6-2cd0b952c632",
	name: "Brand 1588073584009",
	collections: [
		{
			id: "fa97b922-a8a1-4a13-a3c0-d296940be6c4",
			name: "Mens",
			garments: [
				{
					id: "7e9fb310-f2c7-437d-bc54-7bce9f165aa7",
					name: "Shirt 1588073584009",
					fits: [
						{
							id: "46c59622-1f6f-444d-a9c5-51aa423c7a68",
							name: "Fit",
							sizes: [
								{
									id: "0d1a775d-564f-4af6-9f6c-2ddc3ee999a6",
									name: "Medium",
									measurements: [
										{
											average: 39,
											id: "3e237533-8664-44c9-aaf0-e950ac315458",
											segment: {
												id: "694b5e0d-5079-4390-b7a3-9f8de2fa484a",
												name: "Hip"
											}
										},
										{
											average: 48,
											id: "abc37533-8664-44c9-aaf0-e950ac3abcde",
											segment: {
												id: "123b5e0d-5079-4390-b7a3-9f8de2fa1abc",
												name: "Chest"
											},
										},
									]
								},
								{
									id: "0d1a775d-564f-4af6-9f6c-2ddc3ee666a6",
									name: "Small",
									measurements: [
										{
											average: 32,
											id: "3e237533-8664-44c9-aaf0-e950ac315499",
											segment: {
												id: "694b5e0d-5079-4390-b7a3-9f8de2fa484a",
												name: "Hip"
											}
										},
										{
											average: 42,
											id: "abc37533-8664-44c9-aaf0-e950ac3abc69",
											segment: {
												id: "123b5e0d-5079-4390-b7a3-9f8de2fa1abc",
												name: "Chest"
											},
										},
									]
								}
							]
						}
					]
				}
			]
		},
		{
			id: "fa97b922-a8a1-4a13-a3c0-d2969408bcc4",
			name: "Womens",
		}
	]
};

function sizechartsPageSelector({
	brands: { brands },
}) {
	return { brands };
}

function navigate({ q }) {
	Router.push({
		url: '/sizecharts/[slug]',
		as: `/sizecharts/${q}`,
	});
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
