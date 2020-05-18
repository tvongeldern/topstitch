import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Loading, Typeahead } from '@components';
import styles from './styles.scss';

export function BrandCompareToForm({
	brands,
	handleSubmit,
	search,
	values: { name },
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
				label="Compare to another brand"
				component={Typeahead}
				search={search}
				options={Object.values(brands)}
				outputField="slug"
			/>

			{name && <Loading className={styles.loading} />}

		</form>
	);
}

BrandCompareToForm.propTypes = {
	handleSubmit: func.isRequired,
};
