import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Typeahead } from '@components';
import styles from './styles.scss';

export function SearchForm({
	brands,
	handleSubmit,
	search,
	values: { q },
}) {
	useEffect(() => {
		if (q) {
			handleSubmit();
		}
	}, [q]);
	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="q"
				label="Search"
				component={Typeahead}
				search={search}
				options={Object.values(brands)}
				outputField="slug"
			/>
		</form>
	);
}

SearchForm.propTypes = {
	handleSubmit: func.isRequired,
};
