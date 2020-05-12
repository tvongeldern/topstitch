import React from 'react';
import { arrayOf, func, number, object, string } from 'prop-types';
import { Field } from 'react-final-form';
import { RETURN_NAME  } from '@utils';
import { RadioLabel } from '../RadioLabel';
import styles from './styles.scss';

function renderSuggestion(name) {
	return (
		<Field
			type="radio"
			name="name"
			value={name}
			label={name}
			key={name}
			component={RadioLabel}
			defaultSelected
		/>
	);
}

function renderWithExisting({
	existing,
	mapExisting = RETURN_NAME, // shouldnt be necessary but ok
	maxLength,
	suggestions
}) {
	const existingValues = existing.map(mapExisting);
	return suggestions
		.filter((value) => !existingValues.includes(value))
		.filter((s, index) => index < maxLength)
		.map(renderSuggestion);
}

export function SuggestionGroup({
	existing,
	mapExisting,
	maxLength,
	suggestions,
}) {
	return (
		<div className={styles.container}>
			{existing
				? renderWithExisting({
						existing,
						mapExisting,
						maxLength,
						suggestions
					})
				: suggestions.map(renderSuggestion)}
		</div>
	);
}

SuggestionGroup.propTypes = {
	existing: arrayOf(object),
	mapExisting: func,
	maxLength: number,
	suggestions: arrayOf(string).isRequired,
};

SuggestionGroup.defaultProps = {
	existing: null,
	mapExisting: RETURN_NAME,
	maxLength: 3,
};
