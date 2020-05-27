import React from 'react';
import { string } from 'prop-types';
import { Button, Link } from '@components/ui';
import styles from './styles.scss';

export function ReviewSizechartCta({ sizechartSlug }) {
	return (
		<div className={styles.container}>
			<Link
				href="/sizecharts/[slug]/review"
				as={`/sizecharts/${sizechartSlug}/review`}
			>
				<Button>Add sizing review</Button>
			</Link>
		</div>
	);
}

ReviewSizechartCta.propTypes = {
	sizechartSlug: string.isRequired,
};
