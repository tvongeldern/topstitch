import React from 'react';
import { arrayOf, func, object } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, SuggestionGroup, TextInput } from '@components';
import { EMPTY_ARRAY } from '@constants';

const COMMON_SIZES = [
	'Small',
	'Medium',
	'Large',
	'XL',
	'XXL',
	'XS',
];

export function SizeCreateForm({
	deleteFit,
	existing,
	handleSubmit,
	values: { fit },
}) {
	return (
		<form onSubmit={handleSubmit}>

			<SuggestionGroup
				suggestions={COMMON_SIZES}
				existing={existing}
			/>

			<Field
				name="name"
				label="Size name"
				component={TextInput}
			/>

			<Button type="submit">Add size</Button>

			<a onClick={() => deleteFit(fit)}>
				{`Delete ${fit.name} fit`}
			</a>

		</form>
	);
}

SizeCreateForm.propTypes = {
	existing: arrayOf(object),
	handleSubmit: func.isRequired,
};

SizeCreateForm.defaultProps = {
	existing: EMPTY_ARRAY,
};
