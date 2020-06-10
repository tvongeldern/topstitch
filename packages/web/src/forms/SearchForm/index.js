import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Loading,
	RequireAuth,
	Typeahead,
} from '@components';
import styles from './styles.scss';

export function SearchForm({
	brands,
	handleSubmit,
	search,
	values: { name },
	addSizechart,
	me,
}) {
	useEffect(() => {
		if (name) {
			handleSubmit();
		}
	}, [name]);
	return (
		<form onSubmit={handleSubmit}>

			<Field
				name="name"
				label="Search"
				component={Typeahead}
				search={search}
				options={Object.values(brands)}
				outputField="slug"
				renderPinnedOption={(name) => (
					<RequireAuth me={me}>
						<a onClick={() => addSizechart({ name })}>
							Add sizechart for {name}
						</a>
					</RequireAuth>
				)}
			/>

			{name && <Loading className={styles.loading} />}

		</form>
	);
}

SearchForm.propTypes = {
	handleSubmit: func.isRequired,
};
