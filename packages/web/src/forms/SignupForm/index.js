import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function SignupForm({ handleSubmit, submitError }) {
	return (
		<form onSubmit={handleSubmit} noValidate>
			<Field
				component={TextInput}
				name="email"
				label="Email"
				type="email"
				autoComplete="username"
			/>

			<Field
				component={TextInput}
				name="password"
				type="password"
				label="Password"
				autoComplete="new-password"
			/>

			<Field
				component={TextInput}
				name="confirm"
				type="password"
				label="Confirm password"
				autoComplete="new-password"
			/>

			<p className={styles.error}>{submitError}</p>

			<Button type="submit">Sign up</Button>
		</form>
	);
}

SignupForm.propTypes = {
	handleSubmit: func.isRequired,
};
