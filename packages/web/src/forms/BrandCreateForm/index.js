import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function BrandCreateForm({
	handleSubmit,
	submitError,
	submitting,
	submitSuceeded,
}) {
	return (
		<form onSubmit={handleSubmit} className={styles.container}>

			<p>Thank you for contributing to the community!</p>

			<Field
				component={TextInput}
				name="name"
				label="Brand name"
			/>

			<p className={styles.error}>{submitError}</p>

			<Button
				type="submit"
				loading={submitting || submitSuceeded}
			>
				Add sizechart
			</Button>

		</form>
	);
}

BrandCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
