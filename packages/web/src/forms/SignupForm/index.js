import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import {
	composeValidators,
	RETURN_SELF,
	validateEmail,
	validatePassword,
	validateRequired,
	validateConfirmPassword,
} from '@utils';
import styles from './styles.scss';

const email = composeValidators(validateRequired, validateEmail);
const password = composeValidators(validateRequired, validatePassword);

export function SignupForm({
	handleSubmit,
	submitError,
	touched,
	hasSubmitErrors,
	hasValidationErrors,
	submitting,
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
				validate={email}
			/>

			<Field
				component={TextInput}
				name="password"
				type="password"
				label="Password"
				autoComplete="new-password"
				validate={password}
			/>

			<Field
				component={TextInput}
				name="confirm"
				type="password"
				label="Confirm password"
				validate={validateConfirmPassword}
			/>

			<p className={styles.error}>{submitError}</p>

			<Button
				type="submit"
				error={hasError}
				loading={submitting}
			>
				Sign up
			</Button>
		</form>
	);
}

SignupForm.propTypes = {
	handleSubmit: func.isRequired,
};
