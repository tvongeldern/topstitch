import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function BrandCreateForm({
	handleSubmit,
	submitError,
}) {
	return (
		<form onSubmit={handleSubmit}>

			<h3>Brand</h3>

			<Field
				component={TextInput}
				name="name"
				label="Name"
			/>

			<Field
				component={TextInput}
				name="slug"
				label="Slug"
			/>

			<p className={styles.error}>{submitError}</p>

			<Button type="submit">Submit brand</Button>

		</form>
	);
}

BrandCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
