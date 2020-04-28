import React from 'react';
import { string } from 'prop-types';
import { Form } from 'react-final-form';
import { Page, Sizechart } from '@components';
import { getSizechart } from '@state/actions';
import { useSelector } from '@utils/hooks';

function getSizecharts({ sizecharts: { sizecharts } }) {
	return { sizecharts };
}

function SizechartPage({ slug }) {
	const { sizecharts } = useSelector(getSizecharts);
	const sizechart = sizecharts[slug];
	return (
		<Page>
			<Sizechart
				onChange={console.log}
				sizechart={sizechart}
			/>
		</Page>
	);
}

SizechartPage.populate = [getSizechart];

export default SizechartPage;