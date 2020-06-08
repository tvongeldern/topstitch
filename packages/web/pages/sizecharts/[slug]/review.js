import React from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { ReviewWizard } from '@forms';
import { addReview, getSizechart } from '@state/actions';
import { useSelector, useSubmit } from '@utils/hooks';

function sizechartPageSelector({
	auth: { me },
	sizecharts: { sizecharts },
}) {
	return { me, sizecharts };
}

function ReviewSizechartPage({ slug }) {
	const [submitReview] = useSubmit(addReview);
	const { me, sizecharts } = useSelector(
		sizechartPageSelector,
	);
	const sizechart = sizecharts[slug];
	if (!sizechart) {
		return <Page error="Sizechart not found" />;
	}
	return (
		<Page title={`Review ${sizechart.name}`}>
			<Form
				component={ReviewWizard}
				onSubmit={submitReview}
				sizechart={sizechart}
				initialValues={{ brand: sizechart.id }}
				showNameField={!me.name}
			/>
		</Page>
	);
}

ReviewSizechartPage.populate = [getSizechart];

ReviewSizechartPage.propTypes = {
	slug: string.isRequired,
};

export default ReviewSizechartPage;
