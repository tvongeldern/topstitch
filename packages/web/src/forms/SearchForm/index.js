import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Loading, Typeahead } from '@components';
import styles from './styles.scss';

export function SearchForm({
	brands,
	handleSubmit,
	search,
	values: { name },
	addSizechart,
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
				renderPinnedOption={(name) => <a onClick={() => addSizechart({ name })}>Add sizechart for {name}</a>}
			/>

			{name && <Loading className={styles.loading} />}

		</form>
	);
}

SearchForm.propTypes = {
	handleSubmit: func.isRequired,
};
