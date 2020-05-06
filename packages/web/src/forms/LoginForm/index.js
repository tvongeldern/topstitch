import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import { RETURN_SELF } from '@utils';
import { validateRequired } from '../validators';

export function LoginForm({
	handleSubmit,
	submitError,
	touched,
	hasSubmitErrors,
	hasValidationErrors,
	submitting,
	...rest
}) {
	const hasTouchedField = Object.values(touched).find(RETURN_SELF);
	const hasError = hasTouchedField && (hasSubmitErrors || hasValidationErrors);
	return (
		<form onSubmit={handleSubmit} noValidate>
			<Field
				component={TextInput}
				name="email"
				label="Email"
				type="email"
				autoComplete="username"
				validate={validateRequired}
			/>

			<Field
				component={TextInput}
				name="password"
				type="password"
				label="Password"
				autoComplete="current-password"
				validate={validateRequired}
			/>

			<Button
				type="submit"
				loading={submitting}
				error={hasError}
			>
				Log in
			</Button>
		</form>
	);
}

LoginForm.propTypes = {
	handleSubmit: func.isRequired,
};
