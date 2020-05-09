import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	SuggestionGroup,
	TextInput,
} from '@components';
import { validateRequired } from '@forms/validators';
import { EMPTY_ARRAY } from '@constants';
import styles from './styles.scss';

const COMMON_COLLECTIONS = [
	'Mens',
	'Womens',
	'Adult',
	'Unisex',
	'Kids',
];

export function CollectionCreateForm({
	dirtySinceLastSubmit,
	handleSubmit,
	submitError,
	values: { brand },
}) {
	return (
		<form onSubmit={handleSubmit}>

			<p>{`Add a collection to the ${brand.name} sizechart.`}</p>

			<SuggestionGroup
				suggestions={COMMON_COLLECTIONS}
				existing={brand.collections}
			/>

			<Field
				component={TextInput}
				name="name"
				label="Collection name"
				validate={validateRequired}
			/>

			{submitError && !dirtySinceLastSubmit && (
				<p className={styles.error}>{submitError}</p>
			)}

			<Button type="submit">Add collection</Button>

		</form>
	);
}

CollectionCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
