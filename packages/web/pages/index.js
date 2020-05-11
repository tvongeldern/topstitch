import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { Page } from '@components';
import { HomepageHero } from '@forms';
import { searchBrands } from '@state/actions';
import {
	useActionCreators,
	useSelector,
} from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function hompeageSelector({
	brands: { brands },
}) {
	return { brands };
}

export default function Homepage() {
	const [dispatchSearchBrands] = useActionCreators(
		searchBrands,
	);
	const { brands } = useSelector(hompeageSelector);
	const [{ slug }, setState] = useState(EMPTY_OBJECT);

	useEffect(() => {
		if (slug) {
			Router.push(
				'/sizecharts/[slug]',
				`/sizecharts/${slug}`,
			);
		}
	}, [slug]);

	return (
		<Page>
			<Form
				component={HomepageHero}
				search={dispatchSearchBrands}
				brands={brands}
				onSubmit={setState}
			/>
		</Page>
	);
};
