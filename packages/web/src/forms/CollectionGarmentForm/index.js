import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, Dropdown } from '@components';
import { mapToDropdownOption  } from '@utils';
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
				options={garments.map(mapToDropdownOption)}
			/>

			<Button type="submit">Submit</Button>

		<div className={styles.cta}>
			<a onClick={() => deleteCollection(collection)}>
				{`Delete ${collection.name} collection`}
			</a>
		</div>

		</form>
	);
}

CollectionGarmentForm.propTypes = {
	garments: arrayOf(object).isRequired,
	handleSubmit: func.isRequired,
};
