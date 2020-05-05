import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function CollectionCreateForm({
	handleSubmit,
	submitError,
}) {
	return (
		<form onSubmit={handleSubmit}>

			<h3>Collection</h3>

			<Field
				component={TextInput}
				name="name"
				label="Name"
			/>

			<p className={styles.error}>{submitError}</p>

			<Button type="submit">Add collection</Button>

		</form>
	);
}

CollectionCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
