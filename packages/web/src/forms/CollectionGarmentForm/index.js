import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, Dropdown } from '@components';
import { formatDropdownOption } from '@utils';
import styles from './styles.scss';

export function CollectionGarmentForm({
	handleSubmit,
	garments,
	submitSucceeded,
}) {
	return (
		<form onSubmit={handleSubmit}>

			<Field
				name="garmentId"
				component={Dropdown}
				placeholder="Select one"
				options={garments.map(formatDropdownOption)}
			/>

			<Button type="submit">Submit</Button>
		</form>
	);
}

CollectionGarmentForm.propTypes = {
	garments: arrayOf(object).isRequired,
	handleSubmit: func.isRequired,
};
