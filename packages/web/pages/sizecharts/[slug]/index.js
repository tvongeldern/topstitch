import React, { useState } from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import Router from 'next/router';
import {
	Column,
	FixedWrapContainer,
	SizeComparisonView,
	Loading,
	Page,
	ReviewSizechartCta,
	Sizechart,
} from '@components';
import { BrandCompareToForm } from '@forms'
import { TShirt } from '@garment-builders';
import { getSizechart, searchBrands } from '@state/actions';
import { useActionCreators, useSelector } from '@utils/hooks';

function updateState({
	defaultSelected,
	selectedObject,
	state,
}) {
	const selected = defaultSelected.join(Sizechart.DIVIDER);
	if (selectedObject.measurements) {
		const [brandId] = defaultSelected;
		return {
			...state,
			selected,
			[brandId]: selectedObject,
		};
	}
	return {
		...state,
		selected,
	};
}

function wrapState([state, setState]) {
	return [
		state,
		({
			defaultSelected,
			selectedObject,
		}) => setState(
			updateState({
				defaultSelected,
				selectedObject,
				state,
			}),
		),
	];
}

function sizechartPageSelector({
	auth: { units },
	brands: { brands },
	sizecharts: { sizecharts },
}) {
	return {
		brands,
		sizecharts,
		units,
	};
}

function SizechartPage({ slug }) {
	const [dispatchSearch] = useActionCreators(
		searchBrands,
	);
	const { brands, sizecharts, units } = useSelector(
		sizechartPageSelector,
	);
	const sizechart = sizecharts[slug];

	if (!sizechart) {
		return <Page error="Sizechart not found" />;
	}

	const [
		{
			selected,
			...measurementSets
		},
		updateState,
	] = wrapState(
		useState({ selected: sizechart.id }),
	);

	const measurementSetsArray = Object.values(measurementSets);

	return (
		<Page title={sizechart.name}>
			<FixedWrapContainer>
				{measurementSetsArray.length ? (
					<SizeComparisonView
						builder={TShirt}
						measurementSets={measurementSetsArray}
					/>
				) : (
					<Loading size="240" />
				)}

				<Column>
					<Sizechart
						sizechart={sizechart}
						onChange={updateState}
						units={units}
						initialValues={{ selected }}
						header={sizechart.name}
						browseMode
					/>

					<Form
						component={BrandCompareToForm}
						search={dispatchSearch}
						brands={brands}
						onSubmit={({ name }) => Router.push(
							'/compare/[...slugs]',
							`/compare/${slug}/${name}`,
						)}
					/>

					<ReviewSizechartCta sizechartSlug={slug} />

				</Column>
			</FixedWrapContainer>
		</Page>
	);
}

SizechartPage.populate = [getSizechart];

SizechartPage.propTypes = {
	slug: string.isRequired,
};

export default SizechartPage;
