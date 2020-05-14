import React from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import {
	Page,
	SizechartComparisonView,
} from '@components';
import { getSizecharts } from '@state/actions';
import { useSelector } from '@utils/hooks';

function comparePageSelector({
	auth: { units },
	sizecharts: { sizecharts },
}) {
	return { sizecharts, units };
}

function CompareSizechartsPage({ slugs }) {
	const { sizecharts, units } = useSelector(
		comparePageSelector,
	);
	const sizechartsArray = slugs.map((slug) => sizecharts[slug]);
	return (
		<Page title="Compare">
			<SizechartComparisonView
				sizecharts={sizechartsArray}
				units={units}
			/>
		</Page>
	);
}

CompareSizechartsPage.populate = [
	getSizecharts,
];

export default CompareSizechartsPage;