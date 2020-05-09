import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	SuggestionGroup,
	TextInput,
} from '@components';
import styles from './styles.scss';

const COMMON_FITS = [
	'Petite',
	'Regular',
	'Slim',
];

export function FitCreateForm({
	collections,
	dirtySinceLastSubmit,
	handleSubmit,
	submitError,
	values: { collectionId }
}) {
	const collection = collections[collectionId];
	const CTA = collection
		? `Add a fit to the ${collection.name} collection`
		: 'Add a fit to this collection';
	return (
		<form onSubmit={handleSubmit}>

			<p>{`${CTA}. A fit is a collection of sizes designed for a certain body shape.`}</p>

			<SuggestionGroup
				suggestions={COMMON_FITS}
				existing={collection && collection.fits}
			/>

			<Field
				name="name"
				label="Fit name"
				component={TextInput}
			/>

			{submitError && !dirtySinceLastSubmit && (
				<p className={styles.error}>{submitError}</p>
			)}

			<Button type="submit">Add fit</Button>

		</form>
	);
}

FitCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
