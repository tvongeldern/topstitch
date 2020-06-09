import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { Feed, Footer, NavBar } from '@components';
import { HomepageHero } from '@forms';
import { getFeed, searchBrands } from '@state/actions';
import {
	useActionCreators,
	useSelector,
} from '@utils/hooks';
import { EMPTY_OBJECT } from '@constants';

function hompeageSelector({
	brands: { brands },
	client: { feed },
}) {
	return { brands, feed };
}

export default function Homepage() {
	const [dispatchSearchBrands] = useActionCreators(
		searchBrands,
	);
	const { brands, feed } = useSelector(
		hompeageSelector,
	);
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
		<>
			<NavBar />
			<Form
				component={HomepageHero}
				search={dispatchSearchBrands}
				brands={brands}
				onSubmit={setState}
			/>

			<Feed feed={feed} />

			<Footer />
		</>
	);
};

Homepage.populate = [getFeed];