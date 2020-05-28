import React, { useState } from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { ReviewWizard } from '@forms';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function sizechartPageSelector({
	auth: { units },
	sizecharts: { sizecharts },
}) {
	return { sizecharts, units };
}

function ReviewSizechartPage({ slug }) {
	const [state, setState] = useState(EMPTY_OBJECT);
	const { sizecharts, units } = useSelector(
		sizechartPageSelector,
	);
	const sizechart = sizecharts[slug];
	return (
		<Page title={`Review ${sizechart.name}`}>
			<Form
				component={ReviewWizard}
				onSubmit={console.log}
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