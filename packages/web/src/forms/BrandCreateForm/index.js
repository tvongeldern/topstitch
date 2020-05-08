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

			<p>Thank you for adding a new sizechart!</p>

			<p>The name of the clothing brand should be as it appears on the label.</p>

			<p>The link should be to where you found the sizechart, if possible, otherwise the company's website is fine.</p>

			<Field
				component={TextInput}
				name="name"
				label="Name"
			/>

			<Field
				component={TextInput}
				name="website"
				label="Website (optional)"
			/>

			<p className={styles.error}>{submitError}</p>

			<Button
				type="submit"
				loading={submitting || submitSuceeded}
			>
				Submit brand
			</Button>

		</form>
	);
}

BrandCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
