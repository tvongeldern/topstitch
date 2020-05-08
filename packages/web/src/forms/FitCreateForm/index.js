import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';

export function FitCreateForm({
	handleSubmit,
	values,
}) {
	return (
		<form onSubmit={handleSubmit}>

			<p>Some sizecharts have different fits for certain types of clothing. A fit is a collection of sizes.</p>

			<p>{`Examples of common fits include Slim Fit, Petite, or Big & Tall.`}</p>

			<Field
				name="name"
				label="Fit name"
				component={TextInput}
			/>

			<Button type="submit">Submit</Button>

		</form>
	);
}

FitCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
