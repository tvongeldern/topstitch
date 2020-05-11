import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, Dropdown } from '@components';
import { errorActionReducer, formatDropdownOption  } from '@utils';
import styles from './styles.scss';

export function CollectionGarmentForm({
	handleSubmit,
	deleteCollection,
	garments,
	values: { collection },
}) {
	return (
		<form onSubmit={handleSubmit}>

			<p>{`What types of clothing are in the ${collection.name} collection?`}</p>

			<Field
				name="garmentId"
				component={Dropdown}
				label="Select a garment"
				placeholder="Select one"
				options={garments.map(formatDropdownOption)}
			/>

			<Button type="submit">Submit</Button>

			<a onClick={() => deleteCollection(collection)}>
				{`Delete ${collection.name} collection`}
			</a>

		</form>
	);
}

CollectionGarmentForm.propTypes = {
	garments: arrayOf(object).isRequired,
	handleSubmit: func.isRequired,
};
