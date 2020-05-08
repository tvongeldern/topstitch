import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function CollectionCreateForm({
	handleSubmit,
	submitError,
	values: { brand },
}) {
	return (
		<form onSubmit={handleSubmit}>

			<p>{`Add a collection to the ${brand.name} sizechart.`}</p>

			<p>Common collections for a brand to have include Mens, Womens, Unisex, Children.</p>

			<Field
				component={TextInput}
				name="name"
				label="Collection name"
			/>

			<p className={styles.error}>{submitError}</p>

			<Button type="submit">Add collection</Button>

		</form>
	);
}

CollectionCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
