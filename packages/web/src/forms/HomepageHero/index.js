import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import cn from 'classnames';
import { Typeahead } from '@components';
import styles from './styles.scss';

export function HomepageHero({
	handleSubmit,
	values: { slug },
	brands,
	search,
}) {
	useEffect(() => {
		if (slug) {
			handleSubmit();
		}
	}, [slug]);
	return (
		<div onSubmit={handleSubmit} className={styles.container}>
			<div className={cn(styles.hero, styles.pinned)} />
			<div className={cn(styles.shade, styles.pinned)} />
			<div className={cn(styles.content, styles.pinned)}>
				<h1>Welcome to Topstitch</h1>
				<h4>The fitting room for online clothing stores</h4>
				<form>
					<Field
						name="slug"
						component={Typeahead}
						options={Object.values(brands)}
						search={search}
						placeholder="Search clothing brands"
					/>
				</form>
			</div>
		</div>
	);
}

HomepageHero.propTypes = {
	handleSubmit: func.isRequired,
};
