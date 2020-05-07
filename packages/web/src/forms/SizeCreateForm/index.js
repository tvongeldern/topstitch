import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function SizeCreateForm({ handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>

			<h3>Size</h3>

			<Field
				name="name"
				component={TextInput}
			/>

			<Button type="submit">Submit</Button>

		</form>
	);
}

SizeCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
