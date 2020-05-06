import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, Dropdown } from '@components';
import styles from './styles.scss';

function dropdownOption({ id, name }) {
	return {
		children: name,
		value: id,
	};
}

export function CollectionGarmentForm({
	handleSubmit,
	garments,
	values,
}) {
	return (
		<form onSubmit={handleSubmit}>

			<Field
				name="garmentId"
				component={Dropdown}
				options={garments.map(dropdownOption)}
			/>

			<Button type="submit">Submit</Button>
		</form>
	);
}

CollectionGarmentForm.propTypes = {
	garments: arrayOf(object).isRequired,
	handleSubmit: func.isRequired,
};
