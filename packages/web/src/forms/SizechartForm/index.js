import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput, Sizechart } from '@components';
import styles from './styles.scss';

export function SizechartForm({
	handleSubmit,
	values,
}) {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="brand"
				label="Brand"
				component={TextInput}
			/>

			<Field
				name="collection"
				label="Collection"
				component={TextInput}
			/>

			<Field
				name="fit"
				label="Fit"
				component={TextInput}
			/>

			<Field
				name="size"
				label="Size"
				component={TextInput}
			/>

			<Button type="submit">Submit</Button>

			<Sizechart {...values} />
		</form>
	);
}

SizechartForm.propTypes = {
	handleSubmit: func.isRequired,
};
