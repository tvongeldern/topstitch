import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function LoginForm({
	handleSubmit,
	submitting,
}) {
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
				autoComplete="current-password"
			/>

			<Button type="submit" loading={submitting}>Log in</Button>
		</form>
	);
}

LoginForm.propTypes = {
	handleSubmit: func.isRequired,
};
