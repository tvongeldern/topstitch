import React from 'react';
import { arrayOf, object } from 'prop-types';
import { Link } from '@components/ui/Link';
import styles from './styles.scss';

function renderFeedItem({
	id,
	account,
	brand,
	name,
	rating,
	review,
	slug,
}) {
	// review
	if (rating || review) {
		return (
			<div className={styles.feedItem} key={id}>
				<div className={styles.row}>
					<span>{`${account.name} reviewed `}</span>
					<Link href="/sizecharts/[slug]" as={`/sizecharts/${brand.slug}`}>
						{brand.name}
					</Link>
				</div>
				<pre>{review}</pre>
			</div>
		);
	}
	// new sizechart
	return (
		<div className={styles.feedItem} key={id}>
			<div className={styles.row}>
				<span>{`${account.name} added a sizechart for `}</span>
				<Link href="/sizecharts/[slug]" as={`/sizecharts/${slug}`}>
					{name}
				</Link>
			</div>
		</div>
	);
}

export function Feed({ feed }) {
	return (
		<div className={styles.container}>
			<h3>Recent Activity</h3>
			{feed.map(renderFeedItem)}
		</div>
	);
}

Feed.propTypes = {
	feed: arrayOf(object).isRequired,
};
