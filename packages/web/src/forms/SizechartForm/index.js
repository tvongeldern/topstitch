import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput, Typeahead } from '@components';
import styles from './styles.scss';

export function SizechartForm({
	handleSubmit,
}) {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="brand"
				label="Brand"
				component={TextInput}
			/>
			<Button type="submit">Submit</Button>
		</form>
	);
}

SizechartForm.propTypes = {
	handleSubmit: func.isRequired,
};
