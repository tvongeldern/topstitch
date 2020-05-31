import React from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { ReviewWizard } from '@forms';
import { addReview, getSizechart } from '@state/actions';
import { useSelector, useSubmit } from '@utils/hooks';

function sizechartPageSelector({
	auth: { units },
	sizecharts: { sizecharts },
}) {
	return {
		sizecharts,
		units,
	};
}

function ReviewSizechartPage({ slug }) {
	const [submitReview] = useSubmit(addReview);
	const { sizecharts, units } = useSelector(
		sizechartPageSelector,
	);
	const sizechart = sizecharts[slug];
	return (
		<Page title={`Review ${sizechart.name}`}>
			<Form
				component={ReviewWizard}
				onSubmit={submitReview}
				sizechart={sizechart}
				units={units}
			/>
		</Page>
	);
}

ReviewSizechartPage.populate = [getSizechart];

ReviewSizechartPage.propTypes = {
	slug: string.isRequired,
};

export default ReviewSizechartPage;
