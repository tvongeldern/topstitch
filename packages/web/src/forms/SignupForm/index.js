import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function SignupForm({ handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				component={TextInput}
				name="email"
				label="Email"
			/>

			<Field
				component={TextInput}
				name="password"
				type="password"
				label="Password"
			/>

			<Field
				component={TextInput}
				name="confirm"
				type="password"
				label="Confirm password"
			/>

			<Button type="submit">Sign up</Button>
		</form>
	);
}

SignupForm.propTypes = {
	handleSubmit: func.isRequired,
};
