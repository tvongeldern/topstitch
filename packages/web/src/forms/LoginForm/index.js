import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { Button, TextInput } from '@components';
import styles from './styles.scss';

export function LoginForm({ handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				component={TextInput}
				name="username"
				label="Username"
			/>

			<Field
				component={TextInput}
				name="password"
				type="password"
				label="Password"
			/>

			<Button type="submit">Log in</Button>
		</form>
	);
}

LoginForm.propTypes = {
	handleSubmit: func.isRequired,
};
